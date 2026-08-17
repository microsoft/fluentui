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

interface UnresolvedInternalDocsLinkIssue {
  docsId?: string;
  filePath: string;
  issue?: string;
  sourcePath?: string;
  url: string;
}

interface PackageStoryPathInfo {
  packageDirectory: string;
  packageName: string;
  storySlug: string;
}

interface DiscoveredDocs {
  allDocsIds: Set<string>;
  mdxDocsIds: Set<string>;
  mdxFilesByDocsId: Map<string, string[]>;
  unresolvedCsfFilesByDocsId: Map<string, string[]>;
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

function getResolvableStringLiteralValue(
  expression: ts.Expression,
  variableInitializers: Map<string, ts.Expression>,
  visitedIdentifiers = new Set<string>(),
): string | undefined {
  const unwrappedExpression = unwrapExpression(expression);
  const literalValue = getStringLiteralValue(unwrappedExpression);

  if (literalValue !== undefined) {
    return literalValue;
  }

  if (ts.isIdentifier(unwrappedExpression)) {
    if (visitedIdentifiers.has(unwrappedExpression.text)) {
      return undefined;
    }

    const initializer = variableInitializers.get(unwrappedExpression.text);

    if (!initializer) {
      return undefined;
    }

    const nextVisitedIdentifiers = new Set(visitedIdentifiers);
    nextVisitedIdentifiers.add(unwrappedExpression.text);

    return getResolvableStringLiteralValue(initializer, variableInitializers, nextVisitedIdentifiers);
  }

  if (ts.isBinaryExpression(unwrappedExpression) && unwrappedExpression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = getResolvableStringLiteralValue(unwrappedExpression.left, variableInitializers, visitedIdentifiers);
    const right = getResolvableStringLiteralValue(unwrappedExpression.right, variableInitializers, visitedIdentifiers);

    return left !== undefined && right !== undefined ? `${left}${right}` : undefined;
  }

  return undefined;
}

function getDocsSlug(value: string): string {
  return toId(value, 'docs').replace(/--docs$/, '');
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
  const variableInitializers = new Map<string, ts.Expression>();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
        continue;
      }

      const initializer = unwrapExpression(declaration.initializer);

      variableInitializers.set(declaration.name.text, initializer);

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

  return getResolvableStringLiteralValue(titleProperty.initializer, variableInitializers);
}

function addFileToDocsIdMap(map: Map<string, string[]>, docsId: string, filePath: string): void {
  const existing = map.get(docsId);

  if (existing) {
    existing.push(filePath);
  } else {
    map.set(docsId, [filePath]);
  }
}

function getPackageStoryPathInfo(filePath: string): PackageStoryPathInfo | undefined {
  const relativeFilePath = relativeToRepo(filePath).replace(/\\/g, '/');
  const packageStoriesMatch = relativeFilePath.match(
    /^packages\/react-components\/([^/]+)\/stories\/src\/(.+)\/index\.stories\.(?:ts|tsx)$/,
  );

  if (!packageStoriesMatch) {
    return undefined;
  }

  const [, packageDirectory, storySubpath] = packageStoriesMatch;

  return {
    packageDirectory,
    packageName: packageDirectory.replace(/^react-/, ''),
    storySlug: getDocsSlug(storySubpath),
  };
}

function addValueToSetMap(map: Map<string, Set<string>>, key: string, value: string): void {
  const existing = map.get(key);

  if (existing) {
    existing.add(value);
  } else {
    map.set(key, new Set([value]));
  }
}

function incrementCount(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function getConfiguredCsfDocsIdCandidates(
  packageStoryPathInfo: PackageStoryPathInfo,
  packageDocsIdPrefixes: Map<string, Set<string>>,
  packageStoryFileCounts: Map<string, number>,
): string[] {
  const { packageDirectory, packageName, storySlug } = packageStoryPathInfo;
  const candidates = new Set<string>();
  const packageDocsIdPrefixesForPackage = packageDocsIdPrefixes.get(packageDirectory);

  for (const docsIdPrefix of packageDocsIdPrefixesForPackage ?? []) {
    candidates.add(`${docsIdPrefix}${storySlug}--docs`);
  }

  if (!packageDocsIdPrefixesForPackage?.size && packageStoryFileCounts.get(packageDirectory) === 1) {
    const packageNameSlug = getDocsSlug(packageName);
    const fallbackStorySlugs = new Set([storySlug]);

    if (packageNameSlug && packageNameSlug !== storySlug) {
      fallbackStorySlugs.add(`${packageNameSlug}-${storySlug}`);
    }

    for (const docsIdPrefix of ['components-', 'compat-components-', 'preview-components-']) {
      for (const fallbackStorySlug of fallbackStorySlugs) {
        candidates.add(`${docsIdPrefix}${fallbackStorySlug}--docs`);
      }
    }
  }

  return [...candidates].sort((left, right) => left.localeCompare(right));
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
  const packageDocsIdPrefixes = new Map<string, Set<string>>();
  const packageStoryFileCounts = new Map<string, number>();
  const unresolvedCsfFilesByDocsId = new Map<string, string[]>();
  const unresolvedPackageStoryFiles: Array<{ filePath: string; packageStoryPathInfo: PackageStoryPathInfo }> = [];

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

    const packageStoryPathInfo = getPackageStoryPathInfo(filePath);

    if (packageStoryPathInfo) {
      incrementCount(packageStoryFileCounts, packageStoryPathInfo.packageDirectory);
    }

    const title = getLiteralCsfTitle(filePath, source);

    if (!title) {
      if (packageStoryPathInfo) {
        unresolvedPackageStoryFiles.push({ filePath, packageStoryPathInfo });
      }

      continue;
    }

    const docsId = toId(title, 'docs');

    allDocsIds.add(docsId);

    if (packageStoryPathInfo) {
      const docsIdSlug = docsId.replace(/--docs$/, '');

      if (docsIdSlug.endsWith(packageStoryPathInfo.storySlug)) {
        addValueToSetMap(
          packageDocsIdPrefixes,
          packageStoryPathInfo.packageDirectory,
          docsIdSlug.slice(0, docsIdSlug.length - packageStoryPathInfo.storySlug.length),
        );
      }
    }
  }

  for (const { filePath, packageStoryPathInfo } of unresolvedPackageStoryFiles) {
    for (const docsIdCandidate of getConfiguredCsfDocsIdCandidates(
      packageStoryPathInfo,
      packageDocsIdPrefixes,
      packageStoryFileCounts,
    )) {
      addFileToDocsIdMap(unresolvedCsfFilesByDocsId, docsIdCandidate, filePath);
    }
  }

  configuredDocsCache = {
    allDocsIds,
    mdxDocsIds,
    mdxFilesByDocsId,
    unresolvedCsfFilesByDocsId,
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

function getLinkedMissingP0Rows(
  rows: InventoryRow[],
  priorityColumnIndex: number,
  statusColumnIndex: number,
): Array<Pick<InventoryRow, 'guideLinks' | 'lineNumber' | 'raw'>> {
  return rows
    .filter(
      row =>
        normalizeInventoryCell(row.cells[priorityColumnIndex]) === 'p0' &&
        normalizeInventoryCell(row.cells[statusColumnIndex]) === 'missing' &&
        row.guideLinks.length > 0,
    )
    .map(row => ({
      guideLinks: row.guideLinks,
      lineNumber: row.lineNumber,
      raw: row.raw,
    }));
}

function getExistingP0GuideFiles(configuredDocs: DiscoveredDocs): Set<string> {
  return new Set(
    getExistingP0GuideDocsIds().flatMap(docsId => configuredDocs.mdxFilesByDocsId.get(docsId) ?? []),
  );
}

function getUnresolvedInternalDocsLinkIssues(
  filePath: string,
  url: string,
  configuredDocs: DiscoveredDocs,
  existingP0GuideFiles: Set<string>,
): UnresolvedInternalDocsLinkIssue[] {
  const docsId = getDocsIdFromUrl(url);

  if (docsId && existingP0GuideFiles.has(filePath)) {
    const unresolvedSourcePaths = (configuredDocs.unresolvedCsfFilesByDocsId.get(docsId) ?? [])
      .map(sourceFilePath => relativeToRepo(sourceFilePath))
      .sort((left, right) => left.localeCompare(right));

    if (unresolvedSourcePaths.length > 0) {
      return unresolvedSourcePaths.map(sourcePath => ({
        docsId,
        filePath: relativeToRepo(filePath),
        issue: 'Configured CSF title could not be resolved as a literal.',
        sourcePath,
        url,
      }));
    }
  }

  return [{ docsId, filePath: relativeToRepo(filePath), url }];
}

function getPrematurelyLinkedMissingP0Rows(): Array<Pick<InventoryRow, 'guideLinks' | 'lineNumber' | 'raw'>> {
  const guidePagesColumnIndex = getInventoryColumnIndex('Guide pages');
  const priorityColumnIndex = getInventoryColumnIndex('Priority');
  const statusColumnIndex = getInventoryColumnIndex('Status');

  if (guidePagesColumnIndex === -1 || priorityColumnIndex === -1 || statusColumnIndex === -1) {
    return [];
  }

  return getLinkedMissingP0Rows(
    getInventoryRows(),
    priorityColumnIndex,
    statusColumnIndex,
  );
}

describe('migration guide route helpers', () => {
  test('infers unresolved configured CSF docs IDs from resolved siblings before falling back to generic prefixes', () => {
    expect(
      getConfiguredCsfDocsIdCandidates(
        {
          packageDirectory: 'react-headless-components-preview',
          packageName: 'headless-components-preview',
          storySlug: 'button',
        },
        new Map([['react-headless-components-preview', new Set(['components-'])]]),
        new Map([['react-headless-components-preview', 48]]),
      ),
    ).toEqual(['components-button--docs']);

    expect(
      getConfiguredCsfDocsIdCandidates(
        {
          packageDirectory: 'react-nav',
          packageName: 'nav',
          storySlug: 'nav',
        },
        new Map<string, Set<string>>(),
        new Map([['react-nav', 1]]),
      ),
    ).toEqual(['compat-components-nav--docs', 'components-nav--docs', 'preview-components-nav--docs']);
  });

  test('reports matching unresolved configured CSF title sources for internal docs links from existing P0 guides only', () => {
    const p0GuideFilePath = path.join(fromV8ComponentsDirectory, 'Input.mdx');
    const otherGuideFilePath = path.join(fromV8ComponentsDirectory, 'Theme.mdx');
    const unresolvedStoryPath = path.join(
      repoRoot,
      'packages/react-components/react-nav/stories/src/Nav/index.stories.tsx',
    );
    const configuredDocs: DiscoveredDocs = {
      allDocsIds: new Set<string>(),
      mdxDocsIds: new Set<string>(),
      mdxFilesByDocsId: new Map<string, string[]>(),
      unresolvedCsfFilesByDocsId: new Map<string, string[]>([['components-nav--docs', [unresolvedStoryPath]]]),
    };
    const existingP0GuideFiles = new Set([p0GuideFilePath]);

    expect(
      getUnresolvedInternalDocsLinkIssues(
        p0GuideFilePath,
        '/docs/components-nav--docs',
        configuredDocs,
        existingP0GuideFiles,
      ),
    ).toEqual([
      {
        docsId: 'components-nav--docs',
        filePath: 'apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Input.mdx',
        issue: 'Configured CSF title could not be resolved as a literal.',
        sourcePath: 'packages/react-components/react-nav/stories/src/Nav/index.stories.tsx',
        url: '/docs/components-nav--docs',
      },
    ]);

    expect(
      getUnresolvedInternalDocsLinkIssues(
        otherGuideFilePath,
        '/docs/components-nav--docs',
        configuredDocs,
        existingP0GuideFiles,
      ),
    ).toEqual([
      {
        docsId: 'components-nav--docs',
        filePath: 'apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Theme.mdx',
        url: '/docs/components-nav--docs',
      },
    ]);
  });

  test('flags missing P0 inventory rows with markdown guide links regardless of planned text', () => {
    expect(
      getLinkedMissingP0Rows(
        [
          {
            cells: ['Button', '[Button migration](/docs/concepts-migration-from-v8-components-button--docs)', 'P0', 'missing'],
            guideLinks: ['/docs/concepts-migration-from-v8-components-button--docs'],
            lineNumber: 12,
            raw: '| Button | [Button migration](/docs/concepts-migration-from-v8-components-button--docs) | P0 | missing |',
          },
          {
            cells: ['Checkbox', 'Planned: checkbox guide', 'P0', 'missing'],
            guideLinks: [],
            lineNumber: 13,
            raw: '| Checkbox | Planned: checkbox guide | P0 | missing |',
          },
        ],
        2,
        3,
      ),
    ).toEqual([
      {
        guideLinks: ['/docs/concepts-migration-from-v8-components-button--docs'],
        lineNumber: 12,
        raw: '| Button | [Button migration](/docs/concepts-migration-from-v8-components-button--docs) | P0 | missing |',
      },
    ]);
  });
});

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
    const existingP0GuideFiles = getExistingP0GuideFiles(configuredDocs);
    const unresolvedLinks = getComponentGuideFiles().flatMap<UnresolvedInternalDocsLinkIssue>(filePath =>
      extractMarkdownLinks(readUtf8(filePath))
        .filter(url => url.startsWith('/docs/'))
        .flatMap(url => {
          const docsId = getDocsIdFromUrl(url);

          if (docsId && configuredDocs.allDocsIds.has(docsId)) {
            return [];
          }

          return getUnresolvedInternalDocsLinkIssues(filePath, url, configuredDocs, existingP0GuideFiles);
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
