import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { distRoot } from './static-server.mjs';

/**
 * Sweeps every prerendered page for content defects.
 *
 * This exists because a defect that affected all 144 generated pages went unnoticed for a
 * long time: component descriptions rendered `function MDXContent(...)` source instead of
 * prose, and it was missed by verifying only the one hand-written page. Spot-checks are not
 * enough when pages are generated — every symptom here is checked across the whole site.
 */
const SYMPTOMS = [
  {
    id: 'compiled-source-leak',
    describe: 'renders JavaScript source where prose belongs',
    test: html => /function MDXContent\(/.test(html),
  },
  {
    id: 'error-boundary',
    describe: 'an example failed to render',
    test: html => html.includes('This example failed to render'),
  },
  {
    id: 'missing-api-data',
    describe: 'props table could not find generated API data',
    test: html => html.includes('No generated API data'),
  },
  {
    id: 'react-error-placeholder',
    describe: 'contains a React application error placeholder',
    test: html => html.includes('Application Error'),
  },
  {
    id: 'unresolved-expression',
    describe: 'renders an unresolved [object Object] in page text',
    /*
     * Only text content counts. Fluent components also emit slot names as attributes
     * (`icon="[object Object]"` on Avatar, `root=`/`avatar=` on AvatarGroup) — verified to
     * be identical in Storybook, so that is upstream behaviour this site reproduces
     * faithfully, not a defect introduced here. Flagging it would keep this gate
     * permanently red, which is how a check stops being read.
     */
    test: html => />[^<]*\[object Object\]/.test(html),
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);

    if ((await stat(full)).isDirectory()) {
      yield* walk(full);
      continue;
    }

    if (entry === 'index.html') {
      yield full;
    }
  }
}

const root = join(distRoot, 'docs');
const failures = [];
let checked = 0;

for await (const file of walk(root)) {
  const html = await readFile(file, 'utf8');
  const route = file.slice(distRoot.length).replace(/\/index\.html$/, '/');
  checked++;

  for (const symptom of SYMPTOMS) {
    if (symptom.test(html)) {
      failures.push(`${route} — ${symptom.describe} [${symptom.id}]`);
    }
  }
}

console.log(`audited ${checked} prerendered pages`);

if (failures.length > 0) {
  console.error(`\n${failures.length} defect(s):`);
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log('no content defects found');
