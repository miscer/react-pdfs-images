const ReactDOMServer = require("react-dom/server");
const puppeteer = require("puppeteer");
const { jsx, css, Global } = require("@emotion/core");

const element = jsx(
  "div",
  {
    id: "screenshot",
    css: css`
      display: inline-block;
    `,
  },
  jsx(Global, {
    styles: css`
      @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
    `,
  }),
  jsx(
    "p",
    {
      css: css`
        color: red;
        font-family: "Playfair Display", serif;
      `,
    },
    "Hello world!"
  ),
  jsx("img", { src: "https://picsum.photos/600", width: 300 })
);

const renderImage = async (element) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 800,
      height: 600,
      deviceScaleFactor: 2,
    },
  });

  const page = await browser.newPage();

  const html = ReactDOMServer.renderToStaticMarkup(element);
  await page.setContent(html);

  const node = await page.$("#screenshot");

  await node.screenshot({
    path: "screenshot.png",
  });

  await page.close();
  await browser.close();
};

renderImage(element);
