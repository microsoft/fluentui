import { writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { chromium, type Browser } from 'playwright';
import Turndown from 'turndown';
// @ts-ignore - No types available for this package
import { strikethrough, tables, taskListItems } from 'turndown-plugin-gfm';
import yargs from 'yargs';

main();

/**
 * Disable HTML escaping for the Turndown service.
 *
 * https://github.com/mixmark-io/turndown?tab=readme-ov-file#overriding-turndownserviceprototypeescape
 **/
Turndown.prototype.escape = (str: string) => str;

/**
 * Main entry point for the LLM docs generator script.
 * Orchestrates argument parsing, data extraction, and docs writing.
 */
async function main(): Promise<void> {
  try {
    console.log(`━━ Storybook LLM Docs Generator ━━`);
    const { distPath, baseUrl, port } = processArgs();
    console.log(`ℹ️ Storybook dist path: ${distPath}`);

    const data = await extractStorybookData(distPath, port);

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
    .option('port', {
      type: 'number',
      default: 6006,
      describe: 'Port to serve Storybook static build on',
    })
    .alias('h', 'help')
    .version(false).argv;

  return {
    distPath: join(cwd(), argv.distPath),
    baseUrl: argv.baseUrl,
    port: argv.port,
  };
}

/**
 * Finds a free port (if default is taken)
 */
async function findFreePort(startPort: number): Promise<number> {
  function check(port: number): Promise<boolean> {
    return new Promise(resolve => {
      const server = http.createServer();
      server.listen(port, () => {
        server.close(() => resolve(true));
      });
      server.on('error', () => resolve(false));
    });
  }
  let port = startPort;
  while (!(await check(port))) {
    port++;
    if (port > startPort + 100) throw new Error('Could not find a free port');
  }
  return port;
}

/**
 * Starts `npx serve` as a child process
 */
async function startStaticServer(distPath: string, port: number): Promise<{ proc: any; url: string }> {
  return new Promise(async (resolve, reject) => {
    const freePort = await findFreePort(port);
    const proc = spawn('npx', ['serve', distPath, '-l', freePort.toString(), '--no-clipboard'], {
      stdio: 'ignore',
      detached: true,
    });
    const url = `http://localhost:${freePort}`;
    // Wait for server to be ready
    let attempts = 0;
    const maxAttempts = 30;
    const wait = () => new Promise(res => setTimeout(res, 500));
    async function poll() {
      while (attempts < maxAttempts) {
        try {
          await new Promise((res, rej) => {
            http.get(url, resp => (resp.statusCode === 200 ? res(true) : rej())).on('error', rej);
          });
          return resolve({ proc, url });
        } catch {
          attempts++;
          await wait();
        }
      }
      reject(new Error('Static server did not start in time'));
    }
    poll();
  });
}

/**
 * Extracts all Storybook data, builds the section hierarchy, and handles `docsOnly` markdown extraction.
 * Returns the full section tree for further processing.
 */
async function extractStorybookData(distPath: string, port: number): Promise<StorybookStoreItem[]> {
  // Start static server
  console.log(`▶️ Starting static server with npx serve...`);
  const { proc: serverProc, url: serverUrl } = await startStaticServer(distPath, port);
  console.log(`✔️ Static server running at ${serverUrl}`);

  // Ensure server is killed on exit
  const cleanup = () => {
    try {
      process.kill(-serverProc.pid);
    } catch {}
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

  try {
    // Extract all stories from Storybook store
    const storeItems = await extractAllStoriesFromStorybook(browser, serverUrl);

    // Extract content for all `docsOnly/mdx` stories
    for (const storeItem of storeItems) {
      for (const story of Object.values(storeItem.stories)) {
        if (story.parameters?.docsOnly) {
          const docsOnlyUrl = `${serverUrl}/iframe?id=${story.id.replace('--page', '--docs')}&viewMode=docs`;
          story.parameters.fullSource = await extractDocsOnlyMarkdownWithBrowser(docsOnlyUrl, browser);
        }
      }
    }

    // Write raw stories to file for debugging
    // await writeFile(join(__dirname, 'story-source-raw.json'), JSON.stringify(storeItems, null, 2));

    console.log(`✔️ Extracted ${storeItems.length} stories from Storybook store.`);

    return storeItems;
  } finally {
    cleanup();
    if (browser) await browser.close();
  }
}

/**
 * Converts HTML content to markdown.
 */
async function convertHtmlToMarkdown(htmlContent: string) {
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

      if (content.trim().startsWith('```')) {
        return content;
      }

      return `\`\`\`${language}\n${content.trim()}\n\`\`\``;
    },
  });

  turndown.addRule('removeAnchorLinks', {
    filter(node) {
      return (
        node.tagName === 'A' &&
        (node.getAttribute('href') === null ||
          node.getAttribute('href').startsWith('#') ||
          node.getAttribute('aria-hidden') === 'true' ||
          node.getAttribute('tabindex') === '-1')
      );
    },
    replacement: () => '',
  });

  turndown.addRule('removeElements', {
    filter: ['button', 'style', 'script', 'img', 'svg'],
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
 * Extracts `docsOnly` markdown from a given URL using a browser.
 */
async function extractDocsOnlyMarkdownWithBrowser(url: string, browser: Browser): Promise<string> {
  try {
    const page = await browser.newPage();
    console.log(`📄 Extracting: ${url}`);
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

/**
 * Generates the summary file content from the storeItems array.
 */
function generateSummaryContent(serverUrl: string, storeItems: StorybookStoreItem[]): string[] {
  // Build a tree structure for summary
  const tree: Record<string, any> = {};
  for (const item of storeItems) {
    const parts = item.meta.title.split('/').filter(Boolean);
    let node = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node[part]) node[part] = { __children: {} };
      if (i === parts.length - 1) {
        node[part].__item = item;
      }
      node = node[part].__children;
    }
  }
  // Recursively generate summary lines
  function walk(node: any, level = 0, parentPath: string[] = []): string[] {
    let lines: string[] = [];
    for (const key of Object.keys(node)) {
      if (key === '__children' || key === '__item') continue;
      const entry = node[key];
      const item: StorybookStoreItem | undefined = entry.__item;
      const hasChildren = Object.keys(entry.__children).length > 0;
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
        lines = lines.concat(walk(entry.__children, level + 1, currentPath));
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
  summary.push(...walk(tree));
  return summary;
}

/**
 * Writes full markdown files for all components from storeItems.
 * For docsOnly items, render only fullSource. For others, render title, description, props, and examples.
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
function generateFullFileContentFromStory(storeItem: StorybookStoreItem): string[] {
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
        `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.defaultValue ?? ''} | ${
          prop.description?.replace(/\n/g, ' ') ?? ''
        } |`,
      );
    }
    content.push('');
  }
  const examples = Object.values(storeItem.stories)
    .filter(s => !s.parameters?.docsOnly)
    .map(s => ({
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

// --- STORYBOOK EXTRACTION ---

/**
 * Extracts all stories from Storybook.
 */
async function extractAllStoriesFromStorybook(browser: Browser, baseUrl: string): Promise<StorybookStoreItem[]> {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/iframe`);
  // Wait for story store to be ready
  await page.waitForFunction(() => {
    // @ts-ignore
    return window.__STORYBOOK_STORY_STORE__ && typeof window.__STORYBOOK_STORY_STORE__.cacheAllCSFFiles === 'function';
  });
  // Extract all stories
  const stories: StorybookStoreItem[] = await page.evaluate(async () => {
    // @ts-ignore
    await window.__STORYBOOK_STORY_STORE__.cacheAllCSFFiles();
    // @ts-ignore
    return Object.values(window.__STORYBOOK_STORY_STORE__.cachedCSFFiles);
  });
  await page.close();
  return stories;
}

/**
 * Extracts the description from a storybook story.
 */
function extractStoryDescription(story: StorybookStoreItem): string | undefined {
  return story.meta.parameters?.docs?.description?.component || undefined;
}

/**
 * Extracts the props from a storybook story.
 */
function extractStoryProps(story: StorybookStoreItem): ComponentProp[] | undefined {
  const docgen = story.meta.component?.__docgenInfo;
  if (!docgen || !docgen.props) return undefined;
  const props: ComponentProp[] = [];
  for (const [name, arg] of Object.entries(docgen.props)) {
    if (name === 'children') continue;
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
