import { formatMetadataAsMarkdown } from './markdown-reporter';
import type { LongReportOutput } from './types';

const TEST_LEGEND: LongReportOutput['legend'] = {
  components: { name: 'Components', description: 'React components (JSX elements).' },
  hooks: { name: 'Hooks', description: 'React hooks (use* naming convention).' },
  types: { name: 'Types', description: 'TypeScript interfaces, type aliases, and enums.' },
  others: { name: 'Other Exports', description: 'Value exports that are not components or hooks.' },
  unknowns: { name: 'Unknowns', description: 'Symbols whose .d.ts declarations could not be resolved.' },
};

describe('markdown-reporter', () => {
  it('should produce a report with summary table and per-package sections', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx', 'src/utils.ts'],
      packages: {
        '@proj/react-components': {
          components: {
            Button: {
              props: {
                appearance: { values: ['primary', 'secondary'], count: 3 },
                size: { values: ['medium'], count: 1 },
              },
              count: 3,
            },
            Input: {
              props: {
                placeholder: { values: ['Search...'], count: 1 },
              },
              count: 1,
            },
          },
          hooks: {
            useId: { props: { arg0: { values: ["'my-id'"], count: 1 } }, count: 1 },
          },
          types: {
            ButtonProps: { count: 2, typeofCount: 0, props: {} },
          },
          others: {
            tokens: { props: {}, count: 3 },
            webLightTheme: { props: {}, count: 1 },
          },
          unknowns: {},
          count: 12,
        },
      },
    };

    const output = formatMetadataAsMarkdown(reportData);

    // Title
    expect(output).toContain('# Fluent UI Codebase Usage Report');

    // Legend
    expect(output).toContain('## Legend');
    expect(output).toContain('| **Components** |');
    expect(output).toContain('| **Types** |');

    // Summary table
    expect(output).toContain('## Summary');
    expect(output).toContain('| `@proj/react-components` | 2 | 1 | 1 | 2 | 0 | 12 |');

    // Components section — just symbol + count, no props
    expect(output).toContain('### Components');
    expect(output).toContain('| `Button` | 3 |');
    expect(output).toContain('| `Input` | 1 |');
    expect(output).not.toContain('appearance');
    expect(output).not.toContain('primary');

    // Hooks section — just symbol + count, no arguments
    expect(output).toContain('### Hooks');
    expect(output).toContain('| `useId` | 1 |');
    expect(output).not.toContain("'my-id'");

    // Types section — now includes typeof count and type args
    expect(output).toContain('### Types');
    expect(output).toContain('| `ButtonProps` | 2 | 0 | 0 |');

    // Others section
    expect(output).toContain('### Other Exports');
    expect(output).toContain('| `tokens` | 3 |');
  });

  it('should handle empty metadata', () => {
    const output = formatMetadataAsMarkdown({ legend: TEST_LEGEND, fileMap: [], packages: {} });

    expect(output).toContain('# Fluent UI Codebase Usage Report');
    expect(output).toContain('No Fluent UI package usage found.');
  });

  it('should include files analyzed count', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx', 'src/utils.ts', 'src/helpers.ts'],
      packages: {},
    };

    const output = formatMetadataAsMarkdown(reportData);

    expect(output).toContain('**Files analyzed:** 3');
  });

  it('should handle package with only others', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@griffel/react': {
          components: {},
          hooks: {},
          types: {},
          others: {
            makeStyles: { props: {}, count: 5 },
          },
          unknowns: {},
          count: 5,
        },
      },
    };

    const output = formatMetadataAsMarkdown(reportData);

    expect(output).toContain('`@griffel/react`');
    expect(output).toContain('| `makeStyles` | 5 |');
    expect(output).not.toContain('### Components');
    expect(output).not.toContain('### Hooks');
    expect(output).not.toContain('### Types');
  });

  it('should sort symbols by usage count descending', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Tooltip: { props: {}, count: 1 },
            Button: { props: {}, count: 10 },
            Input: { props: {}, count: 5 },
          },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 16,
        },
      },
    };

    const output = formatMetadataAsMarkdown(reportData);

    const buttonIdx = output.indexOf('`Button`');
    const inputIdx = output.indexOf('`Input`');
    const tooltipIdx = output.indexOf('`Tooltip`');

    expect(buttonIdx).toBeLessThan(inputIdx);
    expect(inputIdx).toBeLessThan(tooltipIdx);
  });

  it('should handle multiple packages sorted alphabetically', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@griffel/react': {
          components: {},
          hooks: {},
          types: {},
          others: { makeStyles: { props: {}, count: 1 } },
          unknowns: {},
          count: 1,
        },
        '@proj/react-components': {
          components: { Button: { props: {}, count: 1 } },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 1,
        },
      },
    };

    const output = formatMetadataAsMarkdown(reportData);

    const projIdx = output.indexOf('## `@proj/react-components`');
    const griffelIdx = output.indexOf('## `@griffel/react`');

    expect(griffelIdx).toBeLessThan(projIdx);
  });

  it('should render unknowns section with descriptions', () => {
    const reportData: LongReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {},
          hooks: {},
          types: {},
          others: {},
          unknowns: {
            SomeConstant: {
              props: {},
              count: 3,
              description: 'PascalCase symbol — could be a component, constant, or type',
            },
            CustomProps: { props: {}, count: 1, description: 'Likely a type/interface (*Props naming convention)' },
          },
          count: 4,
        },
      },
    };

    const output = formatMetadataAsMarkdown(reportData);

    expect(output).toContain('### Unknowns');
    expect(output).toContain('`.d.ts` declarations could not be resolved');
    expect(output).toContain('| `SomeConstant` | 3 | PascalCase symbol');
    expect(output).toContain('| `CustomProps` | 1 | Likely a type/interface');
    expect(output).toContain('| 2 | 4 |');
  });
});
