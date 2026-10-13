import { formatMetadataAsMarkdown } from './markdown-reporter';
import type { UsageReportOutput } from './types';

const TEST_LEGEND: UsageReportOutput['legend'] = {
  components: { name: 'Components', description: 'React components (JSX elements).' },
  hooks: { name: 'Hooks', description: 'React hooks (use* naming convention).' },
  types: { name: 'Types', description: 'TypeScript interfaces, type aliases, and enums.' },
  others: { name: 'Other Exports', description: 'Value exports that are not components or hooks.' },
  unknowns: { name: 'Unknowns', description: 'Symbols whose .d.ts declarations could not be resolved.' },
};

describe('markdown-reporter', () => {
  it.each(['@fluentui/react', 'ui-kit'])('groups nested imports under their npm package %s', packageName => {
    const usage = {
      components: { Button: { props: { text: { values: ['Save'], count: 1 } }, count: 1 } },
      hooks: {},
      types: {},
      others: {},
      unknowns: {},
      count: 1,
    };
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        [packageName]: usage,
        [`${packageName}/lib/Button`]: { ...usage, count: 2 },
        [`${packageName}/lib/Checkbox`]: { ...usage, count: 3 },
        [`${packageName}-other/lib/Button`]: { ...usage, count: 4 },
      },
    };
    const before = JSON.stringify(reportData);
    const output = formatMetadataAsMarkdown(reportData);
    expect(output).toContain(`### ${packageName}\n`);
    expect(output).toContain(`### ${packageName}-other\n`);
    expect(output).not.toContain('### @fluentui\n');
    expect(output).toContain('| Import Path | Components |');
    expect(output).not.toContain('| Package | Components |');
    expect(output).toContain(`## \`${packageName}\`\n`);
    expect(output.split('\n').filter(line => line.startsWith('## `'))).toEqual([
      `## \`${packageName}\``,
      `## \`${packageName}-other\``,
    ]);
    for (const [importPath, entry] of Object.entries(reportData.packages)) {
      expect(output).toContain(`| \`${importPath}\` | 1 | 0 | 0 | 0 | 0 | ${entry.count} |`);
    }
    expect(JSON.stringify(reportData)).toBe(before);
  });

  it('should produce a report with summary table and per-package sections', () => {
    const reportData: UsageReportOutput = {
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

    expect(output).toContain('### Components');
    expect(output).toContain('| `Button` | 3 |');
    expect(output).toContain('| `Input` | 1 |');
    expect(output).toContain('#### `Button` Observed Props');
    expect(output).toContain('| Prop | Usages | Observed Values |');
    expect(output).toContain('| `appearance` | 3 | `primary`, `secondary` |');
    expect(output).toContain('| `size` | 1 | `medium` |');
    expect(output).toContain('#### `Input` Observed Props');

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

  it('preserves observed prop counts and values while escaping table content', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Button: {
              count: 4,
              props: {
                text: { count: 3, values: ['first | second\nline', '`quoted`'] },
                disabled: { count: 2, values: [] },
              },
            },
          },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 1,
        },
      },
    };
    const before = JSON.stringify(reportData);
    const output = formatMetadataAsMarkdown(reportData);
    expect(output).toContain('| `text` | 3 | `first \\| second line`, `` `quoted` `` |');
    expect(output).toContain('| `disabled` | 2 | — |');
    expect(JSON.stringify(reportData)).toBe(before);
  });

  it('should handle empty metadata', () => {
    const output = formatMetadataAsMarkdown({ legend: TEST_LEGEND, fileMap: [], packages: {} });

    expect(output).toContain('# Fluent UI Codebase Usage Report');
    expect(output).toContain('No Fluent UI package usage found.');
  });

  it('should include files analyzed count', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx', 'src/utils.ts', 'src/helpers.ts'],
      packages: {},
    };

    const output = formatMetadataAsMarkdown(reportData);

    expect(output).toContain('**Files analyzed:** 3');
  });

  it('should handle package with only others', () => {
    const reportData: UsageReportOutput = {
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
    const reportData: UsageReportOutput = {
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
    const reportData: UsageReportOutput = {
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
    const reportData: UsageReportOutput = {
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
