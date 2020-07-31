const React = require("react");
const ReactDOMServer = require("react-dom/server");
const puppeteer = require("puppeteer");

const element = React.createElement(
  "div",
  { style: { color: "red" } },
  "Hello world!"
);

const renderPdf = async (element) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = ReactDOMServer.renderToStaticMarkup(element);
  await page.setContent(html);

  await page.pdf({ path: "result.pdf" });

  await page.close();
  await browser.close();
};

renderPdf(element);
