/* @jest-environment node */

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const componentsDirectory = path.join(__dirname, 'Components');
const componentMappingPath = path.join(__dirname, 'ComponentMapping.mdx');

const newGuideFiles = [
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
    const docsIds = newGuideFiles.map(fileName => {
      const metaTitles = extractMetaTitles(readGuide(fileName));

      expect(metaTitles).toHaveLength(1);

      return toDocsId(metaTitles[0]);
    });

    expect(new Set(docsIds).size).toBe(docsIds.length);

    for (const docsId of docsIds) {
      expect(componentMapping).toContain(`](/docs/${docsId})`);
    }
  });

  test('migration guide links in the component mapping resolve to component MDX pages', () => {
    const componentMapping = fs.readFileSync(componentMappingPath, 'utf8');
    const availableDocsIds = new Set(
      fs
        .readdirSync(componentsDirectory, { recursive: true })
        .filter(fileName => typeof fileName === 'string' && fileName.endsWith('.mdx'))
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

  test.each(newGuideFiles)('%s uses inline, syntactically valid TSX examples', fileName => {
    const source = readGuide(fileName);
    const tsxBlocks = extractTsxBlocks(source);

    expect(source).not.toContain('<Canvas');
    expect(source).not.toContain('<Source');
    expect(source).not.toMatch(/import\s+\*\s+as\s+Examples\b/);
    expect(source).not.toContain('./examples/');
    expect(tsxBlocks.length).toBeGreaterThan(0);

    const syntaxErrors = tsxBlocks.flatMap((tsxBlock, index) =>
      getTsxSyntaxErrors(`${fileName}-example-${index + 1}.tsx`, tsxBlock),
    );

    expect(syntaxErrors).toEqual([]);
  });
});
