import fs from 'fs';
import path from 'path';
import { IDiagnostic, _getLineStarts, _getErrorLineInfo, _getErrorMessages, _supportedPackageToGlobalMap } from './transpileHelpers';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';

// Real diagnostics copied from loading ./examples/class.txt in the editor while type checking wasn't set up
const exampleLines = fs
  .readFileSync(path.join(__dirname, 'examples/class.txt'))
  .toString()
  .split(/\r?\n/g);
const example = exampleLines.join('\n');
const exampleCRLF = exampleLines.join('\r\n');
const diagnostics: IDiagnostic[] = [
  { start: 23, length: 7, messageText: "Cannot find module 'react'.", code: 2307, category: 1 },
  { start: 192, length: 3, messageText: "Cannot find namespace 'JSX'.", code: 2503, category: 1 },
  { start: 225, length: 32, messageText: "JSX element implicitly has type 'any'.", code: 7026, category: 1 }
];
const lineStarts = [0, 32, 100, 101, 173, 206, 219, 258, 278, 305, 343, 361, 381, 400, 459, 518, 577, 588, 601, 608, 612, 614];
const lineStartsCRLF = [0, 33, 102, 104, 177, 211, 225, 265, 286, 314, 353, 372, 393, 413, 473, 533, 593, 605, 619, 627, 632, 635];

describe('_getLineStarts', () => {
  it('works with LF', () => {
    expect(_getLineStarts(example)).toEqual(lineStarts);
  });

  it('works with CRLF', () => {
    expect(_getLineStarts(exampleCRLF)).toEqual(lineStartsCRLF);
  });
});

describe('_getErrorLineInfo', () => {
  it('works', () => {
    expect(_getErrorLineInfo(diagnostics[0], lineStarts)).toEqual({ line: 1, col: 24 });
    expect(_getErrorLineInfo(diagnostics[1], lineStarts)).toEqual({ line: 5, col: 20 });
    expect(_getErrorLineInfo(diagnostics[2], lineStarts)).toEqual({ line: 7, col: 7 });
  });

  it('works at last line of file', () => {
    expect(_getErrorLineInfo({ start: 615, messageText: 'fake', code: 0, category: 1 }, lineStarts)).toEqual({ line: 22, col: 2 });
  });
});

describe('_getErrorMessages', () => {
  it('works', () => {
    expect(_getErrorMessages(diagnostics, example)).toEqual([
      "Line 1 - Cannot find module 'react'. (TS2307)",
      "Line 5 - Cannot find namespace 'JSX'. (TS2503)",
      "Line 7 - JSX element implicitly has type 'any'. (TS7026)"
    ]);
  });

  it('works with object messageText', () => {
    const { messageText, code, ...rest } = diagnostics[0];
    const diagnostic = { ...rest, code: 0, messageText: { messageText: messageText as string, code } };
    expect(_getErrorMessages([diagnostic], example)).toEqual(["Line 1 - Cannot find module 'react'. (TS2307)"]);
  });
});

describe('_supportedPackageToGlobalMap', () => {
  it('works', () => {
    expect(_supportedPackageToGlobalMap(SUPPORTED_PACKAGES)).toEqual({
      'office-ui-fabric-react': 'Fabric',
      '@uifabric/foundation': 'Fabric',
      '@uifabric/icons': 'Fabric',
      '@uifabric/merge-styles': 'Fabric',
      '@uifabric/styling': 'Fabric',
      '@uifabric/utilities': 'Fabric',
      '@uifabric/react-hooks': 'FabricReactHooks',
      '@uifabric/example-data': 'FabricExampleData'
    });
  });

  it('is memoized', () => {
    const result1 = _supportedPackageToGlobalMap(SUPPORTED_PACKAGES);
    const result2 = _supportedPackageToGlobalMap(SUPPORTED_PACKAGES);
    expect(result1).toBe(result2);

    const result3 = _supportedPackageToGlobalMap([{ globalName: 'Foo', packages: [{ packageName: 'foo' }] }]);
    expect(result3).not.toEqual(result2);
  });
});
