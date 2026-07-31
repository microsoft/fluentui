import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import { renderToString } from 'react-dom/server';

type RenderToHTMLConfig = {
  cjsOutfile: string;
  esmOutfile: string;
  htmlOutfile: string;
};

export async function renderToHTML(config: RenderToHTMLConfig): Promise<void> {
  const { cjsOutfile, esmOutfile, htmlOutfile } = config;

  if (!fs.existsSync(cjsOutfile)) {
    throw new Error(`A file "${cjsOutfile}" does not exist`);
  }

  const { App } = await import(cjsOutfile);

  if (typeof App === 'undefined') {
    throw new Error(`"${cjsOutfile}" does not have an export named "App", please check the matching file`);
  }

  // Component styles are static CSS (CSS Modules) since the Griffel migration — there is no
  // per-render style extraction step. The SSR assertion is that the markup renders and
  // hydrates without console errors/warnings; class names are deterministic between this
  // render and the browser bundle because both resolve `*.module.css` through the same shim
  // (see esbuild-plugin.ts `cssModulesShimPlugin`).
  const resultHTML = renderToString(React.createElement(App));

  const scriptPath = path.relative(path.dirname(htmlOutfile), esmOutfile);
  const htmlPage = `
  <html>
    <head>
      <meta charset="utf8" />
    </head>
    <body>
      <div id="root">${resultHTML}</div>
      <script src="${scriptPath}"></script>
    </body>
  </html>
  `;

  await fs.promises.writeFile(htmlOutfile, htmlPage, { encoding: 'utf8' });
}
