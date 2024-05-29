import puppeteer from "puppeteer";

const parseCuseId = (id) => {
  const cuce = id.split("-");
  return cuce;
}

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
    await page.click('label:nth-child(2) div ins');
    
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

    let data = await page.evaluate(() => {
      const table = document.querySelector('#tablaSimple');
      const rows = table ? table.querySelectorAll('tbody tr') : [];
      const dataArray = [];
      for (const row of rows){
        const columns = row.querySelectorAll('td');
        const dataObject = {};
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
        // dataObject.Formularios = columns[10].innerText || '';
        // dataObject.Reportes = columns[11].innerText|| '';
        dataArray.push(dataObject);

      }

      return dataArray;
    });
    await browser.close();
    return res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}




