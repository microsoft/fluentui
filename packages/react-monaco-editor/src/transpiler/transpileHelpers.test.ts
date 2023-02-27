import fs from 'fs';
import path from 'path';
import { _getLineStarts, _getErrorLineInfo, _getErrorMessages, _supportedPackageToGlobalMap } from './transpileHelpers';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';
import type { IDiagnostic } from './transpileHelpers';

// Real diagnostics copied from loading ./examples/class.txt in the editor while type checking wasn't set up
const exampleLines = fs.readFileSync(path.join(__dirname, 'examples/class.txt')).toString().split(/\r?\n/g);
const example = exampleLines.join('\n');
const exampleCRLF = exampleLines.join('\r\n');
const diagnostics: IDiagnostic[] = [
  { start: 23, length: 7, messageText: "Cannot find module 'react'.", code: 2307, category: 1 },
  { start: 192, length: 3, messageText: "Cannot find namespace 'JSX'.", code: 2503, category: 1 },
  { start: 225, length: 32, messageText: "JSX element implicitly has type 'any'.", code: 7026, category: 1 },
];
const lineStarts = [
  0,
  32,
  93,
  94,
  166,
  199,
  212,
  251,
  271,
  298,
  336,
  354,
  374,
  393,
  452,
  511,
  570,
  581,
  594,
  601,
  605,
  607,
];
const lineStartsCRLF = [
  0,
  33,
  95,
  97,
  170,
  204,
  218,
  258,
  279,
  307,
  346,
  365,
  386,
  406,
  466,
  526,
  586,
  598,
  612,
  620,
  625,
  628,
];

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
    expect(_getErrorLineInfo(diagnostics[0], lineStarts)).toMatchInlineSnapshot(`
      Object {
        "col": 24,
        "line": 1,
      }
    `);
    expect(_getErrorLineInfo(diagnostics[1], lineStarts)).toMatchInlineSnapshot(`
      Object {
        "col": 27,
        "line": 5,
      }
    `);
    expect(_getErrorLineInfo(diagnostics[2], lineStarts)).toMatchInlineSnapshot(`
      Object {
        "col": 14,
        "line": 7,
      }
    `);
  });

  it('works at last line of file', () => {
    expect(_getErrorLineInfo({ start: 615, messageText: 'fake', code: 0, category: 1 }, lineStarts))
      .toMatchInlineSnapshot(`
      Object {
        "col": 9,
        "line": 22,
      }
    `);
  });
});

describe('_getErrorMessages', () => {
  it('works', () => {
    expect(_getErrorMessages(diagnostics, example)).toEqual([
      "Line 1 - Cannot find module 'react'. (TS2307)",
      "Line 5 - Cannot find namespace 'JSX'. (TS2503)",
      "Line 7 - JSX element implicitly has type 'any'. (TS7026)",
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
    expect(_supportedPackageToGlobalMap(SUPPORTED_PACKAGES)).toMatchInlineSnapshot(`
      Object {
        "@fluentui/date-time-utilities": "FluentUIReact",
        "@fluentui/dom-utilities": "FluentUIReact",
        "@fluentui/example-data": "FluentUIExampleData",
        "@fluentui/font-icons-mdl2": "FluentUIReact",
        "@fluentui/foundation-legacy": "FluentUIReact",
        "@fluentui/merge-styles": "FluentUIReact",
        "@fluentui/react": "FluentUIReact",
        "@fluentui/react-focus": "FluentUIReact",
        "@fluentui/react-hooks": "FluentUIReactHooks",
        "@fluentui/react-window-provider": "FluentUIReact",
        "@fluentui/style-utilities": "FluentUIReact",
        "@fluentui/theme": "FluentUIReact",
        "@fluentui/utilities": "FluentUIReact",
      }
    `);
  });

  it('is memoized', () => {
    const result1 = _supportedPackageToGlobalMap(SUPPORTED_PACKAGES);
    const result2 = _supportedPackageToGlobalMap(SUPPORTED_PACKAGES);
    expect(result1).toBe(result2);

    const result3 = _supportedPackageToGlobalMap([{ globalName: 'Foo', packages: [{ packageName: 'foo' }] }]);
    expect(result3).not.toEqual(result2);
  });
});
