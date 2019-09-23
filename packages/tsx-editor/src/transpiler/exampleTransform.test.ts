import { transformExample } from './exampleTransform';
import * as fs from 'fs';
import * as path from 'path';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';
import { IBasicPackageGroup } from '../interfaces/packageGroup';

describe('example transform', () => {
  // silence diagnostic output
  const consoleLog = console.log;
  beforeAll(() => {
    console.log = () => undefined;
  });
  afterAll(() => {
    console.log = consoleLog;
  });

  function transformFile(file: string, useJs?: boolean, supportedPackages: IBasicPackageGroup[] = SUPPORTED_PACKAGES) {
    const filename = path.resolve(__dirname, './examples/' + file);
    const tsCode = fs.readFileSync(filename).toString();
    let jsCode: string | undefined;
    if (useJs) {
      jsCode = fs.readFileSync(filename.replace('.txt', 'Transpiled.txt')).toString();
    }
    return transformExample({
      id: 'fake',
      jsCode,
      tsCode,
      supportedPackages: supportedPackages
    });
  }

  it('returns an error for an unsupported example', () => {
    const result = transformFile('relativeImport.txt');
    expect(result.error).toBe('Importing scss is not supported by the editor.');
  });

  it('handles examples with function components', () => {
    const result = transformFile('function.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('handles examples with class components', () => {
    const result = transformFile('class.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('handles transpiled examples with function components', () => {
    const result = transformFile('function.txt', true);
    expect(result.output).toMatchSnapshot();
  });

  it('handles transpiled examples with class components', () => {
    const result = transformFile('class.txt', true);
    expect(result.output).toMatchSnapshot();
  });

  const fooGroup: IBasicPackageGroup = { globalName: 'Foo', packages: [{ packageName: 'foo' }] };
  const fabricGroup: IBasicPackageGroup = { globalName: 'Fabric', packages: [{ packageName: 'office-ui-fabric-react' }] };

  it('handles examples with custom supportedPackages', () => {
    const result = transformFile('customPackages.txt', false, [fooGroup]);
    expect(result.output).toMatchSnapshot();
  });

  it('handles examples with custom supportedPackages and Fabric', () => {
    const result = transformFile('customPackagesFabric.txt', false, [fooGroup, fabricGroup]);
    expect(result.output).toMatchSnapshot();
  });
});
