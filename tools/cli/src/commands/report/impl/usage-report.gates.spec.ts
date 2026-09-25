import * as fs from 'node:fs';
import * as path from 'node:path';

import { collectUsageReportData } from './usage-report';
import type { CatalogDiagnostic } from '../../../utils';

const testRoot = path.join(process.cwd(), '.catalog-test-data', 'standalone-required-usage');

describe('usage report rollout gates', () => {
  beforeEach(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
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
    writeUnavailablePreset('@fluentui/react-components');
    writeUnavailablePreset('@fluentui/react-headless-components-preview');
  });

  afterAll(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('runs required metadata for standalone Button without installed suite or headless presets', () => {
    const diagnostics: CatalogDiagnostic[] = [];
    const result = collectUsageReportData(testRoot, undefined, undefined, undefined, {
      package: '@fluentui/react-button',
      metadataMode: 'required',
      diagnostics,
    });

    expect(result.packages['@fluentui/react-button'].components.Button.count).toBe(1);
    expect(diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'error',
          package: '@fluentui/react-headless-components-preview',
        }),
      ]),
    );
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
