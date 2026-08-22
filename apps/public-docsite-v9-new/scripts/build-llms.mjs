import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import { normalizeComponent } from './docgen-transforms.mjs';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const { getImportMappingsForExportToSandboxAddon } = require('@fluentui/scripts-storybook');

/**
 * Generates the machine-readable documentation output (`docsite/site-navigation`).
 *
 * Emits an llms.txt summary plus a plain-text rendering per page, both derived from the same
 * content the site renders — so they cannot drift from it the way the previous generator
 * could. That one scraped a *built* Storybook with Playwright and round-tripped MDX through
 * HTML, losing components and frontmatter along the way.
 *
 * Example source comes from the same babel plugin the site uses for its source panels, so
 * the code shown to a reader and the code published here are byte-identical.
 */

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(appRoot, '../..');
const outRoot = join(appRoot, 'public/docs');

const SUMMARY_TITLE = 'Fluent UI React v9';
const SUMMARY_DESCRIPTION =
  "Fluent UI React is a library of React components that implement Microsoft's Fluent Design System.";

const importMappings = getImportMappingsForExportToSandboxAddon();
const docgen = existsSync(join(appRoot, 'app/generated/docgen.json'))
  ? JSON.parse(readFileSync(join(appRoot, 'app/generated/docgen.json'), 'utf8'))
  : {};

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);

    if ((await stat(full)).isDirectory()) {
      yield* walk(full);
      continue;
    }

    if (entry.endsWith('.mdx')) {
      yield full;
    }
  }
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: source };
  }

  const data = {};

  for (const line of match[1].split('\n')) {
    const field = line.match(/^(\w+):\s*(.*)$/);

    if (field) {
      data[field[1]] = field[2].replace(/^['"]|['"]$/g, '').trim();
    }
  }

  return { data, body: source.slice(match[0].length) };
}

/** Runs the same source extraction the site uses, so published code matches the page. */
function extractStorySources(storyFile) {
  const result = babel.transformSync(readFileSync(storyFile, 'utf8'), {
    filename: storyFile,
    babelrc: false,
    configFile: false,
    compact: false,
    retainLines: true,
    parserOpts: { plugins: ['typescript', 'jsx'] },
    plugins: [
      [
        require.resolve('@fluentui/babel-preset-storybook-full-source'),
        {
          importMappings,
          // Headless examples style with CSS Modules; without this the plugin strips those
          // imports and warns that the emitted sample would be invalid.
          cssModules: storyFile.includes('react-headless-components-preview')
            ? {
                tokensFilePath: join(
                  repoRoot,
                  'packages/react-components/react-headless-components-preview/stories/.storybook/tokens.css',
                ),
              }
            : false,
          storyGranularity: 'story',
        },
      ],
    ],
  });

  /*
   * Read the injected value from the AST rather than matching the emitted string. The source
   * contains escapes and newlines that a regex capture cannot be unescaped reliably.
   */
  const sources = [];
  const ast = babel.parse(result?.code ?? '', {
    babelrc: false,
    configFile: false,
    sourceType: 'module',
    parserOpts: { plugins: ['typescript', 'jsx'] },
  });

  babel.traverse(ast, {
    AssignmentExpression(path) {
      const { left, right } = path.node;

      if (
        left.type === 'MemberExpression' &&
        left.property.type === 'Identifier' &&
        left.property.name === 'fullSource' &&
        right.type === 'StringLiteral'
      ) {
        const owner = left.object;
        const name =
          owner.type === 'MemberExpression' && owner.object.type === 'Identifier' ? owner.object.name : 'Example';

        sources.push({ name, source: right.value });
      }
    },
  });

  return sources;
}

/** Resolves the story entry point a component page imports, if any. */
function resolveStoryEntry(body) {
  const match = body.match(/from '(@fluentui\/[\w-]+-stories\/src\/[^']+)'/);

  if (!match) {
    return null;
  }

  const [, specifier] = match;
  const [, pkg, rest] = specifier.match(/@fluentui\/([\w-]+)-stories\/src\/(.+)$/);
  const base = join(repoRoot, 'packages/react-components', pkg, 'stories/src', dirname(rest));

  return ['index.stories.tsx', 'index.stories.ts'].map(file => join(base, file)).find(file => existsSync(file));
}

const MAX_TYPE_LENGTH = 120;

/**
 * Makes a value safe for a Markdown table cell.
 *
 * Union types contain `|`, which would otherwise split the row into extra columns, and
 * descriptions contain newlines. A few generated unions are enormous (the `focusgroup`
 * attribute expands to several thousand members), so they are truncated rather than left to
 * bury the rest of the table.
 */
function cell(value, { truncate = 0 } = {}) {
  const text = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\|/g, '\\|');

  if (truncate > 0 && text.length > truncate) {
    return `${text.slice(0, truncate)}…`;
  }

  return text;
}

function propsTable(entry) {
  if (!entry?.props?.length) {
    return [];
  }

  const lines = [
    '## Props',
    '',
    '| Name | Type | Required | Default | Description |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const prop of entry.props) {
    lines.push(
      `| \`${cell(prop.name)}\` | \`${cell(prop.type, { truncate: MAX_TYPE_LENGTH })}\` | ${
        prop.required ? 'Yes' : 'No'
      } | ${cell(prop.defaultValue)} | ${cell(prop.description)} |`,
    );
  }

  return [...lines, ''];
}

const pages = [];

for (const tree of ['react', 'headless']) {
  const root = join(appRoot, 'content', tree);

  if (!existsSync(root)) {
    continue;
  }

  for await (const file of walk(root)) {
    const { data, body } = parseFrontmatter(await readFile(file, 'utf8'));

    const slug = relative(root, file)
      .replace(/\.mdx$/, '')
      .split(sep)
      .filter(segment => segment !== 'index')
      .join('/');

    const url = slug.length > 0 ? `/docs/${tree}/${slug}` : `/docs/${tree}`;
    const lines = [`# ${data.title ?? slug}`, ''];

    if (data.description) {
      lines.push(data.description, '');
    }

    const storyEntry = resolveStoryEntry(body);

    if (storyEntry) {
      const componentName = data.title?.replace(/\s+/g, '');
      lines.push(...propsTable(docgen[componentName]));

      const dir = dirname(storyEntry);
      const storyFiles = (await readdir(dir)).filter(
        name => name.endsWith('.stories.tsx') && name !== 'index.stories.tsx',
      );

      if (storyFiles.length > 0) {
        lines.push('## Examples', '');
      }

      for (const storyFile of storyFiles) {
        for (const { name, source } of extractStorySources(join(dir, storyFile))) {
          lines.push(`### ${name}`, '', '```tsx', source.trimEnd(), '```', '');
        }
      }
    } else {
      // Conceptual pages are already Markdown; strip only the JSX imports.
      lines.push(body.replace(/^import\s[\s\S]*?;$/gm, '').trim(), '');
    }

    pages.push({ url, title: data.title ?? slug, description: data.description, text: lines.join('\n') });
  }
}

for (const page of pages) {
  const outFile = join(outRoot, `${page.url.replace(/^\/docs\//, '')}.txt`);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page.text);
}

const summary = [
  `# ${SUMMARY_TITLE}`,
  '',
  `> ${SUMMARY_DESCRIPTION}`,
  '',
  '## Docs',
  '',
  ...pages
    .slice()
    .sort((a, b) => a.url.localeCompare(b.url))
    .map(page => `- [${page.title}](${page.url}.txt)${page.description ? `: ${page.description}` : ''}`),
  '',
];

await writeFile(join(outRoot, 'llms.txt'), summary.join('\n'));

console.log(`wrote llms.txt and ${pages.length} per-page text file(s)`);
