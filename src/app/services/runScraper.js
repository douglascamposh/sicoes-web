const puppeteer = require('puppeteer');

const runScraper = async () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage(
      { headless: true }
    );
    await page.setViewport({
      width: 1300,
      height: 600,
    });

    const endpoint = "https://www.sicoes.gob.bo/";
    await page.goto(endpoint, {
      waitUntil: "domcontentloaded",
    })
    await page.evaluate(() => {
      const modal = document.getElementById('modalComunicados');
      modal.classList.add('hidden');
    });

    await wait(5000);
    await page.evaluate(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    });

  } catch (error) {
    console.log("An error ocurred ", error);
  }
}

export default runScraper;
