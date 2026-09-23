import { llms } from 'fumadocs-core/source/llms';
import { renderPlaceholder } from 'fumadocs-core/mdx-plugins/remark-llms.runtime';
import { sources } from './source';
import type { DocsTree } from './source';
import { createDocsTree } from './utils/createDocsTree';
import { getOverviewLinks } from './utils/getOverviewLinks';
import { docsBasename } from './utils/paths';

type Story = (() => unknown) & {
  parameters?: { fullSource?: string; docs?: { description?: { story?: string } } };
};

interface ComponentContent {
  meta: { parameters?: { docs?: { description?: { component?: string }; hideArgsTable?: boolean } } };
  stories: Record<string, unknown>;
  order?: string[];
}

export function markdownUrl(url: string): string {
  return `${docsBasename}${url}.txt`;
}

export function markdownIndex(): string {
  return [
    '# Fluent UI',
    '',
    '> React v9 and Headless documentation.',
    '',
    ...Object.entries(sources).map(([collection, source]) => {
      const tree = createDocsTree(source.pageTree);
      function textUrls(node: (typeof tree.children)[number]) {
        if (node.type === 'page' && !node.external) {
          node.url = markdownUrl(node.url);
        } else if (node.type === 'folder') {
          if (node.index) {
            textUrls(node.index);
          }
          node.children.forEach(textUrls);
        }
      }
      const children = structuredClone(tree.children);
      children.forEach(textUrls);
      return llms(source).indexNode({
        type: 'folder',
        name: collection === 'react' ? 'React v9' : 'Headless',
        children,
      });
    }),
  ].join('\n');
}

export async function pageMarkdown(collection: DocsTree, slugs: string[]): Promise<string | undefined> {
  const source = sources[collection];
  const page = source.getPage(slugs);
  if (!page) {
    return undefined;
  }
  const markdown = await page.data.getText('processed');
  const loaded = await page.data.load();
  const components = loaded._exports._componentPages as ComponentContent[];
  const body = await renderPlaceholder(markdown, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ComponentPage({ attributes, children }) {
      const component = components[Number(attributes['data-llms-id'])];
      if (!component) {
        throw new Error(`Missing component Markdown data for ${page.url}`);
      }

      const { meta, stories } = component;
      const names = Object.keys(stories).filter(name => name !== 'default' && typeof stories[name] === 'function');
      const order = component.order ?? (stories.__storyOrder as string[] | undefined) ?? names;
      const ordered = [...new Set([...order.filter(name => names.includes(name)), ...names])];

      const examples = ordered.map(name => {
        const story = stories[name] as Story;
        const code = story.parameters?.fullSource;

        if (!code) {
          throw new Error(`Missing standalone source for ${page.url}: ${name}`);
        }

        const fence = '`'.repeat(Math.max(3, ...Array.from(code.matchAll(/`+/g), match => match[0].length + 1)));
        return [`### ${name}`, story.parameters?.docs?.description?.story, `${fence}tsx\n${code.trimEnd()}\n${fence}`]
          .filter(Boolean)
          .join('\n\n');
      });

      return [
        meta.parameters?.docs?.description?.component || page.data.description,
        meta.parameters?.docs?.hideArgsTable ? undefined : children,
        '## Examples',
        ...examples,
      ]
        .filter(Boolean)
        .join('\n\n');
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SectionOverview({ attributes }) {
      return getOverviewLinks(createDocsTree(source.pageTree), page.url, source.getPages(), 'catalog' in attributes)
        .map(link => `- [${link.name}](${link.external ? link.url : markdownUrl(link.url)})`)
        .join('\n');
    },
  });

  if (body.includes('\0')) {
    throw new Error(`Unresolved Markdown placeholder in ${page.url}`);
  }

  return [`# ${page.data.title}`, components.length === 0 ? page.data.description : undefined, body.trim()]
    .filter(Boolean)
    .join('\n\n');
}
