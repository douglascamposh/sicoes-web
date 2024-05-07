import puppeteer from "puppeteer";

function separeCuseId(id) {
  const cuce = id.split("-");
  return cuce;
}

export default async function handler(req, res) {
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
// puedo mejorar la logica aqui
    if (cuceID) {
      let separaData = separeCuseId(cuceID);
      if (separaData.length <= 1) {
        await page.type('.cuce input[name="cuce4"]', separaData[0] || '');
      } else {
        await page.type('.cuce input[name="cuce1"]', separaData[0]);
        await page.type('.cuce input[name="cuce2"]', separaData[1]);
        await page.type('.cuce input[name="cuce3"]', separaData[2]);
        await page.type('.cuce input[name="cuce4"]', separaData[3]);
        await page.type('.cuce input[name="cuce5"]', separaData[4]);
        await page.type('.cuce input[name="cuce6"]', separaData[5]);
      }
    }
    await page.click('.busquedaForm');
    await page.waitForSelector('#tablaSimple');

    let data = await page.evaluate(() => {
      const table = document.querySelector('#tablaSimple');
      const rows = table.querySelectorAll('tbody tr');
      const dataArray = [];
      for (const row of rows){
        const columns = row.querySelectorAll('td');
        const dataObject = {};
        dataObject.Cuce = columns[0].innerText || '';
        dataObject.Entidad = columns[1].innerText;
        dataObject['Tipo Contratación'] = columns[2].innerText || '';
        dataObject.Modalidad = columns[3].innerText || '';
        dataObject['Objeto de Contratación'] = columns[4].innerText || '';
        dataObject.Subasta = columns[5].innerText || '';
        dataObject['Fecha Publicación'] = columns[6].innerText || '';
        dataObject['Fecha Presentación'] = columns[7].innerText || '';
        dataObject.Estado = columns[8].innerText || '';
        dataObject.Archivos = columns[9].innerText || '';
        dataObject.Formularios = columns[10].innerText || '';
        dataObject.Reportes = columns[11].innerText|| '';
        dataArray.push(dataObject);
      }
      return dataArray;
    });
    console.log(data);
    await browser.close();
    return res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Hubo un problema" });
  }
}




