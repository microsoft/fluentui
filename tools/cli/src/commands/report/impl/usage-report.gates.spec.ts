import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as os from 'node:os';
import * as path from 'node:path';

import { collectUsageReportData } from './usage-report';
import type { CatalogDiagnostic } from '../../../utils';

let testRoot: string;

describe('usage report rollout gates', () => {
  beforeEach(() => {
    testRoot = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-standalone-required-usage-')));
    fs.mkdirSync(path.join(testRoot, 'src'), { recursive: true });
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({
        name: 'standalone-button-app',
        dependencies: { '@fluentui/react-button': '1.0.0' },
      }),
    );
    fs.writeFileSync(
      path.join(testRoot, 'src/App.tsx'),
      "import { Button } from '@fluentui/react-button';\nexport const App = () => <Button />;\n",
    );
    writeStandaloneButton();
  });

  afterEach(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('runs required metadata for standalone Button without installed suite or headless presets', () => {
    const requireFixture = createRequire(path.join(testRoot, 'package.json'));
    expect(requireFixture.resolve('@fluentui/react-button/metadata.json')).toBe(
      path.join(testRoot, 'node_modules/@fluentui/react-button/dist/metadata/index.json'),
    );
    for (const packageName of ['@fluentui/react-components', '@fluentui/react-headless-components-preview']) {
      expect(() => requireFixture.resolve(`${packageName}/package.json`)).toThrow();
      expect(() => requireFixture.resolve(`${packageName}/metadata.json`)).toThrow();
    }
    const diagnostics: CatalogDiagnostic[] = [];
    const result = collectUsageReportData(testRoot, undefined, undefined, undefined, {
      package: '@fluentui/react-button',
      metadataMode: 'required',
      diagnostics,
    });

    expect(result.packages['@fluentui/react-button'].components.Button.count).toBe(1);
    expect(diagnostics).toEqual([]);
  });

  it('reports unavailable metadata for an installed suite without resolving a workspace catalog', () => {
    writeUnavailablePreset('@fluentui/react-components');
    const diagnostics: CatalogDiagnostic[] = [];
    const result = collectUsageReportData(testRoot, undefined, undefined, undefined, {
      package: '@fluentui/react-button',
      metadataMode: 'required',
      diagnostics,
    });

    expect(result.packages['@fluentui/react-button'].components.Button.count).toBe(1);
    expect(diagnostics).toEqual([
      expect.objectContaining({
        code: 'catalog.metadataUnavailable',
        causeCode: 'reader.packageNotFound',
        package: '@fluentui/react-components',
        severity: 'error',
      }),
    ]);
  });

  it('scans a parent Git repository with independent child project declarations', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-usage-projects-'));
    const packageName = '@private/child-ui';
    const write = (relativePath: string, content: string) => {
      const filePath = path.join(root, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    };
    try {
      execSync('git init -q', { cwd: root });
      write('package.json', JSON.stringify({ name: 'usage-workspace', private: true }));
      for (const project of ['first', 'second']) {
        write(
          `apps/${project}/package.json`,
          JSON.stringify({ name: `usage-${project}`, dependencies: { [packageName]: '1.0.0' } }),
        );
        write(`apps/${project}/tsconfig.json`, JSON.stringify({ compilerOptions: { moduleResolution: 'node' } }));
        write(
          `apps/${project}/src/App.tsx`,
          `import { Widget } from '${packageName}';\nexport const value = Widget;\n`,
        );
        write(
          `apps/${project}/node_modules/${packageName}/package.json`,
          JSON.stringify({ name: packageName, version: '1.0.0', types: 'index.d.ts' }),
        );
      }
      write('apps/first/node_modules/@types/react/package.json', JSON.stringify({ name: '@types/react' }));
      write(
        'apps/first/node_modules/@types/react/index.d.ts',
        'export interface ReactElement {}\nexport class Component<P> { props: P; render(): ReactElement; }\n',
      );
      write(
        `apps/first/node_modules/${packageName}/index.d.ts`,
        "import * as React from 'react';\nexport declare class Widget extends React.Component<{ label: string }> {}\n",
      );
      write(`apps/second/node_modules/${packageName}/index.d.ts`, 'export declare const Widget: number;\n');

      const diagnostics: CatalogDiagnostic[] = [];
      const report = collectUsageReportData(root, undefined, undefined, undefined, {
        package: packageName,
        metadataMode: 'off',
        diagnostics,
      });
      expect(report.fileMap).toEqual(['apps/first/src/App.tsx', 'apps/second/src/App.tsx']);
      expect(report.packages[packageName].components.Widget.count).toBe(1);
      expect(report.packages[packageName].others.Widget.count).toBe(1);
      expect(diagnostics).toEqual([]);

      const childReport = collectUsageReportData(path.join(root, 'apps/first'), undefined, undefined, undefined, {
        package: packageName,
        metadataMode: 'off',
      });
      expect(childReport.fileMap).toEqual(['src/App.tsx']);
      expect(childReport.packages[packageName].components.Widget.count).toBe(1);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

function writeUnavailablePreset(packageName: string): void {
  const packageRoot = path.join(testRoot, 'node_modules', ...packageName.split('/'));
  fs.mkdirSync(packageRoot, { recursive: true });
  fs.writeFileSync(path.join(packageRoot, 'package.json'), JSON.stringify({ name: packageName, version: '1.0.0' }));
  fs.writeFileSync(path.join(packageRoot, 'index.js'), '');
}

function writeStandaloneButton(): void {
  const packageRoot = path.join(testRoot, 'node_modules/@fluentui/react-button');
  const metadataRoot = path.join(packageRoot, 'dist/metadata');
  fs.mkdirSync(metadataRoot, { recursive: true });
  fs.writeFileSync(path.join(packageRoot, 'index.d.ts'), 'export declare const Button: (props: {}) => unknown;\n');
  fs.writeFileSync(path.join(packageRoot, 'index.js'), '');
  fs.writeFileSync(
    path.join(packageRoot, 'package.json'),
    JSON.stringify({
      name: '@fluentui/react-button',
      version: '1.0.0',
      fluentuiCatalog: './metadata.json',
      exports: {
        '.': { types: './index.d.ts', default: './index.js' },
        './metadata.json': './dist/metadata/index.json',
      },
    }),
  );
  fs.writeFileSync(
    path.join(metadataRoot, 'index.json'),
    JSON.stringify({
      kind: 'package-index',
      schema: { major: 1, revision: 0 },
      generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
      package: { name: '@fluentui/react-button', version: '1.0.0' },
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'unsupported', reasons: ['not generated'] },
        guidance: { status: 'unsupported', reasons: ['not generated'] },
        search: { status: 'unsupported', reasons: ['not generated'] },
      },
      completeness: {
        api: { status: 'complete' },
        guidance: { status: 'unavailable', reasons: ['not generated'] },
        search: { status: 'unavailable', reasons: ['not generated'] },
      },
      declarationInputs: [
        {
          path: 'index.d.ts',
          conditions: ['types', 'import'],
          fingerprint: { algorithm: 'sha256', value: 'a'.repeat(64) },
        },
      ],
      records: [
        {
          id: 'button-api',
          kind: 'api',
          path: 'api/button.json',
          fingerprint: { algorithm: 'sha256', value: 'b'.repeat(64) },
          symbols: ['Button:value'],
        },
      ],
      exports: [
        {
          id: 'route.Button.value',
          entrypoint: '.',
          export: 'Button',
          namespace: 'value',
          conditions: ['types', 'import'],
          exportKind: 'named',
          typeOnly: false,
          target: { kind: 'local', record: 'button-api', symbol: 'Button:value' },
          classifications: [{ facet: 'component', confidence: 'authored', evidence: ['fixture'] }],
        },
      ],
      diagnostics: [],
    }),
  );
}
