import { formatMetadataAsHtml } from './html-reporter';
import type { UsageReportOutput } from './types';

const TEST_LEGEND: UsageReportOutput['legend'] = {
  components: { name: 'Components', description: 'React components (JSX elements).' },
  hooks: { name: 'Hooks', description: 'React hooks (use* naming convention).' },
  types: { name: 'Types', description: 'TypeScript interfaces, type aliases, and enums.' },
  others: { name: 'Other Exports', description: 'Value exports that are not components or hooks.' },
  unknowns: { name: 'Unknowns', description: 'Symbols whose .d.ts declarations could not be resolved.' },
};

describe('html-reporter', () => {
  it('should produce a valid HTML document', () => {
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
              count: 5,
            },
          },
          hooks: {
            useId: { props: { arg0: { values: ["'my-id'"], count: 2 } }, count: 2 },
          },
          types: { ButtonProps: { count: 1, typeofCount: 0, props: {} } },
          others: { tokens: { props: {}, count: 3 } },
          unknowns: {},
          count: 11,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('<!DOCTYPE html>');
    expect(output).toContain('<title>Fluent UI Usage Report</title>');
    expect(output).toContain('</html>');
    expect(output).toContain('Legend');
    expect(output).toContain('<strong>Components</strong>');
    expect(output).toContain('<strong>Types</strong>');
  });

  it('should render summary table with correct counts', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: { Button: { props: {}, count: 2 } },
          hooks: { useId: { props: {}, count: 1 } },
          types: { ButtonProps: { count: 1, typeofCount: 0, props: {} } },
          others: { tokens: { props: {}, count: 1 } },
          unknowns: {},
          count: 5,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('<a href="#pkg--proj-react-components"><code>@proj/react-components</code></a>');
    expect(output).toContain('id="pkg--proj-react-components"');
    // Components: 1, Hooks: 1, Types: 1, Others: 1, Unknowns: 0, Total: 5
    expect(output).toContain('<td>1</td>');
    expect(output).toContain('<td>5</td>');
  });

  it('should render component prop details with values', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Button: {
              props: {
                appearance: { values: ['primary', 'secondary'], count: 3 },
              },
              count: 3,
            },
          },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 3,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    // Component Props section
    expect(output).toContain('Component Props');
    expect(output).toContain('<details class="symbol-props">');
    expect(output).toContain('<code>Button</code>');
    expect(output).toContain('<code>appearance</code>');
    expect(output).toContain('<code>primary</code>');
    expect(output).toContain('<code>secondary</code>');
  });

  it('should render hook argument details', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {},
          hooks: {
            useId: { props: { arg0: { values: ["'my-id'"], count: 1 } }, count: 1 },
          },
          types: {},
          others: {},
          unknowns: {},
          count: 1,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('Hook Arguments');
    expect(output).toContain('<code>useId</code>');
    expect(output).toContain('<code>arg0</code>');
    expect(output).toContain("<code>'my-id'</code>");
  });

  it('should not render prop details when props are empty', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Divider: { props: {}, count: 2 },
          },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 2,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('<code>Divider</code>');
    expect(output).not.toContain('Component Props');
    expect(output).not.toContain('<details class="symbol-props">');
  });

  it('should render unknowns with descriptions', () => {
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
            SomeConstant: { props: {}, count: 3, description: 'PascalCase symbol' },
            CustomProps: { props: {}, count: 1, description: 'Likely a type' },
          },
          count: 4,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('Unknowns');
    expect(output).toContain('<code>SomeConstant</code>');
    expect(output).toContain('PascalCase symbol');
    expect(output).toContain('<code>CustomProps</code>');
    expect(output).toContain('Likely a type');
    expect(output).toContain('.d.ts');
  });

  it('should handle empty metadata', () => {
    const output = formatMetadataAsHtml({ legend: TEST_LEGEND, fileMap: [], packages: {} });

    expect(output).toContain('<!DOCTYPE html>');
    expect(output).toContain('No Fluent UI package usage found.');
  });

  it('should render file map section with file paths', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx', 'src/utils.ts'],
      packages: {
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

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('Files analyzed:');
    expect(output).toContain('<code>src/App.tsx</code>');
    expect(output).toContain('<code>src/utils.ts</code>');
  });

  it('should escape HTML special characters', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Button: {
              props: {
                onClick: { values: ['() => { alert("<xss>") }'], count: 1 },
              },
              count: 1,
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

    const output = formatMetadataAsHtml(reportData);

    expect(output).not.toContain('<xss>');
    expect(output).toContain('&lt;xss&gt;');
  });

  it('should show dash for props with no values', () => {
    const reportData: UsageReportOutput = {
      legend: TEST_LEGEND,
      fileMap: ['src/App.tsx'],
      packages: {
        '@proj/react-components': {
          components: {
            Button: {
              props: {
                disabled: { values: [], count: 2 },
              },
              count: 2,
            },
          },
          hooks: {},
          types: {},
          others: {},
          unknowns: {},
          count: 2,
        },
      },
    };

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('<span class="muted">—</span>');
  });

  it('should render multiple packages as separate sections', () => {
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

    const output = formatMetadataAsHtml(reportData);

    expect(output).toContain('<code>@proj/react-components</code>');
    expect(output).toContain('<code>@griffel/react</code>');
    expect(output).toContain('<code>makeStyles</code>');
  });
});
