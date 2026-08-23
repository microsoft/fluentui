import { existsSync, readFileSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { distRoot } from './static-server.mjs';

const docgenPath = new URL('../app/generated/docgen.json', import.meta.url);
const docgen = existsSync(docgenPath) ? JSON.parse(readFileSync(docgenPath, 'utf8')) : {};

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
    id: 'missing-props-table',
    describe: 'documents a component with generated API data but renders no props table',
    /*
     * Passing no `docgen` prop renders nothing and leaves no error text, so the rule above
     * cannot see it — which is how every page silently lost its props table. Keyed off the
     * manifest so pages documenting APIs or concepts, which have no component entry, are not
     * flagged.
     */
    test: (html, route) => {
      const leaf = route.replace(/\/$/, '').split('/').pop() ?? '';
      const component = leaf
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      return Boolean(docgen[component]) && !html.includes('<table');
    },
  },
  {
    id: 'duplicate-h1',
    describe: 'renders more than one top-level heading',
    /*
     * Fumadocs renders the frontmatter title as the page h1, so a heading carried over from the
     * Storybook source produces a second one. Breaks heading order for screen readers, and the
     * per-commit accessibility gate only covers three pages.
     */
    test: html => {
      /*
       * Count only the page's own headings. Examples legitimately render their own h1 —
       * AccordionHeader does, Image's stories do, the theme designer does — and Storybook shows
       * the same. The page's title and its MDX headings carry the docs renderer's classes;
       * anything else belongs to a rendered component.
       */
      const pageHeadings = (html.match(/<h1[^>]*>/g) ?? []).filter(
        tag => tag.includes('text-[1.75em]') || tag.includes('group/heading'),
      );

      return pageHeadings.length > 1;
    },
  },
  {
    id: 'unresolved-component',
    describe: 'references a component that was not imported',
    /*
     * Storybook docs-block usage left behind after its import is stripped renders as literal
     * angle-bracket text or fails at hydration. Cheap to check, and it caught `<Title>`
     * surviving on a migrated page.
     */
    test: html => /&lt;(Title|Subtitle|Primary|Stories|ArgTypes|Canvas|FluentCanvas|FluentStory)\b/.test(html),
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
    if (symptom.test(html, route)) {
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
