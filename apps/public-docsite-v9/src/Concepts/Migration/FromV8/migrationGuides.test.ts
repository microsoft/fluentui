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
  getInventoryColumnIndex,
  getInventoryRows,
  getLinkedMissingP0Rows,
  getPrematurelyLinkedMissingP0Rows,
  getUnresolvedInternalDocsLinkIssues,
  normalizeInventoryCell,
  parseTableCells,
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

    if (content === undefined) {
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

  test('distinguishes an empty required section from a missing heading', () => {
    const guideWithEmptyOverview = `
## Overview

## Component mapping
Not applicable
`;
    const errors = validateCompleteGuide(guideWithEmptyOverview, 'Input');

    expect(errors).toContain('Input: section "Overview" must contain content or the literal "Not applicable".');
    expect(errors).not.toContain('Input: missing required section "Overview".');
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
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');

    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);

    const contractIssues = getInventoryRows().flatMap(row => {
      if (
        normalizeInventoryCell(row.cells[statusColumnIndex]) !== 'complete' ||
        normalizeInventoryCell(row.cells[priorityColumnIndex]) !== 'p0'
      ) {
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

  test('Task 7 Input guide and shared stories satisfy the TextField migration contract', () => {
    const inputGuidePath = path.join(fromV8ComponentsDirectory, 'Input.mdx');
    const inputExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/Input/index.stories.tsx');
    const inputGuideSource = readUtf8(inputGuidePath);
    const inputPropMapping = getGuideSections(stripIgnoredGuideContent(inputGuideSource)).get('Prop mapping') ?? '';
    const requiredInputProps = [
      'label',
      'description',
      'errorMessage',
      'required',
      'multiline',
      'rows',
      'autoAdjustHeight',
      'canRevealPassword',
      'iconProps',
      'prefix',
      'suffix',
      'onRenderLabel',
      'onChange',
      'componentRef',
      'styles',
      'theme',
      'underlined',
      'borderless',
    ];

    expect(validateCompleteGuide(inputGuideSource, 'Input')).toEqual([]);
    expect(requiredInputProps.filter(propName => !inputPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('satisfies Meta'));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V8PrefixSuffix: Story ='));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V9ContentSlots: Story ='));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V8Controlled: Story ='));
    expect(readUtf8(inputExamplesPath)).toEqual(expect.stringContaining('export const V9Controlled: Story ='));
  });

  test('Task 7 Textarea guide and shared stories satisfy the TextField multiline migration contract', () => {
    const textareaGuidePath = path.join(fromV8ComponentsDirectory, 'Textarea.mdx');
    const textareaExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/Textarea/index.stories.tsx');
    const textareaGuideSource = readUtf8(textareaGuidePath);
    const textareaPropMapping =
      getGuideSections(stripIgnoredGuideContent(textareaGuideSource)).get('Prop mapping') ?? '';
    const requiredTextareaProps = [
      'multiline',
      'rows',
      'resizable',
      'autoAdjustHeight',
      'onChange',
      'onRenderLabel',
      'styles',
      'theme',
    ];

    expect(validateCompleteGuide(textareaGuideSource, 'Textarea')).toEqual([]);
    expect(requiredTextareaProps.filter(propName => !textareaPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('satisfies Meta'));
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('export const V8ResizeAndRows: Story ='));
    expect(readUtf8(textareaExamplesPath)).toEqual(expect.stringContaining('export const V9ResizeAndRows: Story ='));
    expect(readUtf8(textareaExamplesPath)).toEqual(
      expect.stringContaining('export const V8ControlledTextarea: Story ='),
    );
    expect(readUtf8(textareaExamplesPath)).toEqual(
      expect.stringContaining('export const V9ControlledTextarea: Story ='),
    );
  });

  test('Task 8 Menu guide and shared stories satisfy the ContextualMenu migration contract', () => {
    const menuGuidePath = path.join(fromV8ComponentsDirectory, 'Menu.mdx');
    const menuExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/Menu/index.stories.tsx');
    const menuGuideSource = readUtf8(menuGuidePath);
    const strippedMenuGuideSource = stripIgnoredGuideContent(menuGuideSource);
    const normalizedMenuGuideSource = menuGuideSource.replace(/\s+/g, ' ');
    const menuSections = getGuideSections(strippedMenuGuideSource);
    const menuPropMapping = menuSections.get('Prop mapping') ?? '';
    const menuWhatChanged = menuSections.get('What changed') ?? '';
    const requiredMenuProps = [
      'items',
      'hidden',
      'onDismiss',
      'directionalHint',
      'target',
      'calloutProps',
      'onRenderMenuList',
      'onRenderSubMenu',
      'useTargetWidth',
      'useTargetAsMinWidth',
      'shouldUpdateWhenHidden',
      'styles',
      'theme',
      'doNotLayer',
    ];
    const requiredMenuItemProps = [
      'itemType',
      'canCheck',
      'checked',
      'iconProps',
      'onRenderContent',
      'onRender',
      'secondaryText',
      'subMenuProps',
      'sectionProps',
      'split',
      'href',
      'role',
      'style',
      'itemProps',
      'contextualMenuItemWrapperAs',
    ];
    const emptyPropMappingRows = menuPropMapping
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.startsWith('|'))
      .map(parseTableCells)
      .filter(cells => cells[0]?.startsWith('`'))
      .flatMap(cells => {
        const [propName = '', replacement = '', status = '', notes = ''] = cells;

        return replacement !== '' && status !== '' && notes !== '' ? [] : [propName];
      });
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const menuRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'contextualmenu');

    expect(validateCompleteGuide(menuGuideSource, 'Menu')).toEqual([]);
    expect(requiredMenuProps.filter(propName => !menuPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(requiredMenuItemProps.filter(propName => !menuPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(emptyPropMappingRows).toEqual([]);
    expect(normalizedMenuGuideSource).toContain('| MC-1 | `items` arrays become declarative child components |');
    expect(normalizedMenuGuideSource).toContain(
      '| MC-2 | `itemType` and `canCheck` become dedicated item components |',
    );
    expect(normalizedMenuGuideSource).toContain('| MC-3 | visibility and dismissal become controlled `open` state |');
    expect(normalizedMenuGuideSource).toContain(
      '| MC-4 | target and callout positioning move to trigger composition and `positioning` |',
    );
    expect(normalizedMenuGuideSource).toContain('| MC-5 | render callbacks become slots or composed children |');
    expect(menuWhatChanged).toContain('MenuItemRadio');
    expect(menuWhatChanged.toLowerCase()).toContain('new capability');
    expect(menuRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(menuRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(menuRow?.cells[priorityColumnIndex])).toBe('n/a');

    const menuExamplesSource = readUtf8(menuExamplesPath);

    expect(menuExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(menuExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V8ItemTypes: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V9ItemTypes: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V8ControlledVisibility: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V9ControlledOpen: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V8Submenu: Story ='));
    expect(menuExamplesSource).toEqual(expect.stringContaining('export const V9Submenu: Story ='));
  });

  test('Task 9 RadioGroup guide and shared stories satisfy the ChoiceGroup migration contract', () => {
    const radioGroupGuidePath = path.join(fromV8ComponentsDirectory, 'RadioGroup.mdx');
    const radioGroupExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/RadioGroup/index.stories.tsx');
    const radioGroupGuideSource = readUtf8(radioGroupGuidePath);
    const normalizedRadioGroupGuideSource = radioGroupGuideSource.replace(/\s+/g, ' ');
    const radioGroupSections = getGuideSections(stripIgnoredGuideContent(radioGroupGuideSource));
    const radioGroupPropMapping = radioGroupSections.get('Prop mapping') ?? '';
    const requiredGroupProps = [
      'componentRef',
      'options',
      'defaultSelectedKey',
      'selectedKey',
      'onChange',
      'label',
      'theme',
      'styles',
      'ariaLabelledBy',
    ];
    const requiredOptionProps = [
      'key',
      'text',
      'onRenderField',
      'onRenderLabel',
      'iconProps',
      'imageSrc',
      'imageAlt',
      'selectedImageSrc',
      'imageSize',
      'disabled',
      'id',
      'labelId',
      'ariaLabel',
      'styles',
      'itemKey',
      'checked',
      'onChange',
      'onFocus',
      'onBlur',
      'focused',
      'theme',
      'required',
      'name',
    ];
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const choiceGroupRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'choicegroup');

    expect(validateCompleteGuide(radioGroupGuideSource, 'RadioGroup')).toEqual([]);
    expect(requiredGroupProps.filter(propName => !radioGroupPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(requiredOptionProps.filter(propName => !radioGroupPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(normalizedRadioGroupGuideSource).toContain('| MC-1 | `options` data becomes child `Radio` components |');
    expect(normalizedRadioGroupGuideSource).toContain(
      '| MC-2 | `selectedKey` and `defaultSelectedKey` become `value` and `defaultValue` |',
    );
    expect(normalizedRadioGroupGuideSource).toContain('| MC-3 | change callbacks return `data.value` |');
    expect(normalizedRadioGroupGuideSource).toContain(
      '| MC-4 | group labeling and validation compose with `Field` or explicit ARIA labeling |',
    );
    expect(normalizedRadioGroupGuideSource).toContain(
      '| MC-5 | option render callbacks become normal React composition or slot content |',
    );
    expect(choiceGroupRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(choiceGroupRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(choiceGroupRow?.cells[priorityColumnIndex])).toBe('n/a');

    const radioGroupExamplesSource = readUtf8(radioGroupExamplesPath);

    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V8ControlledSelection: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V9ControlledSelection: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V8CustomOptionRender: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V9ComposedRadioLabel: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V8Horizontal: Story ='));
    expect(radioGroupExamplesSource).toEqual(expect.stringContaining('export const V9Horizontal: Story ='));
  });

  test('Task 10 SpinButton guide and shared stories satisfy the SpinButton migration contract', () => {
    const spinButtonGuidePath = path.join(fromV8ComponentsDirectory, 'SpinButton.mdx');
    const spinButtonExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/SpinButton/index.stories.tsx');
    const spinButtonGuideSource = readUtf8(spinButtonGuidePath);
    const normalizedSpinButtonGuideSource = spinButtonGuideSource.replace(/\s+/g, ' ');
    const spinButtonSections = getGuideSections(stripIgnoredGuideContent(spinButtonGuideSource));
    const spinButtonPropMapping = spinButtonSections.get('Prop mapping') ?? '';
    const spinButtonPropMappingRows = spinButtonPropMapping.split(/\r?\n/).filter(line => line.trim().startsWith('|'));
    const spinButtonAccessibility = spinButtonSections.get('Accessibility') ?? '';
    const spinButtonUnsupported = spinButtonSections.get('Unsupported scenarios and known gaps') ?? '';
    const requiredSpinButtonProps = [
      'componentRef',
      'defaultValue',
      'value',
      'min',
      'max',
      'step',
      'precision',
      'onChange',
      'onValidate',
      'onIncrement',
      'onDecrement',
      'label',
      'labelPosition',
      'incrementButtonAriaLabel',
      'decrementButtonAriaLabel',
      'styles',
      'theme',
      'ariaLabel',
      'ariaDescribedBy',
      'ariaValueNow',
      'ariaValueText',
      'iconProps',
    ];
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const spinButtonRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'spinbutton');

    expect(validateCompleteGuide(spinButtonGuideSource, 'SpinButton')).toEqual([]);
    expect(spinButtonPropMappingRows.map(parseTableCells).map(cells => cells.length)).toEqual(
      spinButtonPropMappingRows.map(() => 4),
    );
    expect(requiredSpinButtonProps.filter(propName => !spinButtonPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(normalizedSpinButtonGuideSource).toContain(
      '| MC-1 | v8 string `value` becomes numeric `value` plus optional `displayValue` |',
    );
    expect(normalizedSpinButtonGuideSource).toContain(
      '| MC-2 | typed edits and step actions use `SpinButtonOnChangeData` |',
    );
    expect(normalizedSpinButtonGuideSource).toContain(
      '| MC-3 | formatting encoded in the v8 string value and callbacks moves to numeric `value` plus consumer-managed `displayValue` |',
    );
    expect(normalizedSpinButtonGuideSource).toContain(
      '| MC-4 | labels compose with `Field`; increment/decrement semantics are built in |',
    );
    expect(spinButtonAccessibility).toContain('incrementButtonAriaLabel');
    expect(spinButtonAccessibility).toContain('decrementButtonAriaLabel');
    expect(spinButtonAccessibility).toContain('aria-valuetext');
    expect(spinButtonUnsupported).toContain('onValidate');
    expect(spinButtonUnsupported).toContain('Field');
    expect(spinButtonRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(spinButtonRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(spinButtonRow?.cells[priorityColumnIndex])).toBe('n/a');

    const spinButtonExamplesSource = readUtf8(spinButtonExamplesPath);

    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V8StringValue: Story ='));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V9NumericAndDisplayValue: Story ='));
    expect(spinButtonExamplesSource).toEqual(
      expect.stringContaining('export const V8FormattedStringCallbacks: Story ='),
    );
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V9DisplayValueFormatting: Story ='));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V8ControlledChange: Story ='));
    expect(spinButtonExamplesSource).toEqual(expect.stringContaining('export const V9ControlledChange: Story ='));
  });

  test('Task 11 Dialog guide and shared stories satisfy the Dialog migration contract', () => {
    const dialogGuidePath = path.join(fromV8ComponentsDirectory, 'Dialog.mdx');
    const dialogExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/Dialog/index.stories.tsx');
    const dialogGuideSource = readUtf8(dialogGuidePath);
    const normalizedDialogGuideSource = dialogGuideSource.replace(/\s+/g, ' ');
    const dialogSections = getGuideSections(stripIgnoredGuideContent(dialogGuideSource));
    const dialogPropMapping = dialogSections.get('Prop mapping') ?? '';
    const dialogPropMappingRows = dialogPropMapping.split(/\r?\n/).filter(line => line.trim().startsWith('|'));
    const dialogAccessibility = dialogSections.get('Accessibility') ?? '';
    const dialogUnsupported = dialogSections.get('Unsupported scenarios and known gaps') ?? '';
    const requiredDialogProps = [
      'hidden',
      'onDismiss',
      'dialogContentProps',
      'modalProps',
      'minWidth',
      'maxWidth',
      'isBlocking',
      'isDarkOverlay',
      'containerClassName',
      'title',
      'subText',
      'showCloseButton',
      'topButtonsProps',
      'DialogFooter',
      'styles',
      'theme',
    ];
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const dialogRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'dialog');

    expect(validateCompleteGuide(dialogGuideSource, 'Dialog')).toEqual([]);
    expect(dialogPropMappingRows.map(parseTableCells).map(cells => cells.length)).toEqual(
      dialogPropMappingRows.map(() => 4),
    );
    expect(requiredDialogProps.filter(propName => !dialogPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(normalizedDialogGuideSource).toContain('| MC-1 | `hidden` inverse state becomes `open`/`defaultOpen` |');
    expect(normalizedDialogGuideSource).toContain(
      '| MC-2 | `dialogContentProps`, `modalProps`, and `DialogFooter` become compound children |',
    );
    expect(normalizedDialogGuideSource).toContain('| MC-3 | `onDismiss` becomes `onOpenChange` with event data |');
    expect(normalizedDialogGuideSource).toContain('| MC-4 | blocking/modal behavior becomes `modalType` |');
    expect(dialogGuideSource).toContain(
      'packages/react-components/react-dialog/library/src/components/Dialog/Dialog.test.tsx',
    );
    expect(normalizedDialogGuideSource).toContain(
      '| MC-5 | title, subtext, close button, top buttons, and footer content move from content props/components to explicit compound children |',
    );
    expect(dialogAccessibility).toContain('focus');
    expect(dialogAccessibility).toContain('alert');
    expect(dialogAccessibility).toContain('Escape');
    expect(dialogAccessibility).toContain('aria-modal');
    expect(dialogUnsupported).toContain('trigger');
    expect(dialogUnsupported).toContain('drag');
    expect(dialogRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(dialogRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(dialogRow?.cells[priorityColumnIndex])).toBe('n/a');

    const dialogExamplesSource = readUtf8(dialogExamplesPath);

    expect(dialogExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V8ControlledVisibility: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V9ControlledOpen: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V8ModalAndBlocking: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V9ModalTypes: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V8CustomHeaderFooter: Story ='));
    expect(dialogExamplesSource).toEqual(expect.stringContaining('export const V9ComposedBodyActions: Story ='));
  });

  test('Task 12 Drawer guide and shared stories satisfy the Panel migration contract', () => {
    const drawerGuidePath = path.join(fromV8ComponentsDirectory, 'Drawer.mdx');
    const drawerExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/Drawer/index.stories.tsx');
    const drawerGuideSource = readUtf8(drawerGuidePath);
    const normalizedDrawerGuideSource = drawerGuideSource.replace(/\s+/g, ' ');
    const drawerSections = getGuideSections(stripIgnoredGuideContent(drawerGuideSource));
    const drawerPropMapping = drawerSections.get('Prop mapping') ?? '';
    const drawerPropMappingRows = drawerPropMapping.split(/\r?\n/).filter(line => line.trim().startsWith('|'));
    const drawerAccessibility = drawerSections.get('Accessibility') ?? '';
    const drawerUnsupported = drawerSections.get('Unsupported scenarios and known gaps') ?? '';
    const requiredDrawerProps = [
      'isOpen',
      'onDismiss',
      'type',
      'headerText',
      'hasCloseButton',
      'isBlocking',
      'isLightDismiss',
      'onLightDismissClick',
      'onRenderHeader',
      'onRenderNavigation',
      'onRenderFooterContent',
      'customWidth',
      'closeButtonAriaLabel',
      'layerProps',
      'styles',
      'theme',
    ];
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const panelRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'panel');

    expect(validateCompleteGuide(drawerGuideSource, 'Drawer')).toEqual([]);
    expect(drawerPropMappingRows.map(parseTableCells).map(cells => cells.length)).toEqual(
      drawerPropMappingRows.map(() => 4),
    );
    expect(requiredDrawerProps.filter(propName => !drawerPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(normalizedDrawerGuideSource).toContain('| MC-1 | `Panel` splits into `OverlayDrawer` and `InlineDrawer` |');
    expect(normalizedDrawerGuideSource).toContain(
      '| MC-2 | Overlay `isOpen`/`onDismiss` become `open`/`onOpenChange`; InlineDrawer exposes `open` without Dialog dismissal semantics |',
    );
    expect(normalizedDrawerGuideSource).toContain(
      '| MC-3 | header, navigation, body, and footer props become compound children |',
    );
    expect(normalizedDrawerGuideSource).toContain(
      '| MC-4 | `PanelType` becomes `position` plus supported `size` values |',
    );
    expect(normalizedDrawerGuideSource).toContain(
      '| MC-5 | blocking, focus, and portal behavior differ between overlay and inline drawers |',
    );
    expect(drawerGuideSource).toContain(
      'packages/react-components/react-drawer/library/src/components/OverlayDrawer/OverlayDrawer.test.tsx',
    );
    expect(drawerGuideSource).toContain(
      'packages/react-components/react-drawer/stories/src/Drawer/OverlayDrawerNoModal.stories.tsx',
    );
    expect(drawerAccessibility).toContain('focus');
    expect(drawerAccessibility).toContain('Escape');
    expect(drawerAccessibility).toContain('aria-labelledby');
    expect(drawerAccessibility).toContain('non-modal');
    expect(drawerUnsupported).toContain('bottom');
    expect(drawerUnsupported).toContain('customWidth');
    expect(drawerUnsupported).toContain('layerProps');
    expect(panelRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(panelRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(panelRow?.cells[priorityColumnIndex])).toBe('n/a');

    const drawerExamplesSource = readUtf8(drawerExamplesPath);

    expect(drawerExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V8Modeless: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V9NonModalOverlayDrawer: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V8EmbeddedPanelAlternative: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V9InlineDrawer: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V8PanelType: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V9PositionAndSize: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V8CustomHeaderFooter: Story ='));
    expect(drawerExamplesSource).toEqual(expect.stringContaining('export const V9ComposedHeaderFooter: Story ='));
  });

  test('Task 13 MessageBar guide and shared stories satisfy the MessageBar migration contract', () => {
    const messageBarGuidePath = path.join(fromV8ComponentsDirectory, 'MessageBar.mdx');
    const messageBarExamplesPath = path.join(fromV8ComponentsDirectory, 'examples/MessageBar/index.stories.tsx');
    const messageBarGuideSource = readUtf8(messageBarGuidePath);
    const normalizedMessageBarGuideSource = messageBarGuideSource.replace(/\s+/g, ' ');
    const messageBarSections = getGuideSections(stripIgnoredGuideContent(messageBarGuideSource));
    const messageBarPropMapping = messageBarSections.get('Prop mapping') ?? '';
    const messageBarAccessibility = messageBarSections.get('Accessibility') ?? '';
    const messageBarUnsupported = messageBarSections.get('Unsupported scenarios and known gaps') ?? '';
    const requiredMessageBarProps = [
      'messageBarType',
      'isMultiline',
      'actions',
      'onDismiss',
      'dismissButtonAriaLabel',
      'messageBarIconProps',
      'onRenderIcon',
      'truncated',
      'overflowButtonAriaLabel',
      'styles',
      'theme',
    ];
    const statusColumnIndex = getInventoryColumnIndex('Status');
    const priorityColumnIndex = getInventoryColumnIndex('Priority');
    const messageBarRow = getInventoryRows().find(row => normalizeInventoryCell(row.cells[0]) === 'messagebar');

    expect(validateCompleteGuide(messageBarGuideSource, 'MessageBar')).toEqual([]);
    expect(requiredMessageBarProps.filter(propName => !messageBarPropMapping.includes(`\`${propName}\``))).toEqual([]);
    expect(normalizedMessageBarGuideSource).toContain(
      '| MC-1 | supported `messageBarType` values become string `intent`; `blocked` and `severeWarning` require a documented fallback choice |',
    );
    expect(normalizedMessageBarGuideSource).toContain(
      '| MC-2 | body, title, actions, and container action become compound children |',
    );
    expect(normalizedMessageBarGuideSource).toContain(
      '| MC-3 | `onDismiss` and dismiss-button creation move to consumer state/composition |',
    );
    expect(normalizedMessageBarGuideSource).toContain('| MC-4 | `isMultiline` becomes `layout` |');
    expect(normalizedMessageBarGuideSource).toContain('| MC-5 | groups of messages can use `MessageBarGroup` |');
    expect(normalizedMessageBarGuideSource).toContain(
      '| MC-6 | v8 `truncated` and overflow behavior require custom composition |',
    );
    expect(messageBarGuideSource).toContain('packages/react-components/react-message-bar/library/docs/Spec.md');
    expect(messageBarGuideSource).toContain(
      'packages/react-components/react-message-bar/library/src/components/MessageBar/useMessageBar.ts',
    );
    expect(messageBarGuideSource).toContain(
      'packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.test.tsx',
    );
    expect(messageBarGuideSource).toContain(
      'packages/react-components/react-message-bar/library/src/components/MessageBar/useMessageBar.test.tsx',
    );
    expect(messageBarAccessibility).toContain('role="group"');
    expect(messageBarAccessibility).toContain('polite');
    expect(messageBarAccessibility).toContain('assertive');
    expect(messageBarAccessibility).toContain('dismiss');
    expect(messageBarAccessibility).toContain('aria-label');
    expect(messageBarUnsupported).toContain('blocked');
    expect(messageBarUnsupported).toContain('severeWarning');
    expect(messageBarUnsupported).toContain('truncated');
    expect(messageBarUnsupported).toContain('overflow');
    expect(messageBarRow).toBeDefined();
    expect(statusColumnIndex).not.toBe(-1);
    expect(priorityColumnIndex).not.toBe(-1);
    expect(normalizeInventoryCell(messageBarRow?.cells[statusColumnIndex])).toBe('complete');
    expect(normalizeInventoryCell(messageBarRow?.cells[priorityColumnIndex])).toBe('n/a');

    const messageBarExamplesSource = readUtf8(messageBarExamplesPath);

    expect(messageBarExamplesSource).toEqual(expect.stringContaining('satisfies Meta'));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('type Story = StoryObj<typeof meta>;'));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8Basic: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V9Basic: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8IntentTypes: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V9IntentValues: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8ActionsAndDismiss: Story ='));
    expect(messageBarExamplesSource).toEqual(
      expect.stringContaining('export const V9ComposedActionsAndDismiss: Story ='),
    );
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8Multiline: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V9Layout: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8MultipleMessages: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V9MessageBarGroup: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V8Truncated: Story ='));
    expect(messageBarExamplesSource).toEqual(expect.stringContaining('export const V9CustomTruncation: Story ='));
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
