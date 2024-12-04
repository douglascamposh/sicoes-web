import { count } from "console";
import puppeteer from "puppeteer";
const fs = require("fs");
const Captcha = require("2captcha-ts");
const APIKEY = process.env.NEXT_PUBLIC_2CAPTCHA_API_KEY;
const solver = new Captcha.Solver(APIKEY);


const URL = 'https://www.sicoes.gob.bo/portal/contrataciones/busqueda/convocatorias.php?tipo=convNacional';

const configureBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  return page;
};

const search = async (page, filters) => {
  await page.goto(URL);
  await page.waitForSelector('#modalComunicados', { visible: true });
  await page.click('#modalComunicados .close span');
  await page.waitForSelector('.row');
  const row = await page.$('.row');
  await row.$eval('[data-content="Búsqueda de Procesos de Contrataciones Nacionales"]', el => el.click());
  await page.waitForNavigation();
  //FILTERS
  await page.click(`label.checkbox-inline:nth-child(${filters.tipo.bienes ? '1' : '2'}) div.icheckbox_minimal-blue`);
  await page.click(`label.checkbox-inline:nth-child(${filters.tipo.obras ? '2' : '1'}) div.icheckbox_minimal-blue`);
  await page.click(`#formSimple > div > div > div:nth-child(8) > div > label:nth-child(${filters.subasta === 'Si' ? '1' : '2'}) > div > ins`);

  await page.click('.busquedaForm');
};


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

const extractNumberFromText = (textWithNumber) => {
  return parseInt(textWithNumber.match(/\d+/)[0]);
};

const openModalCatcha = async (page) => {
  // si es que falla mi catcha deveria a mandar 
  // el catchaResponse otra vez  y si haci no funciona 
  // deveria cerra el modal y otra vez hacer click

  await page.waitForSelector('#modal-download', { visible: true });
  const img = await page.$('#captchasp img');
  const imgUrl = "" + Date.now(); //await page.$eval('#captchasp img', img => img.src);
  const path = './public/' + imgUrl.split('/').pop();
  await img.screenshot({ path: path });
  const captchaResponse = await getCaptchaAnswer(path);
  await page.type('#captchasp input[name="captcha"]', captchaResponse || '');
  await page.click('#btnsubmitfordes');

}

const extractDataOformulary = async (page, filters) => {
  await page.waitForSelector('.modal-content');
  await page.waitForSelector('.modal-title');
  await page.waitForSelector('.FormularioDatoCentreado');
  const formularioDiv = await page.$('#visualizarformulario0');
  const tabla = await formularioDiv.$(`table[xmlns="http://www.w3.org/1999/html"]`);
  const tituloElemento = await tabla.$('.FormularioSubtitulo');
  const titulo = await tituloElemento.evaluate((element) => element.textContent);

  const descripcionesCeldas = await tabla.$$eval('.FormularioDato', (elementos) => {
    return elementos.map((elemento) => elemento.textContent.trim());
  });

  // traemos los nombres de los headers
  const encabezadosCeldas = await tabla.$$eval('.FormularioTituloFila', (elementos) => {
    return elementos.map((elemento) => elemento.textContent.trim());
  });
  
  const valoresCeldas = await tabla.$$eval('.FormularioDato, .FormularioDatoDerecha, .FormularioDatoCentreado', (elementos) => {
    return elementos.map((elemento) => elemento.textContent.trim());
  });

  for (let i = 0; i < descripcionesCeldas.length; i++) {
    const descripcion = descripcionesCeldas[i];
    for (let j = 0; j < filters.criterio.length; j++) {
      const palabra = filters.criterio[j];
      if (descripcion.toLowerCase().includes(palabra.toLowerCase())) {
        // obtengo los valores de la fila completa
        const filaDatos = await tabla.$$eval(`tr:nth-child(${i + 2}) td`, (celdas) => {
          return celdas.map((celda) => celda.textContent.trim());
        });
        console.log(`Fila que coincide con "${palabra}":`, filaDatos);
        console.log('tendria que guardar en mi base de datos')
      } else {
        console.log("no se encontro ninguna conincidencia")
      }
    }
  }

  // const date = await page.evaluate(() => {
  //   const find = "//td[contains(text(),'publicación')]";
  //   const result = document.evaluate(find, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  //   const date = result.parentElement.parentElement.children[1].children[0].innerText;
  //   // data[0].presentationDate = date;
  // });

  await page.click('#modal-formulariov > div > div > div.modal-header > button > span');
}

const obtainDataForPage = async (page, filters) => {
  await page.waitForSelector('#tablaSimple');
  const table = await page.$('#tablaSimple');
  const rows = await table.$$('tbody tr', (trs) => trs.map((tr) => tr));
  const dataArray = [];
  for (const row of rows) {
    const columns = await row.$$eval('td', (tds) => tds.map((td) => td.innerText));
    const dataObject = {
      cuce: columns[0] || '',
      entity: columns[1],
      contract: columns[2],
      modality: columns[3],
      contractDescription: columns[4],
      auction: columns[5],
      publishDateItem: columns[6],
      presentationDate: columns[7],
      stateAuction: columns[8],
      files: [],
      forms: columns[10] || [],
      reports: [],
      displayCatcha: false,
      formLinkUrl: ''
    };

    if (dataObject.forms.includes('170')) {
      const formLinkElement = await row.$('td:nth-child(11) a');
      if (formLinkElement) {
        dataObject.displayCatcha = true;
        await formLinkElement.click();
        console.log("modal abierto");
        await openModalCatcha(page);
        /*......................*/
        //modal con catchResuelto finalizado y entramos a otro modal
        await extractDataOformulary(page,filters);
        /*......................*/
      } else {
        dataObject.displayCatcha = false;
      }
    } else {
      dataObject.displayCatcha = false;
    }
    dataArray.push(dataObject);
  }

  console.log(dataArray);
  return dataArray;
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filters } = req.body;

  try {
    const browserPage = await configureBrowser();
    await search(browserPage, filters);

    await browserPage.exposeFunction('obtainDataForPage', obtainDataForPage);

    // Extract data pagination
    const extractElements = await browserPage.$eval('#tablaSimple_paginate > div.dataTables_info', el => el.textContent.trim());
    const totalElements = extractNumberFromText(extractElements);
    const maxElementsPerPage = 10;
    const totalPages = Math.ceil(totalElements / maxElementsPerPage);

    for (let currentPage = 0; currentPage < totalPages; currentPage++) {
      await obtainDataForPage(browserPage, filters);
      await clickPaginationLink(browserPage, currentPage, totalPages);
    }

    await browserPage.close();
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

const clickPaginationLink = async (browserPage, currentPage, totalPages) => {
  if (currentPage === 0) {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(6) > a');
  } else if (currentPage === 1) {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(8) > a');
  } else if (currentPage === 2) {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(9) > a');
  } else if (currentPage + 1 === totalPages - 1) {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(8) > a');
  } else if (currentPage + 1 === totalPages - 2) {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(9) > a');
  } else if (currentPage === totalPages - 1) {
    console.log("no hago nada");
  } else {
    await browserPage.click('#tablaSimple_paginate > nav > ul > li:nth-child(11) > a');
  }
}

