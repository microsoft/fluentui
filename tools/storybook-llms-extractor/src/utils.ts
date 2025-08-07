import { mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import { existsSync } from 'node:fs';

import { type BrowserContext, type Page, chromium } from 'playwright';
import Turndown from 'turndown';
import { strikethrough, tables, taskListItems } from 'turndown-plugin-gfm';

import type { Args, StorybookComponentProp, StorybookComponent, StorybookStoreItem } from './types';

/**
 * Get content type based on file extension
 */
function getContentType(ext: string): string {
  const contentTypes: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
  };

  return contentTypes[ext] || 'application/octet-stream';
}

/**
 * Sets up static file serving using Playwright's page.route
 */
async function setupStaticRouting(page: Page, distPath: string) {
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    let filePath = url.pathname;

    // Remove leading slash and resolve relative to distPath
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }

    // If no file extension, try to serve index.html
    if (!extname(filePath)) {
      filePath = join(filePath, 'index.html');
    }

    const fullPath = resolve(distPath, filePath);

    try {
      // Security check: ensure file is within distPath
      if (existsSync(fullPath) && fullPath.startsWith(resolve(distPath))) {
        const content = await readFile(fullPath);
        const contentType = getContentType(extname(fullPath));

        await route.fulfill({
          status: 200,
          contentType,
          body: content,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      } else {
        await route.fulfill({
          status: 404,
          body: 'File not found',
        });
      }
    } catch (error) {
      console.error(`Error serving file ${fullPath}:`, error);
      await route.fulfill({
        status: 500,
        body: 'Internal server error',
      });
    }
  });
}

/**
 * Extracts data for all stories, including `MDX` stories.
 * Now uses Playwright routing instead of Express server.
 */
export async function extractStorybookData({ distPath }: Args): Promise<StorybookStoreItem[]> {
  console.log(`▶️ Setting up Playwright with static file routing...`);

  const browser = await chromium.launch();
  const context = await browser.newContext({ bypassCSP: true });

  try {
    console.log(`✔️ Static file routing configured for ${distPath}`);

    // Extract all stories from Storybook store
    const storeItems = await extractAllStoriesFromStorybook(context, distPath);

    // Extract content for all MDX pages
    for (const item of storeItems) {
      const stories = Object.values(item.stories);

      if (stories.length > 0) {
        for (const story of stories) {
          if (story.parameters?.docsOnly) {
            const pageUrl = `http://localhost/iframe.html?id=${story.id.replace('--page', '--docs')}`;
            story.parameters.fullSource = await extractMDXStoryContentWithBrowser(pageUrl, context, distPath);
          }
        }
      } else if (item.meta.parameters.fileName.endsWith('.mdx')) {
        const pageUrl = `http://localhost/iframe.html?id=${item.meta.id.replace('--page', '--docs')}`;
        item.stories[`${item.meta.id}`] = {
          id: item.meta.id,
          name: item.meta.title,
          parameters: {
            fullSource: await extractMDXStoryContentWithBrowser(pageUrl, context, distPath),
            docsOnly: true,
            docs: {},
          },
        };
      }
    }

    console.log(`✔️ Extracted ${storeItems.length} stories from Storybook store.`);

    return storeItems;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Storybook Client API store, contains methods to cache CSF files and cached items.
 */
type StorybookStoryStore = {
  /**
   * Caches all CSF files in the Storybook store.
   * This method must be called before accessing `cachedCSFFiles`.
   */
  cacheAllCSFFiles: () => Promise<void>;
  /**
   * CSF files become available after `cacheAllCSFFiles()` is resolved.
   **/
  cachedCSFFiles?: Record<string, StorybookStoreItem>;
};

/**
 * Storybook Client API store, contains methods to cache CSF files.
 */
interface StorybookGlobals extends Window {
  /**
   * Storybook Client API, contains story store and other metadata.
   * `storyStore` is used for Storybook 7, `storyStoreValue` for >= 8.
   */
  __STORYBOOK_PREVIEW__?: { storyStore: StorybookStoryStore } | { storyStoreValue: StorybookStoryStore };
}

/**
 * Extracts all stories from Storybook Client API store.
 */
async function extractAllStoriesFromStorybook(context: BrowserContext, distPath: string) {
  const page = await context.newPage();

  // Set up static file routing for this page
  await setupStaticRouting(page, distPath);

  await page.goto(`http://localhost/iframe.html`);

  // Wait for the Storybook Client API to be loaded
  await page.waitForFunction(() => {
    return (window as StorybookGlobals).__STORYBOOK_PREVIEW__;
  });

  const stories: StorybookStoreItem[] = await page.evaluate(async () => {
    /**
     * Retrieves the Storybook story store from the global window object.
     *
     * @param window Storybook globals object
     * @throws If unable to find Storybook preview or story store
     */
    const getStoryStore = (window: StorybookGlobals) => {
      const preview = window.__STORYBOOK_PREVIEW__;

      if (!preview) {
        throw new Error('Unable to find Storybook preview');
      }

      if ('storyStore' in preview && preview.storyStore) {
        return preview.storyStore;
      }

      if ('storyStoreValue' in preview && preview.storyStoreValue) {
        return preview.storyStoreValue;
      }

      throw new Error('Unable to find Storybook story store');
    };

    const storyStore = getStoryStore(window);

    await storyStore.cacheAllCSFFiles();

    if (!storyStore.cachedCSFFiles) {
      throw new Error('Unable to find cached CSF files in Storybook store');
    }

    return Object.values(storyStore.cachedCSFFiles);
  });

  await page.close();
  return stories;
}

/**
 * Extracts `MDX` story content from a given URL using a browser.
 */
async function extractMDXStoryContentWithBrowser(url: string, context: BrowserContext, distPath: string) {
  try {
    const page = await context.newPage();

    // Set up routing for this page
    await setupStaticRouting(page, distPath);

    console.log(`Extracting: "${url}"`);
    await page.goto(url);
    await page.waitForSelector('.sbdocs-content', { state: 'attached', timeout: 2000 });
    const html = await page.locator('.sbdocs-content').innerHTML();
    await page.close();
    return convertHtmlToMarkdown(html);
  } catch (error) {
    console.error(`❌ Failed to extract: ${url}`, error);
    return '';
  }
}

/**
 * Converts HTML content to markdown.
 */
export async function convertHtmlToMarkdown(htmlContent: string) {
  /**
   * Disable HTML escaping for the Turndown service.
   *
   * https://github.com/mixmark-io/turndown?tab=readme-ov-file#overriding-turndownserviceprototypeescape
   **/
  Turndown.prototype.escape = (str: string) => str;

  const turndown = new Turndown({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });

  // GitHub Flavored Markdown rules
  turndown.use([strikethrough, tables, taskListItems]);

  // Code block rule
  turndown.addRule('codeBlock', {
    filter(node) {
      return node.nodeName === 'PRE';
    },
    replacement(content, node) {
      // Extract language from any element with class containing "language-"
      const languageElement = node.querySelector('[class*="language-"]');
      let language = '';
      if (languageElement) {
        const classNames = languageElement.className.split(' ');
        const languageClass = classNames.find((cls: string) => cls.startsWith('language-'));
        if (languageClass) {
          language = languageClass.replace('language-', '');
        }
      }

      const normalizedContent = content.trim();

      if (normalizedContent.startsWith('```')) {
        return normalizedContent;
      }

      return `\`\`\`${language}\n${normalizedContent}\n\`\`\``;
    },
  });

  // Remove unnecessary anchor links
  turndown.addRule('removeAnchorLinks', {
    filter(node) {
      return (
        node.tagName === 'A' &&
        (node.getAttribute('href') === null ||
          node.getAttribute('href')?.startsWith('#') ||
          node.getAttribute('aria-hidden') === 'true' ||
          node.getAttribute('tabindex') === '-1')
      );
    },
    replacement: () => '',
  });

  // Remove other unnecessary elements
  turndown.addRule('removeElements', {
    filter: ['button', 'style', 'script', 'img'],
    replacement: () => '',
  });

  // Convert to markdown
  return turndown.turndown(htmlContent);
}

/**
 * Writes the summary file for all store items.
 */
export async function writeSummaryFile(args: Required<Args>, data: StorybookStoreItem[]) {
  const summaryContent = generateSummaryContent(args, data);
  await writeFile(join(args.distPath, 'llms.txt'), summaryContent.join('\n'));
  console.log(`✅ LLMs docs summary written to ${join(args.distPath, 'llms.txt')}`);
}

/**
 * Generates the summary file content from the storeItems array.
 */
export function generateSummaryContent(
  { summaryTitle, summaryDescription, summaryBaseUrl, refs }: Required<Args>,
  data: StorybookStoreItem[],
) {
  // Initialize summary array with header content
  const summary: string[] = [
    `# ${summaryTitle}`,
    '',
    '> **Note:** This is a summary overview using the LLMs.txt format (https://llmstxt.org/). Each section links to its full documentation file in plain text (.txt) format. Click any link below to view the detailed documentation for that section.',
    '',
    summaryDescription,
    '',
  ];

  // Adds links to all components/pages
  for (const item of data) {
    let description = item.meta.parameters?.docs?.description?.component || '';
    if (description) {
      description = `: ${description.split('\n')[0]}`;
    }
    summary.push(`- [${item.meta.title}](${summaryBaseUrl}/llms/${item.meta.id}.txt)${description}`);
  }

  // Adds links to all composed Storybook
  if (refs && refs.length > 0) {
    summary.push('');
    summary.push('## Optional');
    summary.push('');
    for (const ref of refs) {
      summary.push(`- [${ref.title}](${ref.url.replace(/\/$/, '')}/llms.txt)`);
    }
    summary.push('');
  }

  return summary;
}

/**
 * Writes full markdown files for all components from `storeItems`.
 * For MDX pages, render only `fullSource`. For others, render title, description, props, and examples.
 */
export async function writeFullDocsFiles({ distPath }: Required<Args>, data: StorybookStoreItem[]) {
  const llmsDir = join(distPath, 'llms');

  // Clean up `llms` directory
  await rm(llmsDir, { recursive: true, force: true });
  await mkdir(llmsDir, { recursive: true });

  for (const item of data) {
    const filePath = join(llmsDir, `${item.meta.id}.txt`);
    const content = generateFullFileContentFromStory(item);
    await writeFile(filePath, content.join('\n'));
  }
}

/**
 * Generates the full markdown content for a given storybook story.
 */
export function generateFullFileContentFromStory(item: StorybookStoreItem) {
  const stories = Object.values(item.stories);
  const isMDXPage = stories.every(s => s.parameters?.docsOnly);

  if (isMDXPage) {
    return stories.map(s => s.parameters?.fullSource ?? '').filter(Boolean);
  }

  const content: string[] = [];
  content.push(`# ${item.meta.title}`);
  content.push('');
  const description = extractStoryDescription(item);
  if (description) {
    content.push(description);
    content.push('');
  }
  const props = extractComponentProps(item.meta.component);
  if (props.length > 0) {
    content.push('## Props');
    content.push('');
    content.push(...generateComponentPropsTable(props));
    content.push('');
  }

  if (item.meta.subcomponents) {
    content.push('## Subcomponents');
    content.push('');

    for (const [name, subcomponent] of Object.entries(item.meta.subcomponents)) {
      const docgen = subcomponent?.__docgenInfo;
      if (!docgen) {
        continue;
      }

      content.push('');
      content.push(`### ${name}`);
      content.push('');
      content.push(docgen.description ?? '');
      content.push('');

      const subcomponentProps = extractComponentProps(subcomponent);
      if (subcomponentProps.length > 0) {
        content.push('#### Props');
        content.push('');
        content.push(...generateComponentPropsTable(subcomponentProps));
        content.push('');
      }
    }
  }

  const examples = Object.values(item.stories).map(s => ({
    title: s.name,
    description: s.parameters?.docs?.description?.story,
    source: s.parameters?.fullSource ?? s.parameters.docs?.source?.originalSource,
  }));
  if (examples.length > 0) {
    content.push('## Examples');
    content.push('');
    for (const ex of examples) {
      content.push('');
      content.push(`### ${ex.title}`);
      content.push('');
      if (ex.description) {
        content.push(ex.description);
        content.push('');
      }
      if (ex.source) {
        content.push('```tsx');
        content.push(ex.source.trim());
        content.push('```');
      }
    }
  }
  return content;
}

/**
 * Converts a docgen type object to a readable string for markdown tables.
 */
function stringifyPropType(type: StorybookComponentProp['type']): string {
  if (!type) {
    return '';
  }
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'object' && type !== null && 'name' in type && typeof type.name === 'string') {
    // Handle enums, unions, arrays, etc.
    if (type.name === 'enum' && Array.isArray(type.value)) {
      return type.value.map(v => (typeof v.value === 'string' ? v.value : JSON.stringify(v.value))).join(' ');
    }
    if (type.name === 'union' && Array.isArray(type.value)) {
      return type.value.map(v => (typeof v.value === 'string' ? v.value : JSON.stringify(v.value))).join(' ');
    }
    if (type.name === 'array' && type.value) {
      return `${stringifyPropType(type.value as StorybookComponentProp['type'])}[]`;
    }
    if (type.name === 'signature' && type.value?.[0]?.value === 'function') {
      // Function signature
      return 'function';
    }
    return type.name;
  }
  return JSON.stringify(type);
}

/**
 * Extracts the description from a storybook story.
 */
function extractStoryDescription(story: StorybookStoreItem) {
  return story.meta.parameters?.docs?.description?.component || undefined;
}

/**
 * Extracts the props from a storybook story.
 */
function extractComponentProps(component?: StorybookComponent) {
  const docgen = component?.__docgenInfo;
  if (!docgen || !docgen.props) {
    return [];
  }
  const props: StorybookComponentProp[] = [];
  for (const [name, arg] of Object.entries(docgen.props)) {
    if (name === 'children') {
      continue;
    }
    props.push({
      name,
      description: arg.description || '',
      type: arg.type,
      defaultValue: typeof arg.defaultValue === 'string' ? arg.defaultValue : arg.defaultValue?.value || '',
      required: arg.required,
    });
  }
  return props;
}

function generateComponentPropsTable(props: StorybookComponentProp[]): string[] {
  const content: string[] = [];

  if (props.length === 0) {
    return content;
  }

  content.push('');
  content.push('| Name | Type | Required | Default | Description |');
  content.push('|------|------|----------|---------|-------------|');
  for (const prop of props) {
    content.push(
      `| ${[
        `\`${prop.name}\``,
        `\`${stringifyPropType(prop.type)}\``,
        prop.required ? 'Yes' : 'No',
        prop.defaultValue ?? '',
        prop.description?.replace(/\n/g, ' ') ?? '',
      ].join(' | ')} |`,
    );
  }
  content.push('');

  return content;
}
