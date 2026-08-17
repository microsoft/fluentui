/* @jest-environment node */

import * as fs from 'fs';
import * as path from 'path';
import { toId } from 'storybook/internal/csf';
import {
  extractMarkdownLinks,
  extractMdxMetaTitles,
  getCanonicalExampleKeys,
  getComponentGuideFiles,
  getConfiguredCsfDocsIdCandidates,
  getConfiguredDocs,
  getDuplicateValues,
  getDocsIdFromUrl,
  getExistingP0GuideDocsIds,
  getExistingP0GuideFiles,
  getInventoryBacktickedKeys,
  getInventoryRows,
  getLinkedMissingP0Rows,
  getPrematurelyLinkedMissingP0Rows,
  getUnresolvedInternalDocsLinkIssues,
  readUtf8,
  relativeToRepo,
  type DiscoveredDocs,
  type InventoryRow,
  type MissingBacklinkIssue,
  type PackageStoryPathInfo,
  type UnresolvedInternalDocsLinkIssue,
} from './migrationGuideTestUtils';

const repoRoot = path.resolve(__dirname, '../../../../../..');
const fromV8ComponentsDirectory = path.join(__dirname, 'Components');
const componentMappingDocsPath = '/docs/concepts-migration-from-v8-component-mapping--docs';
const plannedComboboxAnchor = `${componentMappingDocsPath}#combobox-migration`;
const fallbackExistingP0GuideDocsIds = [
  toId('Concepts/Migration/from v8/Components/TextField to Input Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Textarea Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Menu Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/ChoiceGroup to RadioGroup Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/SpinButton Migration', 'docs'),
];

describe('migration guide route helpers', () => {
  test('infers unresolved configured CSF docs IDs from resolved siblings before falling back to generic prefixes', () => {
    const packageStoryPathInfo: PackageStoryPathInfo = {
      packageDirectory: 'react-headless-components-preview',
      packageName: 'headless-components-preview',
      storySlug: 'button',
    };

    expect(
      getConfiguredCsfDocsIdCandidates(
        packageStoryPathInfo,
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
    const rows: InventoryRow[] = [
      {
        cells: [
          'Button',
          '[Button migration](/docs/concepts-migration-from-v8-components-button--docs)',
          'P0',
          'missing',
        ],
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
    ];

    expect(getLinkedMissingP0Rows(rows, 2, 3)).toEqual([
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

  test('inventory does not contain temporary audit placeholders', () => {
    const placeholderRows = getInventoryRows().flatMap(row =>
      row.cells.some(cell => cell.includes('Inventory audit pending'))
        ? [{ lineNumber: row.lineNumber, raw: row.raw }]
        : [],
    );

    expect(placeholderRows).toEqual([]);
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
    const missingBacklinks = getExistingP0GuideDocsIds(fallbackExistingP0GuideDocsIds).flatMap<MissingBacklinkIssue>(
      docsId => {
        const filePaths = configuredDocs.mdxFilesByDocsId.get(docsId);

        if (!filePaths?.length) {
          return [{ docsId, issue: 'No MDX file found for existing P0 guide.' }];
        }

        const filesWithoutBacklink = filePaths.filter(
          filePath => !readUtf8(filePath).includes(`](${componentMappingDocsPath})`),
        );

        return filesWithoutBacklink.map(filePath => ({
          docsId,
          filePath: relativeToRepo(filePath),
        }));
      },
    );
    const prematurelyLinkedPlannedRows = getPrematurelyLinkedMissingP0Rows();

    expect(missingBacklinks).toEqual([]);
    expect(prematurelyLinkedPlannedRows).toEqual([]);
  });

  test('every internal /docs/ link in component guides resolves to a configured docsite docs ID', () => {
    const configuredDocs = getConfiguredDocs();
    const existingP0GuideFiles = getExistingP0GuideFiles(configuredDocs, fallbackExistingP0GuideDocsIds);
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
