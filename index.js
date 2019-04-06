const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch({
    //   headless: false
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://time.geekbang.org/column/article/40261');
  await (new Promise((resolve)=>{setTimeout(resolve,5000)}));
  await page.pdf({path: 'example.pdf'});

  console.log('generater pdf success');

//   await browser.close();
})();