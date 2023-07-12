import * as fs from 'fs';
import * as path from 'path';

import { RendererProvider, createDOMRenderer, renderToStyleElements } from '@griffel/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

type RenderToHTMLConfig = {
  cjsOutfile: string;
  esmOutfile: string;
  htmlOutfile: string;
};

export async function renderToHTML(config: RenderToHTMLConfig): Promise<void> {
  const { cjsOutfile, esmOutfile, htmlOutfile } = config;
  const renderer = createDOMRenderer();

  if (!fs.existsSync(cjsOutfile)) {
    throw new Error(`A file "${cjsOutfile}" does not exist`);
  }

  const { App } = await import(cjsOutfile);

  if (typeof App === 'undefined') {
    throw new Error(`"${cjsOutfile}" does not have an export named "App", please check the matching file`);
  }

  const resultHTML = ReactDOM.renderToString(
    React.createElement(RendererProvider, { renderer, children: React.createElement(App) }),
  );
  const resultStylesHTML = ReactDOM.renderToStaticMarkup(
    React.createElement(React.Fragment, null, renderToStyleElements(renderer)),
  );

  const scriptPath = path.relative(path.dirname(htmlOutfile), esmOutfile);
  const htmlPage = `
  <html>
    <head>
      <meta charset="utf8" />
      ${resultStylesHTML}
    </head>
    <body>
      <div id="root">${resultHTML}</div>
      <script src="${scriptPath}"></script>
    </body>
  </html>
  `;

  await fs.promises.writeFile(htmlOutfile, htmlPage, { encoding: 'utf8' });
}
