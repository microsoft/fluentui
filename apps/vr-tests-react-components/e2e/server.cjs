// @ts-check
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

const app = express();
for (const [renderer, directory] of [
  ['svg', 'storybook-icons-svg'],
  ['fonts', 'storybook-fonts'],
]) {
  const root = path.resolve(__dirname, '../dist', directory);
  if (!fs.existsSync(path.join(root, 'index.json'))) {
    throw new Error(`Missing ${renderer} Storybook at ${root}. Run nx run vr-tests-react-components:e2e.`);
  }
  app.use(`/${renderer}`, express.static(root));
}

app.listen(4182, '127.0.0.1', () => {
  console.log('Icon E2E Storybooks listening on http://127.0.0.1:4182');
});
