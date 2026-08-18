/* @jest-environment node */

import * as fs from 'fs';
import * as path from 'path';
import { toId } from 'storybook/internal/csf';
import * as ts from 'typescript';
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
const completeGuideMetaTitlePrefix = 'Concepts/Migration/from v8/Components/';
const plannedComboboxAnchor = `${componentMappingDocsPath}#combobox-migration`;
const fallbackExistingP0GuideDocsIds = [
  toId('Concepts/Migration/from v8/Components/TextField to Input Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Textarea Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/Menu Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/ChoiceGroup to RadioGroup Migration', 'docs'),
  toId('Concepts/Migration/from v8/Components/SpinButton Migration', 'docs'),
];
const requiredCompleteGuideSections = [
  'Overview',
  'Component mapping',
  'What changed',
  'Architecture and behavior',
  'Prop mapping',
  'Styling and theming',
  'Accessibility',
  'Examples',
  'Unsupported scenarios and known gaps',
  'Major-change checklist',
  'Evidence',
] as const;

const getGuideImportDeclarations = (source: string): ts.ImportDeclaration[] => {
  const importLines: string[] = [];

  for (const line of source.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('<Meta') || trimmedLine.startsWith('#')) {
      break;
    }

    importLines.push(line);
  }

  const importSourceFile = ts.createSourceFile(
    'migration-guide-imports.ts',
    importLines.join('\n'),
    ts.ScriptTarget.Latest,
    true,
  );

  return importSourceFile.statements.filter(ts.isImportDeclaration);
};

const getImportedNames = (source: string, moduleSpecifierText: string): Set<string> => {
  const importedNames = new Set<string>();

  for (const importDeclaration of getGuideImportDeclarations(source)) {
    if (
      !ts.isStringLiteral(importDeclaration.moduleSpecifier) ||
      importDeclaration.moduleSpecifier.text !== moduleSpecifierText
    ) {
      continue;
    }

    const namedBindings = importDeclaration.importClause?.namedBindings;

    if (!namedBindings || !ts.isNamedImports(namedBindings)) {
      continue;
    }

    for (const importSpecifier of namedBindings.elements) {
      importedNames.add(importSpecifier.name.text);
    }
  }

  return importedNames;
};

const hasExamplesNamespaceImport = (source: string, pageName: string): boolean =>
  getGuideImportDeclarations(source).some(importDeclaration => {
    if (
      !ts.isStringLiteral(importDeclaration.moduleSpecifier) ||
      importDeclaration.moduleSpecifier.text !== `./examples/${pageName}/index.stories`
    ) {
      return false;
    }

    const namedBindings = importDeclaration.importClause?.namedBindings;

    return Boolean(namedBindings && ts.isNamespaceImport(namedBindings) && namedBindings.name.text === 'Examples');
  });

const stripIgnoredGuideContent = (source: string): string => {
  const outputLines: string[] = [];
  let inFence = false;
  let inComment = false;

  for (const line of source.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('```')) {
      inFence = !inFence;
      outputLines.push('');
      continue;
    }

    if (inFence) {
      outputLines.push('');
      continue;
    }

    let remaining = line;
    let visible = '';

    while (remaining.length > 0) {
      if (inComment) {
        const commentEndIndex = remaining.indexOf('-->');

        if (commentEndIndex === -1) {
          remaining = '';
          break;
        }

        remaining = remaining.slice(commentEndIndex + 3);
        inComment = false;
        continue;
      }

      const commentStartIndex = remaining.indexOf('<!--');

      if (commentStartIndex === -1) {
        visible += remaining;
        remaining = '';
        break;
      }

      visible += remaining.slice(0, commentStartIndex);
      remaining = remaining.slice(commentStartIndex + 4);
      inComment = true;
    }

    outputLines.push(visible);
  }

  return outputLines.join('\n');
};

const getGuideSections = (source: string): Map<string, string> => {
  const sections = new Map<string, string>();
  const lines = source.split(/\r?\n/);
  let currentSectionName: string | undefined;
  let currentSectionLines: string[] = [];

  const flushSection = () => {
    if (currentSectionName) {
      sections.set(currentSectionName, currentSectionLines.join('\n').trim());
    }
  };

  for (const line of lines) {
    const headingMatch = line.trim().match(/^##\s+(.+?)\s*$/);

    if (headingMatch) {
      flushSection();
      currentSectionName = headingMatch[1];
      currentSectionLines = [];
      continue;
    }

    if (currentSectionName) {
      currentSectionLines.push(line);
    }
  }

  flushSection();

  return sections;
};

const parseTableCells = (raw: string): string[] =>
  raw
    .split('|')
    .slice(1, -1)
    .map(cell => cell.trim());

const normalizeInventoryCell = (cell: string | undefined): string =>
  cell?.replace(/^`|`$/g, '').trim().toLowerCase() ?? '';

const hasExampleCoverage = (source: string, storyExportName: 'V8Basic' | 'V9Basic'): boolean => {
  const normalizedSource = source.replace(/\s+/g, ' ');

  return (
    normalizedSource.includes(`<Canvas of={Examples.${storyExportName}}`) &&
    normalizedSource.includes(`<Source of={Examples.${storyExportName}}`)
  );
};

const validateCompleteGuide = (source: string, pageName: string): string[] => {
  const errors: string[] = [];
  const strippedSource = stripIgnoredGuideContent(source);
  const metaTitles = extractMdxMetaTitles(strippedSource);
  const matchingMetaTitle = metaTitles.find(title => title.startsWith(completeGuideMetaTitlePrefix));

  if (!matchingMetaTitle) {
    errors.push(`${pageName}: missing Meta title with prefix "${completeGuideMetaTitlePrefix}".`);
  }

  const sections = getGuideSections(strippedSource);

  for (const requiredSection of requiredCompleteGuideSections) {
    const content = sections.get(requiredSection);

    if (!content) {
      errors.push(`${pageName}: missing required section "${requiredSection}".`);
    }
  }

  for (const [sectionName, content] of sections) {
    if (!requiredCompleteGuideSections.includes(sectionName as (typeof requiredCompleteGuideSections)[number])) {
      continue;
    }

    if (content.trim() === '') {
      errors.push(`${pageName}: section "${sectionName}" must contain content or the literal "Not applicable".`);
    }
  }

  const storybookDocsImports = getImportedNames(source, '@storybook/addon-docs/blocks');
  if (!storybookDocsImports.has('Canvas') || !storybookDocsImports.has('Source')) {
    errors.push(`${pageName}: missing Canvas and Source import from "@storybook/addon-docs/blocks".`);
  }

  if (!hasExamplesNamespaceImport(source, pageName)) {
    errors.push(
      `${pageName}: missing shared story import "import * as Examples from './examples/${pageName}/index.stories';".`,
    );
  }

  if (!hasExampleCoverage(strippedSource, 'V8Basic') || !hasExampleCoverage(strippedSource, 'V9Basic')) {
    errors.push(`${pageName}: missing Canvas/Source coverage for Examples.V8Basic and Examples.V9Basic.`);
  }

  const checklistContent = sections.get('Major-change checklist') ?? '';
  const examplesContent = sections.get('Examples') ?? '';
  const unsupportedContent = sections.get('Unsupported scenarios and known gaps') ?? '';
  const majorChangeIds = [...new Set(checklistContent.match(/\bMC-\d+\b/g) ?? [])];
  const exampleHeadingIds = new Set(
    examplesContent
      .split(/\r?\n/)
      .flatMap(line => (line.trim().startsWith('### ') ? line.match(/\bMC-\d+\b/g) ?? [] : [])),
  );
  const unsupportedParagraphIds = new Set(
    unsupportedContent.split(/\r?\n/).flatMap(line => {
      const trimmedLine = line.trim();

      if (
        trimmedLine === '' ||
        trimmedLine.startsWith('#') ||
        trimmedLine.startsWith('|') ||
        trimmedLine.startsWith('-') ||
        trimmedLine.startsWith('*') ||
        trimmedLine.startsWith('>') ||
        trimmedLine === 'Not applicable'
      ) {
        return [];
      }

      return trimmedLine.match(/\bMC-\d+\b/g) ?? [];
    }),
  );

  for (const majorChangeId of majorChangeIds) {
    if (!exampleHeadingIds.has(majorChangeId) && !unsupportedParagraphIds.has(majorChangeId)) {
      errors.push(
        `${pageName}: major-change ID "${majorChangeId}" must appear in an example heading or unsupported-scenario paragraph.`,
      );
    }
  }

  const evidenceContent = sections.get('Evidence') ?? '';
  const evidenceTableLines = evidenceContent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('|'));

  if (evidenceTableLines.length === 0) {
    errors.push(`${pageName}: missing Evidence table with columns "ID | Source | Date | Conclusion".`);
  } else {
    const evidenceHeaderCells = parseTableCells(evidenceTableLines[0]);

    if (evidenceHeaderCells.join(' | ') !== 'ID | Source | Date | Conclusion') {
      errors.push(`${pageName}: Evidence table must use columns "ID | Source | Date | Conclusion".`);
    } else {
      const evidenceSeparatorLine = evidenceTableLines[1];
      const hasSeparatorLine =
        evidenceSeparatorLine !== undefined &&
        parseTableCells(evidenceSeparatorLine).every(cell => /^:?-{2,}:?$/.test(cell));
      if (!hasSeparatorLine) {
        errors.push(`${pageName}: Evidence table must include a markdown separator row.`);
      }
      const evidenceRows = evidenceTableLines
        .slice(hasSeparatorLine ? 2 : 1)
        .map(parseTableCells)
        .filter(rowCells => rowCells.some(cell => cell !== ''));
      const evidenceRowIds = evidenceRows.map(rowCells => rowCells[0]).filter(Boolean);

      for (const evidenceRow of evidenceRows) {
        if (evidenceRow.length !== 4) {
          errors.push(`${pageName}: Evidence row "${evidenceRow[0] || 'unknown'}" must contain exactly four cells.`);
        }

        const [evidenceId = '', sourceCell = '', dateCell = '', conclusionCell = ''] = evidenceRow;

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateCell)) {
          errors.push(`${pageName}: Evidence row "${evidenceId || 'unknown'}" must use an ISO YYYY-MM-DD date.`);
        }

        if (sourceCell.trim() === '' || conclusionCell.trim() === '') {
          errors.push(
            `${pageName}: Evidence row "${evidenceId || 'unknown'}" must have non-empty Source and Conclusion cells.`,
          );
        }
      }

      if (
        evidenceRows.length !== majorChangeIds.length ||
        evidenceRowIds.length !== majorChangeIds.length ||
        majorChangeIds.some(majorChangeId => !evidenceRowIds.includes(majorChangeId))
      ) {
        errors.push(`${pageName}: Evidence rows must cover every major-change checklist ID exactly once.`);
      }
    }
  }

  if (!extractMarkdownLinks(strippedSource).includes(componentMappingDocsPath)) {
    errors.push(`${pageName}: missing backlink to ${componentMappingDocsPath}.`);
  }

  return errors;
};

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

describe('complete migration guide contract', () => {
  test('rejects an invalid inline guide fixture', () => {
    const invalidGuide = `
import { Meta, Canvas, Source } from '@storybook/addon-docs/blocks';

# Input Migration

## Overview
Guide summary.

## Component mapping
Not applicable

## What changed
Changed behavior.

## Architecture and behavior
Behavior details.

## Prop mapping
Prop details.

## Accessibility
Accessibility notes.

## Examples
### MC-1 Example gap
Placeholder example notes.

## Unsupported scenarios and known gaps
Not applicable

## Major-change checklist
- [ ] MC-1 Wrap input in Field.

## Evidence
Placeholder evidence.
`;

    expect(validateCompleteGuide(invalidGuide, 'Input')).toEqual([
      'Input: missing Meta title with prefix "Concepts/Migration/from v8/Components/".',
      'Input: missing required section "Styling and theming".',
      'Input: missing shared story import "import * as Examples from \'./examples/Input/index.stories\';".',
      'Input: missing Canvas/Source coverage for Examples.V8Basic and Examples.V9Basic.',
      'Input: missing Evidence table with columns "ID | Source | Date | Conclusion".',
      'Input: missing backlink to /docs/concepts-migration-from-v8-component-mapping--docs.',
    ]);
  });

  test('accepts a complete inline guide fixture', () => {
    const validGuide = `
import { Meta, Canvas, Source } from '@storybook/addon-docs/blocks';
import * as Examples from './examples/Input/index.stories';

<Meta title="Concepts/Migration/from v8/Components/Input Migration" />

# Input Migration

See the [v8 component migration inventory](/docs/concepts-migration-from-v8-component-mapping--docs).

## Overview
Input replaces single-line TextField scenarios.

## Component mapping
TextField maps to Input for single-line content.

## What changed
Validation messaging moves into Field composition.

## Architecture and behavior
Field owns labels, messages, and validation layout around Input.

## Prop mapping
Map label and validation props onto Field and native input props onto Input.

## Styling and theming
Use Fluent v9 tokens through Input and Field slots.

## Accessibility
Field provides the accessible label and description wiring.

## Examples
### MC-1 Single-line field parity
<Canvas of={Examples.V8Basic} />
<Source of={Examples.V8Basic} />
<Canvas of={Examples.V9Basic} />
<Source of={Examples.V9Basic} />

## Unsupported scenarios and known gaps
Not applicable

## Major-change checklist
- [ ] MC-1 Wrap Input with Field to restore label, validation, and hint content.

## Evidence
| ID | Source | Date | Conclusion |
| -- | ------ | ---- | ---------- |
| MC-1 | packages/react/src/components/TextField/TextField.types.ts | 2026-08-17 | Field restores the label and validation affordances that v9 Input omits. |
`;

    expect(validateCompleteGuide(validGuide, 'Input')).toEqual([]);
  });

  test('ignores code fences and comments when checking sections and example coverage', () => {
    const guideWithIgnoredBlocks = `
import { Meta, Canvas, Source } from '@storybook/addon-docs/blocks';
import * as Examples from './examples/Input/index.stories';

<Meta title="Concepts/Migration/from v8/Components/Input Migration" />

# Input Migration

See the [v8 component migration inventory](/docs/concepts-migration-from-v8-component-mapping--docs).

## Overview
Input replaces single-line TextField scenarios.

## Component mapping
TextField maps to Input for single-line content.

## What changed
Validation messaging moves into Field composition.

## Architecture and behavior
Field owns labels, messages, and validation layout around Input.

## Prop mapping
Map label and validation props onto Field and native input props onto Input.

\`\`\`mdx
## Styling and theming
Use Fluent v9 tokens through Input and Field slots.
\`\`\`

## Accessibility
Field provides the accessible label and description wiring.

## Examples
### MC-1 Single-line field parity
<!--
<Canvas of={Examples.V8Basic} />
<Source of={Examples.V8Basic} />
<Canvas of={Examples.V9Basic} />
<Source of={Examples.V9Basic} />
-->

## Unsupported scenarios and known gaps
Not applicable

## Major-change checklist
- [ ] MC-1 Wrap Input with Field to restore label, validation, and hint content.

## Evidence
| ID | Source | Date | Conclusion |
| -- | ------ | ---- | ---------- |
| MC-1 | packages/react/src/components/TextField/TextField.types.ts | 2026-08-17 | Field restores the label and validation affordances that v9 Input omits. |
`;

    expect(validateCompleteGuide(guideWithIgnoredBlocks, 'Input')).toEqual([
      'Input: missing required section "Styling and theming".',
      'Input: missing Canvas/Source coverage for Examples.V8Basic and Examples.V9Basic.',
    ]);
  });

  test('requires the Examples namespace import and exact unsupported major-change IDs', () => {
    const guideWithLooseImportAndIdMatch = `
import { Meta, Canvas, Source } from '@storybook/addon-docs/blocks';
import './examples/Input/index.stories';

<Meta title="Concepts/Migration/from v8/Components/Input Migration" />

# Input Migration

See the [v8 component migration inventory](/docs/concepts-migration-from-v8-component-mapping--docs).

## Overview
Input replaces single-line TextField scenarios.

## Component mapping
TextField maps to Input for single-line content.

## What changed
Validation messaging moves into Field composition.

## Architecture and behavior
Field owns labels, messages, and validation layout around Input.

## Prop mapping
Map label and validation props onto Field and native input props onto Input.

## Styling and theming
Use Fluent v9 tokens through Input and Field slots.

## Accessibility
Field provides the accessible label and description wiring.

## Examples
### V8 basic
<Canvas of={Examples.V8Basic} />
<Source of={Examples.V8Basic} />
### V9 basic
<Canvas of={Examples.V9Basic} />
<Source of={Examples.V9Basic} />

## Unsupported scenarios and known gaps
MC-10 remains unsupported for preview-only variants.

## Major-change checklist
- [ ] MC-1 Wrap Input with Field to restore label, validation, and hint content.

## Evidence
| ID | Source | Date | Conclusion |
| -- | ------ | ---- | ---------- |
| MC-1 | packages/react/src/components/TextField/TextField.types.ts | 2026-08-17 | Field restores the label and validation affordances that v9 Input omits. |
`;

    expect(validateCompleteGuide(guideWithLooseImportAndIdMatch, 'Input')).toEqual([
      'Input: missing shared story import "import * as Examples from \'./examples/Input/index.stories\';".',
      'Input: major-change ID "MC-1" must appear in an example heading or unsupported-scenario paragraph.',
    ]);
  });

  test('requires a separator row and exactly four cells in each evidence row', () => {
    const guideWithInvalidEvidenceTable = `
import { Meta, Canvas, Source } from '@storybook/addon-docs/blocks';
import * as Examples from './examples/Input/index.stories';

<Meta title="Concepts/Migration/from v8/Components/Input Migration" />

# Input Migration

See the [v8 component migration inventory](/docs/concepts-migration-from-v8-component-mapping--docs).

## Overview
Input replaces single-line TextField scenarios.

## Component mapping
TextField maps to Input for single-line content.

## What changed
Validation messaging moves into Field composition.

## Architecture and behavior
Field owns labels, messages, and validation layout around Input.

## Prop mapping
Map label and validation props onto Field and native input props onto Input.

## Styling and theming
Use Fluent v9 tokens through Input and Field slots.

## Accessibility
Field provides the accessible label and description wiring.

## Examples
### MC-1 Single-line field parity
<Canvas of={Examples.V8Basic} />
<Source of={Examples.V8Basic} />
<Canvas of={Examples.V9Basic} />
<Source of={Examples.V9Basic} />

## Unsupported scenarios and known gaps
Not applicable

## Major-change checklist
- [ ] MC-1 Wrap Input with Field to restore label, validation, and hint content.

## Evidence
| ID | Source | Date | Conclusion |
| MC-1 | packages/react/src/components/TextField/TextField.types.ts | 2026-08-17 | Field restores the label and validation affordances that v9 Input omits. |
| MC-2 | packages/react/src/components/TextField/TextField.types.ts | 2026-08-17 | Extra evidence cell | unexpected |
`;

    expect(validateCompleteGuide(guideWithInvalidEvidenceTable, 'Input')).toEqual([
      'Input: Evidence table must include a markdown separator row.',
      'Input: Evidence row "MC-2" must contain exactly four cells.',
      'Input: Evidence rows must cover every major-change checklist ID exactly once.',
    ]);
  });

  test('enforces the contract only for complete P0 guides', () => {
    const configuredDocs = getConfiguredDocs();
    const contractIssues = getInventoryRows().flatMap(row => {
      if (normalizeInventoryCell(row.cells[3]) !== 'complete' || normalizeInventoryCell(row.cells[5]) !== 'p0') {
        return [];
      }

      return row.guideLinks.flatMap(guideLink => {
        const docsId = getDocsIdFromUrl(guideLink);

        if (!docsId) {
          return [];
        }

        return (configuredDocs.mdxFilesByDocsId.get(docsId) ?? []).flatMap(filePath =>
          validateCompleteGuide(readUtf8(filePath), path.basename(filePath, '.mdx')),
        );
      });
    });

    expect(contractIssues).toEqual([]);
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
