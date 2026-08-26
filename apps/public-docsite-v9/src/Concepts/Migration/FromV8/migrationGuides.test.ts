/* @jest-environment node */

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const componentsDirectory = path.join(__dirname, 'Components');
const componentMappingPath = path.join(__dirname, 'ComponentMapping.mdx');
const storybookPreviewPath = path.join(__dirname, '../../../../.storybook/preview.js');

const guidesWithoutPropMapping = new Set(['Charts.mdx', 'GroupedList.mdx', 'Theme.mdx']);

const addedGuideFiles = [
  'Breadcrumb.mdx',
  'Calendar.mdx',
  'Callout.mdx',
  'CommandBar.mdx',
  'DatePicker.mdx',
  'DetailsList.mdx',
  'Dialog.mdx',
  'Dropdown.mdx',
  'Focus.mdx',
  'Icon.mdx',
  'Link.mdx',
  'List.mdx',
  'MessageBar.mdx',
  'Nav.mdx',
  'Overflow.mdx',
  'Panel.mdx',
  'Persona.mdx',
  'ProgressBar.mdx',
  'Rating.mdx',
  'SearchBox.mdx',
  'Skeleton.mdx',
  'SwatchPicker.mdx',
  'Switch.mdx',
  'TagPicker.mdx',
  'TeachingPopover.mdx',
  'Text.mdx',
  'TimePicker.mdx',
  'Tooltip.mdx',
] as const;

const allGuideFiles = fs
  .readdirSync(componentsDirectory, { recursive: true })
  .filter((fileName): fileName is string => typeof fileName === 'string' && fileName.endsWith('.mdx'));

const readGuide = (fileName: string): string => fs.readFileSync(path.join(componentsDirectory, fileName), 'utf8');

const extractMetaTitles = (source: string): string[] =>
  [...source.matchAll(/<Meta\s+title="([^"]+)"\s*\/>/g)].map(match => match[1]);

const toDocsId = (title: string): string =>
  `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}--docs`;

const extractTsxBlocks = (source: string): string[] =>
  [...source.matchAll(/```tsx\s*\r?\n([\s\S]*?)```/g)].map(match => match[1]);

const extractCodeBlocks = (source: string): string[] => {
  const blocks: string[] = [];
  let currentBlock: string[] | undefined;

  for (const line of source.split(/\r?\n/)) {
    if (currentBlock === undefined) {
      if (/^```[a-z0-9-]*\s*$/i.test(line)) {
        currentBlock = [];
      }
    } else if (/^```\s*$/.test(line)) {
      blocks.push(currentBlock.join('\n'));
      currentBlock = undefined;
    } else {
      currentBlock.push(line);
    }
  }

  return blocks;
};

const stripCodeFences = (source: string): string => source.replace(/```[\s\S]*?```/g, '');

const getTsxSyntaxErrors = (fileName: string, source: string): string[] =>
  (
    ts.transpileModule(source, {
      fileName,
      reportDiagnostics: true,
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    }).diagnostics ?? []
  ).flatMap(diagnostic => {
    if (diagnostic.category !== ts.DiagnosticCategory.Error) {
      return [];
    }

    const location =
      diagnostic.file && diagnostic.start !== undefined
        ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
        : undefined;
    const prefix = location ? `${location.line + 1}:${location.character + 1}: ` : '';

    return [`${prefix}${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`];
  });

describe('v8 migration guide documentation', () => {
  test('new guides have unique Storybook routes and are linked from the component mapping', () => {
    const componentMapping = fs.readFileSync(componentMappingPath, 'utf8');
    const docsIds = addedGuideFiles.map(fileName => {
      const metaTitles = extractMetaTitles(readGuide(fileName));

      expect(metaTitles).toHaveLength(1);

      return toDocsId(metaTitles[0]);
    });

    expect(new Set(docsIds).size).toBe(docsIds.length);

    for (const docsId of docsIds) {
      expect(componentMapping).toContain(`](/docs/${docsId})`);
    }
  });

  test('all component guides have one title, one top-level heading, and unique Storybook routes', () => {
    const docsIds = allGuideFiles.map(fileName => {
      const source = readGuide(fileName);
      const metaTitles = extractMetaTitles(source);
      const topLevelHeadings = stripCodeFences(source).match(/^#\s+.+$/gm) ?? [];

      expect(metaTitles).toHaveLength(1);
      expect(topLevelHeadings).toHaveLength(1);

      return toDocsId(metaTitles[0]);
    });

    expect(new Set(docsIds).size).toBe(docsIds.length);
  });

  test.each(allGuideFiles)('%s uses the component migration guide structure', fileName => {
    const source = stripCodeFences(readGuide(fileName));
    const header = source.match(/^#\s+.+\r?\n\r?\n---\r?\n\r?\n## Overview\r?\n\r?\n([\s\S]*?)(?=\r?\n##\s|$)/m);
    const propMappingHeadings = source.match(/^## Prop Mapping$/gm) ?? [];

    expect(header?.[1].trim().length).toBeGreaterThan(0);
    expect(propMappingHeadings).toHaveLength(guidesWithoutPropMapping.has(fileName) ? 0 : 1);
  });

  test('lists component guides before the component mapping in Storybook', () => {
    const preview = fs.readFileSync(storybookPreviewPath, 'utf8');
    const fromV8Order = preview.match(/'from v8',\s*\[([^\]]+)\]/)?.[1];

    expect(fromV8Order).toBeDefined();
    expect(fromV8Order!.indexOf("'Components'")).toBeLessThan(fromV8Order!.indexOf("'Component Mapping'"));
  });

  test('migration guide links in the component mapping resolve to component MDX pages', () => {
    const componentMapping = fs.readFileSync(componentMappingPath, 'utf8');
    const availableDocsIds = new Set(
      fs
        .readdirSync(componentsDirectory, { recursive: true })
        .filter((fileName): fileName is string => typeof fileName === 'string' && fileName.endsWith('.mdx'))
        .flatMap(fileName => extractMetaTitles(readGuide(fileName)).map(toDocsId)),
    );
    const linkedMigrationDocsIds = [
      ...componentMapping.matchAll(
        /\]\(\/docs\/(concepts-migration-from-v8-components-[a-z0-9-]+--(?:docs|playground))\)/g,
      ),
    ].map(match => match[1]);

    expect(linkedMigrationDocsIds.length).toBeGreaterThan(0);

    for (const docsId of linkedMigrationDocsIds) {
      expect(availableDocsIds).toContain(docsId);
    }
  });

  test.each(addedGuideFiles)('%s uses inline TSX examples', fileName => {
    const source = readGuide(fileName);
    const tsxBlocks = extractTsxBlocks(source);

    expect(source).not.toContain('<Canvas');
    expect(source).not.toContain('<Source');
    expect(source).not.toMatch(/import\s+\*\s+as\s+Examples\b/);
    expect(source).not.toContain('./examples/');
    expect(tsxBlocks.length).toBeGreaterThan(0);
  });

  test.each(allGuideFiles)('%s has no empty fences and uses syntactically valid TSX', fileName => {
    const source = readGuide(fileName);
    const codeBlocks = extractCodeBlocks(source);
    const tsxBlocks = extractTsxBlocks(source);
    const syntaxErrors = tsxBlocks.flatMap((tsxBlock, index) =>
      getTsxSyntaxErrors(`${fileName}-example-${index + 1}.tsx`, tsxBlock),
    );

    expect(codeBlocks.every(codeBlock => codeBlock.trim().length > 0)).toBe(true);
    expect(syntaxErrors).toEqual([]);
  });
});
