import { transformExample } from './exampleTransform';
import * as fs from 'fs';
import * as path from 'path';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';
import type { ITransformExampleParams } from './exampleTransform';
import type { IBasicPackageGroup } from '../interfaces/packageGroup';

describe('example transform', () => {
  function transformFile(file: string, options: Partial<ITransformExampleParams> & { useJs?: boolean } = {}) {
    const { useJs, ...transformOptions } = options;
    const filename = path.resolve(__dirname, './examples/' + file);
    const tsCode = fs.readFileSync(filename).toString();
    let jsCode: string | undefined;
    if (useJs) {
      jsCode = fs.readFileSync(filename.replace('.txt', 'Transpiled.txt')).toString();
    }
    return transformExample({
      id: 'fake',
      tsCode,
      jsCode,
      supportedPackages: SUPPORTED_PACKAGES,
      ...transformOptions,
    });
  }

  it('returns an error for an unsupported example', () => {
    const result = transformFile('relativeImport.txt');
    expect(result.error).toBe('Importing scss is not supported by the editor.');
  });

  it('handles examples with function components', () => {
    const result = transformFile('function.txt');
    // calling out some specific expectations before testing the snapshot
    expect(result.output).toBeTruthy();
    // renders component (rather than returning it)
    expect(result.output).toContain('ReactDOM.render');
    expect(result.output).not.toContain('return LabelBasicExampleWrapper');
    // renders wrapper in JSX
    expect(result.output).toContain('<LabelBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('handles examples with class components', () => {
    const result = transformFile('class.txt');
    expect(result.output).toBeTruthy();
    expect(result.output).toContain('ReactDOM.render');
    expect(result.output).not.toContain('return SpinButtonBasicExampleWrapper');
    expect(result.output).toContain('<SpinButtonBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('handles transpiled examples with function components', () => {
    const result = transformFile('function.txt', { useJs: true });
    expect(result.output).toBeTruthy();
    expect(result.output).toContain('ReactDOM.render');
    expect(result.output).toContain('<LabelBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('handles transpiled examples with class components', () => {
    const result = transformFile('class.txt', { useJs: true });
    expect(result.output).toBeTruthy();
    expect(result.output).toContain('ReactDOM.render');
    expect(result.output).toContain('<SpinButtonBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('can return component', () => {
    const result = transformFile('function.txt', { returnFunction: true });
    expect(result.output).toBeTruthy();
    // no rendering
    expect(result.output).not.toContain('ReactDOM.render');
    // starts with function
    expect(result.output!.startsWith('(function(React) {')).toBe(true);
    // retuns component
    expect(result.output).toContain('return LabelBasicExampleWrapper');
    // generates wrapper component
    expect(result.output).toContain('LabelBasicExampleWrapper');
    // doesn't use JSX for wrapper component
    expect(result.output).not.toContain('<LabelBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('can return component with transpiled example', () => {
    const result = transformFile('function.txt', { useJs: true, returnFunction: true });
    expect(result.output).toBeTruthy();
    expect(result.output).not.toContain('ReactDOM.render');
    expect(result.output!.startsWith('(function(React) {')).toBe(true);
    expect(result.output).toContain('return LabelBasicExampleWrapper');
    expect(result.output).toContain('LabelBasicExampleWrapper');
    expect(result.output).not.toContain('<LabelBasicExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  const fooGroup: IBasicPackageGroup = { globalName: 'Foo', packages: [{ packageName: 'foo' }] };
  const fluentGroup: IBasicPackageGroup = {
    globalName: 'FluentUIReact',
    packages: [{ packageName: '@fluentui/react' }],
  };

  it('handles examples with custom supportedPackages', () => {
    const result = transformFile('customPackages.txt', { supportedPackages: [fooGroup] });
    expect(result.output).toBeTruthy();
    expect(result.output).not.toContain('FluentUIReact');
    expect(result.output).not.toContain('ThemeProvider');
    expect(result.output).not.toContain('initializeIcons');
    expect(result.output).not.toContain('<FooExampleWrapper');
    expect(result).toMatchSnapshot();
  });

  it('handles examples with custom supportedPackages and Fluent', () => {
    const result = transformFile('customPackagesFluent.txt', { supportedPackages: [fooGroup, fluentGroup] });
    expect(result.output).toBeTruthy();
    expect(result.output).toContain(', initializeIcons');
    expect(result.output).toContain(', ThemeProvider');
    expect(result.output).toContain('initializeIcons()');
    expect(result.output).toContain('<ThemeProvider>');
    expect(result.output).toContain('FooExampleWrapper');
    expect(result).toMatchSnapshot();
  });
});
