import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

function writeFile(root, relative, content) {
  const filename = path.join(root, relative);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`);
}

function dependencyRoot(requireProducer, name) {
  let entry;
  try {
    entry = requireProducer.resolve(`${name}/package.json`);
  } catch {
    entry = requireProducer.resolve(name);
  }
  let directory = path.dirname(fs.realpathSync(entry));
  while (path.dirname(directory) !== directory) {
    const manifest = path.join(directory, 'package.json');
    if (fs.existsSync(manifest) && JSON.parse(fs.readFileSync(manifest, 'utf8')).name === name) return directory;
    directory = path.dirname(directory);
  }
  throw new Error(`Cannot locate installed producer dependency: ${name}`);
}

function installTooling(appRoot) {
  const names = ['@fluentui/cli', '@fluentui/api-metadata'];
  for (const [name, directory] of [
    ['@fluentui/cli', 'tools/cli'],
    ['@fluentui/api-metadata', 'tools/api-metadata'],
  ]) {
    const source = path.join(workspaceRoot, directory);
    const manifest = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf8'));
    assert.ok(fs.existsSync(path.join(source, manifest.main)), `Build ${name} before preparing local acceptance`);
    const destination = path.join(appRoot, 'node_modules', name);
    fs.mkdirSync(destination, { recursive: true });
    for (const filename of ['package.json', 'dist', 'bin', 'assets', 'schemas']) {
      if (fs.existsSync(path.join(source, filename))) {
        fs.cpSync(path.join(source, filename), path.join(destination, filename), {
          recursive: true,
          dereference: true,
        });
      }
    }
    const requireProducer = createRequire(path.join(source, 'package.json'));
    for (const dependency of Object.keys(manifest.dependencies)) {
      if (names.includes(dependency)) continue;
      const target = path.join(appRoot, 'node_modules', dependency);
      if (fs.existsSync(target)) continue;
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.symlinkSync(dependencyRoot(requireProducer, dependency), target, 'junction');
    }
  }
}

function fixturePackage(appRoot, name, version, declarations, subpaths = {}, metadata = false) {
  const root = path.join(appRoot, 'node_modules', name);
  const route = types => ({ types: `./${types}`, default: './index.js' });
  writeFile(root, 'package.json', {
    name,
    version,
    fluentuiAcceptanceFixture: true,
    main: './index.js',
    types: './index.d.ts',
    exports: {
      '.': route('index.d.ts'),
      ...Object.fromEntries(Object.entries(subpaths).map(([key, types]) => [key, route(types)])),
      './package.json': './package.json',
      ...(metadata ? { './metadata.json': './api-metadata/index.json' } : {}),
    },
    ...(name.startsWith('@fluentui/') ? { dependencies: { react: '*' } } : {}),
  });
  writeFile(root, 'index.js', "throw new Error('Acceptance fixtures must not execute component runtimes');\n");
  for (const [filename, source] of Object.entries(declarations)) writeFile(root, filename, source);
  return root;
}

const reactDeclarations = `
export interface ReactElement { type: unknown; props: unknown; key: string | null; }
export declare class Component<Props> {
  constructor(props: Props);
  readonly props: Readonly<Props>;
  render(): ReactElement | null;
}
export declare class PureComponent<Props> extends Component<Props> {}
export interface ForwardRefExoticComponent<Props> {
  (props: Props): ReactElement | null;
  readonly $$typeof: symbol;
}
`;

const legacyDeclarations = {
  'index.d.ts': `
export * from './lib/Button';
export * from './lib/Checkbox';
export * from './lib/Pivot';
export * from './lib/TextField';
export * from './lib/Styling';
`,
  'lib/Button.d.ts': `
import * as React from 'react';
export interface IButtonProps { text?: string; disabled?: boolean; onClick?: () => void; }
export declare class BaseButton extends React.PureComponent<IButtonProps> { focus(): void; }
export declare class Button extends BaseButton {}
export declare class DefaultButton extends BaseButton {}
export declare class PrimaryButton extends BaseButton {}
`,
  'lib/Checkbox.d.ts': `
import * as React from 'react';
export interface ICheckboxProps { label?: string; checked?: boolean; disabled?: boolean; }
export declare class Checkbox extends React.Component<ICheckboxProps> {}
`,
  'lib/Pivot.d.ts': `
import * as React from 'react';
export interface IPivotProps { selectedKey?: string; children?: unknown; }
export interface IPivotItemProps { headerText?: string; itemKey?: string; children?: unknown; }
export declare class Pivot extends React.Component<IPivotProps> {}
export declare class PivotItem extends React.Component<IPivotItemProps> {}
`,
  'lib/TextField.d.ts': `
import * as React from 'react';
export interface ITextField { readonly value: string; focus(): void; }
export interface ITextFieldProps { label?: string; value?: string; componentRef?: unknown; }
export declare class TextField extends React.Component<ITextFieldProps> {}
`,
  'lib/Styling.d.ts': `
export declare function getTheme(): { palette: { themePrimary: string } };
export declare function mergeStyleSets<Styles>(styles: Styles): Styles;
`,
};

const legacySource = `
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { TextField, type ITextField } from '@fluentui/react/lib/TextField';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';

const field: ITextField | undefined = undefined;
export const theme = getTheme();
export const styles = mergeStyleSets({ root: { display: 'grid' } });
export function App() {
  return <>
    <DefaultButton text="Add task" disabled={false} />
    <PrimaryButton text="Save" disabled />
    <Checkbox label="Completed" checked={false} />
    <Pivot selectedKey="all"><PivotItem headerText="All" itemKey="all" /></Pivot>
    <TextField label="Task" componentRef={field} />
  </>;
}
`;

export async function prepareLocalV8Acceptance(configuredRoot) {
  let root;
  if (configuredRoot) {
    const requested = path.resolve(configuredRoot);
    assert.ok(!fs.existsSync(requested), `Refusing to overwrite ${requested}`);
    let ancestor = path.dirname(requested);
    while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
    const destination = path.resolve(fs.realpathSync(ancestor), path.relative(ancestor, requested));
    assert.ok(
      destination !== workspaceRoot && !destination.startsWith(workspaceRoot + path.sep),
      'Local acceptance fixtures must live outside the producer workspace',
    );
    fs.mkdirSync(destination, { recursive: true });
    root = fs.realpathSync(destination);
  } else {
    root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-v8-acceptance-')));
  }
  for (const [app, reactVersion] of [
    ['reference-v8', '18.3.1'],
    ['reference', '19.2.0'],
  ]) {
    const appRoot = path.join(root, app);
    writeFile(appRoot, 'package.json', {
      name: `fluentui-v8-acceptance-${app}`,
      private: true,
      dependencies:
        app === 'reference-v8'
          ? { '@fluentui/react': '8.125.8', react: reactVersion }
          : {
              '@fluentui/react-components': '9.0.0',
              '@fluentui/react-headless-components-preview': '0.0.0',
              react: reactVersion,
            },
    });
    writeFile(appRoot, 'fluentui.config.json', { schemaVersion: 1, systems: {} });
    writeFile(appRoot, 'tsconfig.json', {
      compilerOptions: { jsx: 'react', strict: true, skipLibCheck: true },
      include: ['src'],
    });
    fixturePackage(appRoot, 'react', reactVersion, { 'index.d.ts': reactDeclarations });
    installTooling(appRoot);
  }
  const legacyRoot = path.join(root, 'reference-v8');
  fixturePackage(legacyRoot, '@fluentui/react', '8.125.8', legacyDeclarations, {
    './lib/Button': 'lib/Button.d.ts',
    './lib/Checkbox': 'lib/Checkbox.d.ts',
    './lib/Pivot': 'lib/Pivot.d.ts',
    './lib/TextField': 'lib/TextField.d.ts',
    './lib/Styling': 'lib/Styling.d.ts',
  });
  writeFile(legacyRoot, 'src/App.tsx', legacySource);
  const modernRoot = path.join(root, 'reference');
  const generator = createRequire(path.join(modernRoot, 'node_modules/@fluentui/api-metadata/package.json'))(
    '@fluentui/api-metadata/generator',
  );
  for (const name of ['@fluentui/react-components', '@fluentui/react-headless-components-preview']) {
    const headless = name.endsWith('preview');
    const packageRoot = fixturePackage(
      modernRoot,
      name,
      headless ? '0.0.0' : '9.0.0',
      {
        'index.d.ts': `
import * as React from 'react';
export interface ButtonProps { disabled?: boolean; children?: unknown; ${
          headless ? '' : "appearance?: 'primary' | 'secondary';"
        } }
export declare const Button: React.ForwardRefExoticComponent<ButtonProps>;
`,
        ...(headless ? { 'button.d.ts': "export { Button, ButtonProps } from './index';\n" } : {}),
      },
      headless ? { './button': 'button.d.ts' } : {},
      true,
    );
    const result = await generator.generateApiMetadata({ packageRoot, packageName: name });
    assert.ok(
      !result.diagnostics.some(diagnostic => diagnostic.severity === 'error'),
      JSON.stringify(result.diagnostics),
    );
    generator.writeGeneratedMetadata(result, path.join(packageRoot, 'api-metadata'));
  }
  writeFile(
    modernRoot,
    'src/App.tsx',
    `
import { Button as StyledButton } from '@fluentui/react-components';
import { Button as HeadlessButton } from '@fluentui/react-headless-components-preview/button';
export function App() {
  return <><StyledButton appearance="primary" disabled /><HeadlessButton disabled={false} /></>;
}
`,
  );
  writeFile(root, 'local-setup.json', { schemaVersion: 1, mode: 'local-fixture', workspaceRoot, root });
  return root;
}
