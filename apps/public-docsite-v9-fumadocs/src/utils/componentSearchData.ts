import { structure } from 'fumadocs-core/mdx-plugins/remark-structure';
import type { StructuredData } from 'fumadocs-core/mdx-plugins/remark-structure';
import { toKebabCase } from './toKebabCase';

/** Imported description headings have runtime IDs; link their prose to the page or owning example. */
export function componentSearchData(markdown: string, exampleNames: string[]): StructuredData {
  const data = structure(markdown);
  const examples = new Set(exampleNames);
  const anchors = new Map<string, string | undefined>();
  const headings: StructuredData['headings'] = [];
  let owner: string | undefined;
  for (const heading of data.headings) {
    if (examples.has(heading.content)) {
      owner = toKebabCase(heading.content);
      headings.push({ ...heading, id: owner });
    } else if (heading.content === 'Props') {
      owner = 'api';
      if (!headings.some(item => item.id === owner)) {
        headings.push({ id: owner, content: 'API' });
      }
    } else if (heading.content === 'Examples') {
      owner = undefined;
    }
    anchors.set(heading.id, owner);
  }
  return {
    headings,
    contents: [
      ...data.headings.map(heading => ({ heading: anchors.get(heading.id), content: heading.content })),
      ...data.contents.map(content => ({
        ...content,
        heading: content.heading ? anchors.get(content.heading) : undefined,
      })),
    ],
  };
}
