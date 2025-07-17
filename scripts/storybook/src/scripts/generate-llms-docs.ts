import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

import express from 'express';
import { type BrowserContext, chromium } from 'playwright';
import Turndown from 'turndown';
// @ts-expect-error - No types available for this package
import { strikethrough, tables, taskListItems } from 'turndown-plugin-gfm';
import yargs from 'yargs';

/**
 * CLI arguments
 */
export type Args = {
  /**
   * Relative path to the Storybook distribution folder
   */
  distPath: string;
  /**
   * Base URL for the Storybook docs
   */
  baseUrl: string;
  /**
   * Title for the llms.txt file
   */
  summaryTitle?: string;
  /**
   * Description for the llms.txt file
   */
  summaryDescription?: string;
  /**
   * Array of composed Storybook refs (objects with id, title, url).
   * Used to reference external Storybook docs.
   */
  refs?: StorybookRef[];
};

/**
 * Storybook store item, contains component/page metadata and stories.
 */
export type StorybookStoreItem = {
  meta: StorybookStoreItemMeta;
  stories: Record<string, StorybookStoreItemStory>;
};

/**
 * Storybook store item metadata
 */
export type StorybookStoreItemMeta = {
  id: string;
  title: string;
  parameters: {
    fileName: string;
    docs?: {
      description?: {
        component?: string;
        story?: string;
      };
    };
  };
  component?: StorybookComponent;
  subcomponents?: Record<string, StorybookComponent>;
};

/**
 * Storybook store item story, contains story metadata like name, parameters, etc.
 */
export type StorybookStoreItemStory = {
  id: string;
  name: string;
  parameters: {
    docs: {
      description?: {
        component?: string;
        story?: string;
      };
    };
    fullSource?: string;
    docsOnly?: boolean;
  };
};

/**
 * Storybook component metadata, contains component name, description, props, etc.
 */
export type StorybookComponent = {
  displayName: string;
  __docgenInfo?: {
    description?: string;
    displayName?: string;
    props?: Record<string, StorybookComponentProp> | null;
  };
};

/**
 * Storybook component prop metadata, contains prop name, description, type, etc.
 */
export type StorybookComponentProp = {
  defaultValue?: { value: string } | string | null;
  description?: string;
  name: string;
  required?: boolean;
  type?: {
    name?: string;
    value?: { value: string }[];
  };
};

/**
 * Composed Storybook ref, used to link to other Storybook docs.
 * see: https://storybook.js.org/docs/sharing/storybook-composition
 *
 * @example
 * ```ts
 * { id: 'charts-v9', title: 'Fluent UI Charts v9', url: 'https://charts.fluentui.dev' }
 * ```
 */
export type StorybookRef = { title: string; url: string; sourceUrl?: string };

/**
 * Data extracted from Storybook
 */
export type StorybookData = {
  refs: StorybookRef[];
  storyStoreItems: StorybookStoreItem[];
};

/**
 * Type guard for StorybookRef
 */
function isStorybookRef(obj: unknown): obj is StorybookRef {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    typeof obj.title === 'string' &&
    'url' in obj &&
    typeof obj.url === 'string'
  );
}

/**
 * Parses refs from CLI arguments.
 */
function parseRefs(refs: unknown[]): StorybookRef[] {
  if (Array.isArray(refs)) {
    return refs
      .map(ref => {
        if (typeof ref === 'string') {
          try {
            return JSON.parse(ref);
          } catch {
            return null;
          }
        }
        return ref;
      })
      .filter(isStorybookRef);
  }

  return [];
}

/**
 * Processes CLI arguments for `distPath`, `refs`, and other options.
 *
 * Users are encouraged to provide a yargs-compatible config file (e.g., llms.config.js)
 * that exports all needed options, including a normalized refs array if desired.
 */
function processArgs(): Required<Args> {
  const argv = yargs(process.argv)
    .usage('CLI to generate LLMs docs for Storybook docs')
    .option('distPath', {
      type: 'string',
      demandOption: true,
      describe: 'Relative path to the Storybook distribution folder',
    })
    .option('baseUrl', {
      type: 'string',
      default: '/',
      describe: 'Base URL for the Storybook docs',
    })
    .option('summaryTitle', {
      type: 'string',
      default: 'Summary',
      describe: 'Title for the summary file',
    })
    .option('summaryDescription', {
      type: 'string',
      default: '',
      describe: 'Description for the summary file',
    })
    .option('refs', {
      type: 'array',
      default: [],
      demandOption: false,
      describe: 'Array of composed Storybook refs (objects with id, title, url)',
    })
    .config()
    .alias('h', 'help')
    .version(false).argv;

  return {
    distPath: join(cwd(), argv.distPath),
    baseUrl: argv.baseUrl,
    summaryTitle: argv.summaryTitle,
    summaryDescription: argv.summaryDescription,
    refs: parseRefs(argv.refs),
  };
}

/**
 * Starts a static file server using Express
 */
function startStaticServer(distPath: string) {
  const app = express();
  // Enable CORS for all responses
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use(express.static(distPath));

  return new Promise<{ server: ReturnType<typeof app.listen>; url: string }>((resolve, reject) => {
    const server = app.listen(0, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({ server, url: `http://localhost:${port}` });
    });
    server.on('error', reject);
  });
}

/**
 * Extracts data for all stories, including `MDX` stories.
 * refs are now provided by the user/config, not parsed internally.
 */
async function extractStorybookData({
  distPath,
  refs,
}: {
  distPath: string;
  refs: StorybookRef[];
}): Promise<StorybookData> {
  // Start static server
  console.log(`▶️ Starting static server with Express...`);
  const { server: staticServer, url: serverUrl } = await startStaticServer(distPath);
  console.log(`✔️ Static server running at ${serverUrl}`);

  // Ensure server is killed on exit
  const cleanup = () => {
    try {
      staticServer.close();
    } catch {
      // intentionally empty: server may already be closed
    }
  };
  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(1);
  });
  process.on('SIGTERM', () => {
    cleanup();
    process.exit(1);
  });

  const browser = await chromium.launch();
  const context = await browser.newContext({ bypassCSP: true });

  try {
    // Extract all stories from Storybook store
    const storeItems = await extractAllStoriesFromStorybook(context, serverUrl);

    // Extract content for all MDX pages
    for (const item of storeItems) {
      const stories = Object.values(item.stories);

      if (stories.length > 0) {
        for (const story of stories) {
          if (story.parameters?.docsOnly) {
            const pageUrl = `${serverUrl}/iframe.html?id=${story.id.replace('--page', '--docs')}`;
            story.parameters.fullSource = await extractMDXStoryContentWithBrowser(pageUrl, context);
          }
        }
      } else if (item.meta.parameters.fileName.endsWith('.mdx')) {
        const pageUrl = `${serverUrl}/iframe.html?id=${item.meta.id.replace('--page', '--docs')}`;
        item.stories[`${item.meta.id}`] = {
          id: item.meta.id,
          name: item.meta.title,
          parameters: {
            fullSource: await extractMDXStoryContentWithBrowser(pageUrl, context),
            docsOnly: true,
            docs: {},
          },
        };
      }
    }

    // await writeFile(join(__dirname, 'story-source-raw.json'), JSON.stringify(storeItems, null, 2));

    console.log(`✔️ Extracted ${storeItems.length} stories from Storybook store.`);

    return { refs, storyStoreItems: storeItems };
  } finally {
    cleanup();
    if (browser) {
      await browser.close();
    }
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
 * Extracts `MDX` story content from a given URL using a browser.
 */
async function extractMDXStoryContentWithBrowser(url: string, context: BrowserContext) {
  try {
    const page = await context.newPage();
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
 * Writes the summary file for all store items.
 */
async function writeSummaryFile(args: Required<Args>, data: StorybookData) {
  const summaryContent = generateSummaryContent(args, data);
  await writeFile(join(args.distPath, 'llms.txt'), summaryContent.join('\n'));
  console.log(`✅ LLMs docs summary written to ${join(args.distPath, 'llms.txt')}`);
}

/**
 * Generates the summary file content from the storeItems array.
 */
export function generateSummaryContent(
  { summaryTitle, summaryDescription, baseUrl }: Required<Args>,
  data: StorybookData,
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
  for (const item of data.storyStoreItems) {
    let description = item.meta.parameters?.docs?.description?.component || '';
    if (description) {
      description = `: ${description.split('\n')[0]}`;
    }
    summary.push(`- [${item.meta.title}](${baseUrl}/llms/${item.meta.id}.txt)${description}`);
  }

  // Adds links to all composed Storybook
  if (data.refs && data.refs.length > 0) {
    summary.push('');
    summary.push('## Optional');
    summary.push('');
    for (const ref of data.refs) {
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
async function writeFullDocsFiles({ distPath }: Required<Args>, data: StorybookData) {
  const llmsDir = join(distPath, 'llms');

  // Clean up `llms` directory
  await rm(llmsDir, { recursive: true, force: true });
  await mkdir(llmsDir, { recursive: true });

  for (const item of data.storyStoreItems) {
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
    source: s.parameters?.fullSource,
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
 * Extracts all stories from Storybook Client API store.
 */
async function extractAllStoriesFromStorybook(context: BrowserContext, baseUrl: string) {
  const page = await context.newPage();
  await page.goto(`${baseUrl}/iframe.html`);
  // Wait for the Storybook Client API to be loaded
  await page.waitForFunction(() => {
    // @ts-expect-error - Storybook Client API is not typed
    return window.__STORYBOOK_CLIENT_API__;
  });

  const stories: StorybookStoreItem[] = await page.evaluate(async () => {
    // @ts-expect-error - Storybook Client API is not typed
    await window.__STORYBOOK_CLIENT_API__.storyStore.cacheAllCSFFiles();
    // @ts-expect-error - Storybook Client API is not typed
    return Object.values(window.__STORYBOOK_CLIENT_API__.storyStore.cachedCSFFiles);
  });
  await page.close();
  return stories;
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

// Start the script
if (require.main === module) {
  main();
}

/**
 * Main entry point for the LLM docs generator script.
 * Orchestrates argument parsing, data extraction, and docs writing.
 */
async function main() {
  try {
    console.log(`━━ Storybook LLM Docs Generator ━━`);
    const args = processArgs();
    console.log(`ℹ️ Storybook dist path: ${args.distPath}`);

    const data = await extractStorybookData(args);

    // Write llms.txt file
    await writeSummaryFile(args, data);

    // Write per component/page files
    await writeFullDocsFiles(args, data);

    console.log(`✅ LLMs docs generation complete.`);
  } catch (error) {
    console.error(`❌ LLMs docs generation failed.`);
    console.error(error);
    process.exit(1);
  }
}
