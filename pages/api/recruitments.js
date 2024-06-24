import puppeteer from "puppeteer";
const fs = require("fs");
const Captcha = require("2captcha-ts");
const APIKEY = process.env.NEXT_PUBLIC_2CAPTCHA_API_KEY;
const solver = new Captcha.Solver(APIKEY);

const parseCuseId = (id) => {
  const cuce = id.split("-");
  return cuce;
}

const getCaptchaAnswer = async (imgPath) => {
  try {
    //send captcha
    const base64Captcha = fs.readFileSync(imgPath, "base64");
    const res = await solver.imageCaptcha({
      body: base64Captcha,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cuceID} = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 1,
    });
    const page = await browser.newPage();
    await page.goto("https://www.sicoes.gob.bo/portal/contrataciones/busqueda/convocatorias.php?tipo=convNacional");
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('#modalComunicados', { visible: true });
    await page.click('#modalComunicados .close span');
    await page.waitForSelector('.row');
    const row = await page.$('.row');
    await row.$eval('[data-content="Búsqueda de Procesos de Contrataciones Nacionales"]', el => el.click());
    await page.waitForSelector('.cuce input[name="cuce1"]');
    await page.click('label:nth-child(2) div ins'); //click on 'Solo vigentes' radio button
    // consider if the option 'Todos' is selected there is the possible get other states like 'Desierto'
    
    if (cuceID) {
      const separeData = parseCuseId(cuceID);
      const CUCE_FIELD_NAMES = ['cuce1', 'cuce2', 'cuce3', 'cuce4', 'cuce5', 'cuce6'];
    
      if (separeData.length <= 1) {
        await page.type('.cuce input[name="cuce4"]', separeData[0] || '');
      } else {
        for (let i = 0; i < Math.min(separeData.length, CUCE_FIELD_NAMES.length); i++) {
          await page.type(`.cuce input[name="${CUCE_FIELD_NAMES[i]}"]`, separeData[i]);
        }
      }
    }

    await page.click('.busquedaForm');
    await page.waitForSelector('#tablaSimple');
    let data = await page.evaluate(async () => {
      const table = document.querySelector('#tablaSimple');
      const rows = table ? table.querySelectorAll('tbody tr') : [];
      const dataArray = [];
      for (const row of rows) { //Todo this is valid in case that we need iterate a lot with the same cuce in our case discar and just get the firs element 'vigente'
        const columns = row.querySelectorAll('td');
        const dataObject = {};
        if(columns.length > 1) {
          dataObject.cuce = columns[0].innerText || '';
          dataObject.entity = columns[1].innerText;
          dataObject.contract = columns[2].innerText || '';
          dataObject.modality = columns[3].innerText || '';
          dataObject.contractDescription = columns[4].innerText || '';
          dataObject.auction = columns[5].innerText || false;
          dataObject.stateAuction = columns[8].innerText || '';
          dataObject.publishDateItem = columns[6].innerText || 0;
          dataObject.presentationDate= columns[7].innerText || 0;
          // dataObject.Archivos = columns[9].innerText || '';
          dataObject.forms = columns[10].innerText || '';
          // dataObject.Reportes = columns[11].innerText|| '';

          if(dataObject.forms.includes('170')) {
            columns[10].childNodes.forEach(async item => {
              if(item.innerText.includes('170')) {
                await item.click('a');
                dataObject.displayCaptcha = true;
              }
            });
          }
          dataArray.push(dataObject);
        }
      }
      return dataArray;
    });
    
    if(data && data.length > 0 && data[0].displayCaptcha) {
      await page.waitForSelector('#modal-download', { visible: true });
      const img = await page.$('#captchasp img');
      const imgUrl = await page.$eval('#captchasp img', img => img.src);
      const path = './public/' + imgUrl.split('/').pop();
      await img.screenshot({ path: path });
      const captchaResponse = await getCaptchaAnswer(path);

      await page.type('#captchasp input[name="captcha"]', captchaResponse || '');
      await page.click('#btnsubmitfordes');
      
      await page.waitForSelector('#visualizarformulario0', { visible: true });
      await page.waitForSelector('.FormularioDatoCentreado');    

      const date = await page.evaluate(() => {
        const find = "//td[contains(text(),'publicación')]";
        const result = document.evaluate(find, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const date = result.parentElement.parentElement.children[1].children[0].innerText;
        console.info('date ->>>>>>>>', date);
        return date;
      });
      console.log('date>>>>>?????????', date);
      data[0].form170Date = date ? date : null;
      
    }
    
    await browser.close();
    return res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}
