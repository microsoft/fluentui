/** @jest-environment node */

import * as fs from 'fs';
import * as path from 'path';
import { sync as globSync } from 'glob';
import { getPackageStoriesGlob } from '@fluentui/scripts-storybook';
import { toId } from 'storybook/internal/csf';
import * as ts from 'typescript';

interface InventoryRow {
  cells: string[];
  guideLinks: string[];
  lineNumber: number;
  raw: string;
}

interface InventoryTable {
  headerCells: string[];
  rows: InventoryRow[];
}

interface MissingBacklinkIssue {
  docsId: string;
  filePath?: string;
  issue?: string;
}

interface DiscoveredDocs {
  allDocsIds: Set<string>;
  mdxDocsIds: Set<string>;
  mdxFilesByDocsId: Map<string, string[]>;
}

const repoRoot = path.resolve(__dirname, '../../../../../..');
const appDefinitionPath = path.join(repoRoot, 'apps/public-docsite-resources/src/AppDefinition.tsx');
const componentMappingPath = path.join(repoRoot, 'apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx');
const fromV8ComponentsDirectory = path.join(
  repoRoot,
  'apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components',
);
const storybookDirectory = path.join(repoRoot, 'apps/public-docsite-v9/.storybook');
const componentMappingDocsPath = '/docs/concepts-migration-from-v8-component-mapping--docs';
const plannedComboboxAnchor = `${componentMappingDocsPath}#combobox-migration`;
const fallbackExistingP0GuideDocsIds = [
  toId('Concepts/Migration/from v8/Components/TextField to Input Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Textarea Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Menu Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/ChoiceGroup to RadioGroup Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/SpinButton Migration', 'docs'),
];

let canonicalExampleKeysCache: string[] | undefined;
let componentGuideFilesCache: string[] | undefined;
let configuredDocsCache: DiscoveredDocs | undefined;
let inventoryTableCache: InventoryTable | undefined;

function readUtf8(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

function relativeToRepo(filePath: string): string {
  return path.relative(repoRoot, filePath);
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return undefined;
}

function getPropertyAssignment(
  objectLiteral: ts.ObjectLiteralExpression,
  propertyName: string,
): ts.PropertyAssignment | undefined {
  return objectLiteral.properties.find(
    property =>
      ts.isPropertyAssignment(property) && property.name !== undefined && getPropertyName(property.name) === propertyName,
  ) as ts.PropertyAssignment | undefined;
}

function getStringLiteralValue(expression: ts.Expression): string | undefined {
  return ts.isStringLiteralLike(expression) ? expression.text : undefined;
}

function getRequiredObjectLiteralProperty(objectLiteral: ts.ObjectLiteralExpression, propertyName: string): ts.Expression {
  const property = getPropertyAssignment(objectLiteral, propertyName);

  if (!property) {
    throw new Error(`Could not find property "${propertyName}" in ${objectLiteral.getText().slice(0, 80)}...`);
  }

  return property.initializer;
}

function parseTypeScriptSource(filePath: string): ts.SourceFile {
  return ts.createSourceFile(filePath, readUtf8(filePath), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function getAppDefinitionObjectLiteral(): ts.ObjectLiteralExpression {
  const sourceFile = parseTypeScriptSource(appDefinitionPath);
  let appDefinitionObjectLiteral: ts.ObjectLiteralExpression | undefined;

  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'AppDefinition' &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      appDefinitionObjectLiteral = node.initializer;
      return;
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (!appDefinitionObjectLiteral) {
    throw new Error(`Could not locate the AppDefinition object literal in ${relativeToRepo(appDefinitionPath)}.`);
  }

  return appDefinitionObjectLiteral;
}

function getCanonicalExampleKeys(): string[] {
  if (canonicalExampleKeysCache) {
    return canonicalExampleKeysCache;
  }

  const appDefinitionObjectLiteral = getAppDefinitionObjectLiteral();
  const examplePagesInitializer = getRequiredObjectLiteralProperty(appDefinitionObjectLiteral, 'examplePages');

  if (!ts.isArrayLiteralExpression(examplePagesInitializer)) {
    throw new Error(`Expected examplePages to be an array in ${relativeToRepo(appDefinitionPath)}.`);
  }

  const keys = examplePagesInitializer.elements.flatMap(element => {
    if (!ts.isObjectLiteralExpression(element)) {
      return [];
    }

    const linksInitializer = getPropertyAssignment(element, 'links')?.initializer;

    if (!linksInitializer || !ts.isArrayLiteralExpression(linksInitializer)) {
      return [];
    }

    return linksInitializer.elements.flatMap(linkElement => {
      if (!ts.isObjectLiteralExpression(linkElement)) {
        return [];
      }

      const componentProperty = getPropertyAssignment(linkElement, 'component');
      const keyProperty = getPropertyAssignment(linkElement, 'key');
      const urlProperty = getPropertyAssignment(linkElement, 'url');

      if (!componentProperty || !keyProperty || !urlProperty) {
        return [];
      }

      const key = getStringLiteralValue(keyProperty.initializer);
      const url = getStringLiteralValue(urlProperty.initializer);

      if (!key || !url || !/^#\/examples\/[^/]+$/.test(url)) {
        return [];
      }

      return [key];
    });
  });

  canonicalExampleKeysCache = [...keys].sort((left, right) => left.localeCompare(right));

  return canonicalExampleKeysCache;
}

function extractMdxMetaTitles(source: string): string[] {
  return [...source.matchAll(/<Meta\s+title=(?:"([^"]+)"|'([^']+)')\s*\/>/g)].map(match => match[1] ?? match[2]);
}

function parseTableCells(raw: string): string[] {
  return raw
    .split('|')
    .slice(1, -1)
    .map(cell => cell.trim());
}

function normalizeInventoryCell(cell: string | undefined): string {
  return cell?.replace(/^`|`$/g, '').trim().toLowerCase() ?? '';
}

function getComponentGuideFiles(): string[] {
  if (componentGuideFilesCache) {
    return componentGuideFilesCache;
  }

  componentGuideFilesCache = globSync(path.join(fromV8ComponentsDirectory, '**/*.mdx'), { nodir: true })
    .map(filePath => path.resolve(filePath))
    .sort((left, right) => left.localeCompare(right));

  return componentGuideFilesCache;
}

function extractMarkdownLinks(source: string): string[] {
  return [...source.matchAll(/\]\(([^)\s]+)\)/g)].map(match => match[1]);
}

function isInventoryGuideLink(url: string): boolean {
  return /^\/docs\/concepts-migration-from-v8-components-[^#?]+--docs(?:#.*)?$/.test(url);
}

function getInventoryTable(): InventoryTable {
  if (inventoryTableCache) {
    return inventoryTableCache;
  }

  const source = readUtf8(componentMappingPath);
  const lines = source.split(/\r?\n/);
  const inventorySectionIndex = lines.findIndex(line =>
    /^#+\s+Component (?:Mapping|Migration Inventory)\s*$/i.test(line.trim()),
  );
  const tableHeaderLineIndex = lines.findIndex(
    (line, lineIndex) => lineIndex > inventorySectionIndex && line.trim().startsWith('|'),
  );

  if (tableHeaderLineIndex === -1) {
    throw new Error(`Could not find the inventory table in ${relativeToRepo(componentMappingPath)}.`);
  }

  const headerCells = parseTableCells(lines[tableHeaderLineIndex]);
  const rows: InventoryRow[] = [];

  for (let lineIndex = tableHeaderLineIndex + 2; lineIndex < lines.length; lineIndex++) {
    const raw = lines[lineIndex];

    if (!raw.trim().startsWith('|')) {
      break;
    }

    const cells = parseTableCells(raw);

    rows.push({
      cells,
      guideLinks: extractMarkdownLinks(raw).filter(isInventoryGuideLink),
      lineNumber: lineIndex + 1,
      raw,
    });
  }

  inventoryTableCache = { headerCells, rows };

  return inventoryTableCache;
}

function getInventoryRows(): InventoryRow[] {
  return getInventoryTable().rows;
}

function getInventoryBacktickedKeys(): string[] {
  return getInventoryRows().flatMap(row => {
    const match = row.cells[0]?.match(/^`(.+)`$/);
    return match ? [match[1]] : [];
  });
}

function getDuplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }

  return [...duplicates].sort((left, right) => left.localeCompare(right));
}

function normalizeConfiguredStoryGlob(pattern: string): string {
  if (path.isAbsolute(pattern)) {
    return pattern;
  }

  if (pattern.startsWith('apps/') || pattern.startsWith('packages/')) {
    return path.join(repoRoot, pattern);
  }

  return path.resolve(storybookDirectory, pattern);
}

function unwrapExpression(expression: ts.Expression): ts.Expression {
  let currentExpression = expression;

  while (
    ts.isParenthesizedExpression(currentExpression) ||
    ts.isAsExpression(currentExpression) ||
    ts.isTypeAssertionExpression(currentExpression) ||
    ts.isSatisfiesExpression(currentExpression)
  ) {
    currentExpression = currentExpression.expression;
  }

  return currentExpression;
}

function getLiteralCsfTitle(filePath: string, source: string): string | undefined {
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const objectLiteralsByIdentifier = new Map<string, ts.ObjectLiteralExpression>();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
        continue;
      }

      const initializer = unwrapExpression(declaration.initializer);

      if (ts.isObjectLiteralExpression(initializer)) {
        objectLiteralsByIdentifier.set(declaration.name.text, initializer);
      }
    }
  }

  let metadataObjectLiteral: ts.ObjectLiteralExpression | undefined;

  for (const statement of sourceFile.statements) {
    if (!ts.isExportAssignment(statement)) {
      continue;
    }

    const expression = unwrapExpression(statement.expression);

    if (ts.isObjectLiteralExpression(expression)) {
      metadataObjectLiteral = expression;
      break;
    }

    if (ts.isIdentifier(expression)) {
      metadataObjectLiteral = objectLiteralsByIdentifier.get(expression.text);
      break;
    }
  }

  if (!metadataObjectLiteral) {
    return undefined;
  }

  const titleProperty = getPropertyAssignment(metadataObjectLiteral, 'title');

  if (!titleProperty) {
    return undefined;
  }

  return getStringLiteralValue(unwrapExpression(titleProperty.initializer));
}

function addFileToDocsIdMap(map: Map<string, string[]>, docsId: string, filePath: string): void {
  const existing = map.get(docsId);

  if (existing) {
    existing.push(filePath);
  } else {
    map.set(docsId, [filePath]);
  }
}

function getConfiguredDocs(): DiscoveredDocs {
  if (configuredDocsCache) {
    return configuredDocsCache;
  }

  const configuredStoryGlobs = [
    'apps/public-docsite-v9/src/**/*.mdx',
    'apps/public-docsite-v9/src/**/index.stories.@(ts|tsx)',
    ...getPackageStoriesGlob({
      packageName: '@fluentui/react-components',
      callerPath: storybookDirectory,
      excludeStoriesInsertionFromPackages: [
        '@fluentui/react-icons-compat',
        '@fluentui/react-tabster',
        '@fluentui/react-utilities',
        '@fluentui/react-alert',
        '@fluentui/react-infobutton',
        '@fluentui/react-virtualizer',
      ],
    }),
    ...getPackageStoriesGlob({
      packageName: '@fluentui/public-docsite-v9',
      callerPath: storybookDirectory,
      excludeStoriesInsertionFromPackages: [
        '@fluentui/react-storybook-addon',
        '@fluentui/react-storybook-addon-export-to-sandbox',
        '@fluentui/theme-designer',
        '@fluentui/react',
        '@fluentui/react-nav',
      ],
    }),
    'packages/react-components/react-nav/stories/src/Nav/index.stories.@(ts|tsx)',
  ];
  const files = [...new Set(configuredStoryGlobs.flatMap(pattern => globSync(normalizeConfiguredStoryGlob(pattern), { nodir: true })))];
  const allDocsIds = new Set<string>();
  const mdxDocsIds = new Set<string>();
  const mdxFilesByDocsId = new Map<string, string[]>();

  for (const filePath of files) {
    const source = readUtf8(filePath);

    if (filePath.endsWith('.mdx')) {
      for (const title of extractMdxMetaTitles(source)) {
        const docsId = toId(title, 'docs');
        allDocsIds.add(docsId);
        mdxDocsIds.add(docsId);
        addFileToDocsIdMap(mdxFilesByDocsId, docsId, filePath);
      }

      continue;
    }

    const title = getLiteralCsfTitle(filePath, source);

    if (!title) {
      continue;
    }

    allDocsIds.add(toId(title, 'docs'));
  }

  configuredDocsCache = {
    allDocsIds,
    mdxDocsIds,
    mdxFilesByDocsId,
  };

  return configuredDocsCache;
}

function getDocsIdFromUrl(url: string): string | undefined {
  const match = url.match(/^\/docs\/([^?#]+)(?:[?#].*)?$/);
  return match?.[1];
}

function getInventoryColumnIndex(columnName: string): number {
  return getInventoryTable().headerCells.findIndex(cell => normalizeInventoryCell(cell) === normalizeInventoryCell(columnName));
}

function getExistingP0GuideDocsIds(): string[] {
  const guidePagesColumnIndex = getInventoryColumnIndex('Guide pages');
  const priorityColumnIndex = getInventoryColumnIndex('Priority');
  const statusColumnIndex = getInventoryColumnIndex('Status');

  if (guidePagesColumnIndex === -1 || priorityColumnIndex === -1 || statusColumnIndex === -1) {
    return fallbackExistingP0GuideDocsIds;
  }

  return getInventoryRows().flatMap(row => {
    if (normalizeInventoryCell(row.cells[priorityColumnIndex]) !== 'p0') {
      return [];
    }

    if (normalizeInventoryCell(row.cells[statusColumnIndex]) === 'missing') {
      return [];
    }

    return row.guideLinks.flatMap(guideLink => {
      const docsId = getDocsIdFromUrl(guideLink);
      return docsId ? [docsId] : [];
    });
  });
}

function getPrematurelyLinkedMissingP0Rows(): Array<Pick<InventoryRow, 'guideLinks' | 'lineNumber' | 'raw'>> {
  const guidePagesColumnIndex = getInventoryColumnIndex('Guide pages');
  const priorityColumnIndex = getInventoryColumnIndex('Priority');
  const statusColumnIndex = getInventoryColumnIndex('Status');

  if (guidePagesColumnIndex === -1 || priorityColumnIndex === -1 || statusColumnIndex === -1) {
    return [];
  }

  return getInventoryRows()
    .filter(
      row =>
        normalizeInventoryCell(row.cells[priorityColumnIndex]) === 'p0' &&
        normalizeInventoryCell(row.cells[statusColumnIndex]) === 'missing' &&
        normalizeInventoryCell(row.cells[guidePagesColumnIndex]).startsWith('planned:') &&
        row.guideLinks.length > 0,
    )
    .map(row => ({
      guideLinks: row.guideLinks,
      lineNumber: row.lineNumber,
      raw: row.raw,
    }));
}

describe('FromV8 migration inventory', () => {
  test('uses canonical v8 example keys from AppDefinition', () => {
    const canonicalExampleKeys = getCanonicalExampleKeys();

    expect(canonicalExampleKeys).toContain('Announced');
    expect(canonicalExampleKeys).not.toContain('Announced - Quick Actions');
  });

  test('inventory table keys are unique and match canonical v8 example keys exactly', () => {
    const inventoryKeys = getInventoryBacktickedKeys();

    expect(getDuplicateValues(inventoryKeys)).toEqual([]);
    expect(inventoryKeys).toEqual(getCanonicalExampleKeys());
  });
});

describe('FromV8 migration guide routes', () => {
  test('every component guide MDX file has exactly one Meta title', () => {
    const invalidFiles = getComponentGuideFiles().flatMap(filePath => {
      const titles = extractMdxMetaTitles(readUtf8(filePath));

      return titles.length === 1 ? [] : [{ filePath: relativeToRepo(filePath), titles }];
    });

    expect(invalidFiles).toEqual([]);
  });

  test('every inventory migration guide link resolves to a discovered MDX docs ID', () => {
    const configuredDocs = getConfiguredDocs();
    const unresolvedGuideLinks = getInventoryRows().flatMap(row =>
      row.guideLinks.flatMap(guideLink => {
        const docsId = getDocsIdFromUrl(guideLink);

        if (docsId && configuredDocs.mdxDocsIds.has(docsId)) {
          return [];
        }

        return [{ docsId, guideLink, lineNumber: row.lineNumber }];
      }),
    );

    expect(unresolvedGuideLinks).toEqual([]);
  });

  test('every existing P0 guide links back to the inventory, and planned rows are not linked yet', () => {
    const configuredDocs = getConfiguredDocs();
    const missingBacklinks = getExistingP0GuideDocsIds().flatMap<MissingBacklinkIssue>(docsId => {
      const filePaths = configuredDocs.mdxFilesByDocsId.get(docsId);

      if (!filePaths?.length) {
        return [{ docsId, issue: 'No MDX file found for existing P0 guide.' }];
      }

      const filesWithoutBacklink = filePaths.filter(filePath => !readUtf8(filePath).includes(`](${componentMappingDocsPath})`));

      return filesWithoutBacklink.map(filePath => ({
        docsId,
        filePath: relativeToRepo(filePath),
      }));
    });
    const prematurelyLinkedPlannedRows = getPrematurelyLinkedMissingP0Rows();

    expect(missingBacklinks).toEqual([]);
    expect(prematurelyLinkedPlannedRows).toEqual([]);
  });

  test('every internal /docs/ link in component guides resolves to a configured docsite docs ID', () => {
    const configuredDocs = getConfiguredDocs();
    const unresolvedLinks = getComponentGuideFiles().flatMap(filePath =>
      extractMarkdownLinks(readUtf8(filePath))
        .filter(url => url.startsWith('/docs/'))
        .flatMap(url => {
          const docsId = getDocsIdFromUrl(url);

          if (docsId && configuredDocs.allDocsIds.has(docsId)) {
            return [];
          }

          return [{ docsId, filePath: relativeToRepo(filePath), url }];
        }),
    );

    expect(unresolvedLinks).toEqual([]);
  });

  test('Dropdown guide links to Dropdown, Select, and the ComboBox migration destination when present', () => {
    const dropdownGuidePath = path.join(fromV8ComponentsDirectory, 'Dropdown.mdx');

    if (!fs.existsSync(dropdownGuidePath)) {
      return;
    }

    const links = new Set(extractMarkdownLinks(readUtf8(dropdownGuidePath)));
    const hasComboboxGuideLink = [...links].some(url =>
      /^\/docs\/concepts-migration-from-v8-components-combobox(?:-[^#?]+)?--docs(?:#.*)?$/.test(url),
    );

    expect(links.has('/docs/components-dropdown--docs')).toBe(true);
    expect(links.has('/docs/components-select--docs')).toBe(true);
    expect(hasComboboxGuideLink || links.has(plannedComboboxAnchor)).toBe(true);
  });
});
