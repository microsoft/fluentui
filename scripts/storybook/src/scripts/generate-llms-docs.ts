import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

import express from 'express';
import { type BrowserContext, chromium } from 'playwright';
import Turndown from 'turndown';
// @ts-expect-error - No types available for this package
import { strikethrough, tables, taskListItems } from 'turndown-plugin-gfm';
import yargs from 'yargs';

// Start the script
main();

/**
 * Main entry point for the LLM docs generator script.
 * Orchestrates argument parsing, data extraction, and docs writing.
 */
async function main() {
  try {
    console.log(`━━ Storybook LLM Docs Generator ━━`);
    const { distPath, baseUrl } = processArgs();
    console.log(`ℹ️ Storybook dist path: ${distPath}`);

    const data = await extractStorybookData(distPath);

    // Write llms.txt file
    await writeSummaryFile(distPath, baseUrl, data);

    // Write per component/page files
    await writeFullFiles(data, distPath);

    console.log(`✅ LLMs docs generation complete.`);
  } catch (error) {
    console.error(`❌ LLMs docs generation failed.`);
    console.error(error);
    process.exit(1);
  }
}

/**
 * Processes CLI arguments for `distPath` and `port`.
 */
function processArgs() {
  const argv = yargs(process.argv)
    .usage('CLI to generate LLMs docs for Storybook docs')
    .option('distPath', {
      type: 'string',
      demandOption: true,
      describe: 'Relative path to the Storybook distribution folder',
    })
    .option('baseUrl', {
      type: 'string',
      default: 'https://react.fluentui.dev',
      describe: 'Base URL for the Storybook docs',
    })
    .alias('h', 'help')
    .version(false).argv;

  return {
    distPath: join(cwd(), argv.distPath),
    baseUrl: argv.baseUrl,
  };
}

/**
 * Starts a static file server using Express
 */
function startStaticServer(distPath: string) {
  const app = express();
  // Enable CORS for all responses
  app.use((req, res, next) => {
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

type StorybookStoreItem = {
  meta: StorybookStoreItemMeta;
  stories: Record<string, StorybookStoreItemStory>;
};

type StorybookStoreItemMeta = {
  id: string;
  title: string;
  parameters?: {
    docs?: {
      description?: {
        component?: string;
        story?: string;
      };
    };
  };
  component?: {
    __docgenInfo?: {
      props?: Record<string, ComponentProp>;
    };
  };
};

type StorybookStoreItemStory = {
  id: string;
  name: string;
  parameters?: {
    docs?: {
      description?: {
        story?: string;
      };
    };
    fullSource?: string;
    docsOnly?: boolean;
  };
};

type ComponentProp = {
  defaultValue?: { value: string } | string;
  description?: string;
  name: string;
  required?: boolean;
  type?: {
    name?: string;
    value?: { value: string }[];
  };
};

/**
 * Extracts all Storybook data, builds the section hierarchy, and handles `docsOnly` markdown extraction.
 * Returns the full section tree for further processing.
 */
async function extractStorybookData(distPath: string) {
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
    for (const storeItem of storeItems) {
      for (const story of Object.values(storeItem.stories)) {
        if (story.parameters?.docsOnly) {
          const pageUrl = `${serverUrl}/iframe.html?id=${story.id.replace('--page', '--docs')}&viewMode=docs`;
          story.parameters.fullSource = await extractMDXStoryContentWithBrowser(pageUrl, context);
        }
      }
    }

    // Write raw stories to file for debugging
    // await writeFile(join(__dirname, 'story-source-raw.json'), JSON.stringify(storeItems, null, 2));

    console.log(`✔️ Extracted ${storeItems.length} stories from Storybook store.`);

    return storeItems;
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
async function convertHtmlToMarkdown(htmlContent: string) {
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
  const markdown = turndown.turndown(htmlContent);

  // Post-process to clean up formatting
  return markdown
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize multiple newlines
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\n\n```/g, '\n\n```') // Proper spacing before code blocks
    .replace(/```\n\n/g, '```\n\n') // Proper spacing after code blocks
    .replace(/\n\n#+/g, '\n\n#') // Clean up heading spacing
    .replace(/\n\n-/g, '\n\n-'); // Clean up list spacing
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
async function writeSummaryFile(distPath: string, serverUrl: string, storeItems: StorybookStoreItem[]) {
  const summaryContent = generateSummaryContent(serverUrl, storeItems);
  await writeFile(join(distPath, 'llms.txt'), summaryContent.join('\n'));
  console.log(`✅ LLMs docs summary written to ${join(distPath, 'llms.txt')}`);
}

// Add a type for the summary tree node
interface SummaryTreeNode {
  children: Record<string, SummaryTreeNode>;
  item?: StorybookStoreItem;
}

/**
 * Generates the summary file content from the storeItems array.
 */
function generateSummaryContent(serverUrl: string, storeItems: StorybookStoreItem[]) {
  // Build a tree structure for summary
  const root: SummaryTreeNode = { children: {} };
  for (const item of storeItems) {
    const parts = item.meta.title.split('/').filter(Boolean);
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node.children[part]) {
        node.children[part] = { children: {} };
      }
      if (i === parts.length - 1) {
        node.children[part].item = item;
      }
      node = node.children[part];
    }
  }
  // Recursively generate summary lines
  function walk(node: Record<string, SummaryTreeNode>, level = 0, parentPath: string[] = []) {
    let lines: string[] = [];
    for (const key of Object.keys(node)) {
      if (key === 'children' || key === 'item') {
        continue;
      }
      const entry = node[key];
      const item: StorybookStoreItem | undefined = entry.item;
      const hasChildren = Object.keys(entry.children).length > 0;
      const currentPath = [...parentPath, key];

      if (hasChildren) {
        // Only output heading if there are children
        if (level === 0) {
          lines.push('');
          lines.push(`## ${key}`);
          lines.push('');
        } else if (level === 1) {
          lines.push('');
          lines.push(`### ${key}`);
          lines.push('');
        } else if (level === 2) {
          lines.push('');
          lines.push(`#### ${key}`);
          lines.push('');
        }
        lines = lines.concat(walk(entry.children, level + 1, currentPath));
      } else if (item) {
        // Only output a single entry for the leaf
        const fileName = `${item.meta.id}.txt`;
        const description = item.meta.parameters?.docs?.description?.component || '';
        const leafTitle = item.meta.title.split('/').pop() || item.meta.title;
        lines.push(
          `- [${leafTitle}](${serverUrl}/llms/${fileName})${description ? ' - ' + description.split('\n')[0] : ''}`,
        );
      }
    }
    return lines;
  }
  // Header
  const summary: string[] = [
    '# Fluent UI React v9',
    '',
    "Fluent UI React is a library of React components that implement Microsoft's Fluent Design System.",
    '',
    '> **Note:** This summary only outlines available sections. For a detailed description of every section/component, see the dedicated file linked for each entry below.',
    '',
  ];
  summary.push(...walk(root.children));
  return summary;
}

/**
 * Writes full markdown files for all components from `storeItems`.
 * For MDX pages, render only `fullSource`. For others, render title, description, props, and examples.
 */
async function writeFullFiles(storeItems: StorybookStoreItem[], distPath: string) {
  const llmsDir = join(distPath, 'llms');

  // Clean up `llms` directory
  await rm(llmsDir, { recursive: true, force: true });
  await mkdir(llmsDir, { recursive: true });

  for (const item of storeItems) {
    const filePath = join(llmsDir, `${item.meta.id}.txt`);
    const content = generateFullFileContentFromStory(item);
    await writeFile(filePath, content.join('\n'));
  }
}

/**
 * Generates the full markdown content for a given storybook story.
 */
function generateFullFileContentFromStory(storeItem: StorybookStoreItem) {
  const isDocsOnly = Object.values(storeItem.stories).every(s => s.parameters?.docsOnly);

  if (isDocsOnly) {
    return Object.values(storeItem.stories)
      .map(s => s.parameters?.fullSource ?? '')
      .filter(Boolean);
  }

  const content: string[] = [];
  content.push(`# ${storeItem.meta.title}`);
  content.push('');
  const description = extractStoryDescription(storeItem);
  if (description) {
    content.push(description);
    content.push('');
  }
  const props = extractStoryProps(storeItem);
  if (props && props.length > 0) {
    content.push('## Props');
    content.push('');
    content.push('| Name | Type | Required | Default | Description |');
    content.push('|------|------|----------|---------|-------------|');
    for (const prop of props) {
      content.push(
        `| \`${prop.name}\` | \`${stringifyPropType(prop.type)}\` | ${prop.required ? 'Yes' : 'No'} | ${
          prop.defaultValue ?? ''
        } | ${prop.description?.replace(/\n/g, ' ') ?? ''} |`,
      );
    }
    content.push('');
  }
  const examples = Object.values(storeItem.stories).map(s => ({
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
function stringifyPropType(type: ComponentProp['type']): string {
  if (!type) {
    return '';
  }
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'object' && type !== null && 'name' in type && typeof type.name === 'string') {
    const t = type as { name: string; value?: unknown; type?: string };
    // Handle enums, unions, arrays, etc.
    if (t.name === 'enum' && Array.isArray(t.value)) {
      return `\`${t.value.map(v => (typeof v.value === 'string' ? v.value : JSON.stringify(v.value))).join('| ')}\``;
    }
    if (t.name === 'union' && Array.isArray(t.value)) {
      return t.value.map(v => stringifyPropType(v)).join(' | ');
    }
    if (t.name === 'array' && t.value) {
      return `${stringifyPropType(t.value)}[]`;
    }
    if (t.name === 'signature' && t.type === 'function') {
      // Function signature
      return 'function';
    }
    return t.name;
  }
  return JSON.stringify(type);
}

/**
 * Extracts all stories from Storybook.
 */
async function extractAllStoriesFromStorybook(context: BrowserContext, baseUrl: string) {
  const page = await context.newPage();
  await page.goto(`${baseUrl}/iframe.html`);
  // Wait for the page to load
  await page.waitForFunction(() => {
    // @ts-expect-error - Storybook Client API is not typed
    return window.__STORYBOOK_CLIENT_API__;
  });
  // Extract all stories
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
function extractStoryProps(story: StorybookStoreItem) {
  const docgen = story.meta.component?.__docgenInfo;
  if (!docgen || !docgen.props) {
    return undefined;
  }
  const props: ComponentProp[] = [];
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
  return props.length > 0 ? props : undefined;
}
