import fs from 'fs';
import path from 'path';
import { IDiagnostic, _getLineStarts, _getErrorLineInfo, _getErrorMessages } from './helpers';

// Real diagnostics copied from loading ./examples/class.txt in the editor while type checking wasn't set up
const example = fs.readFileSync(path.join(__dirname, 'examples/class.txt')).toString();
const diagnostics: IDiagnostic[] = [
  { start: 23, length: 7, messageText: "Cannot find module 'react'.", code: 2307, category: 1 },
  { start: 192, length: 3, messageText: "Cannot find namespace 'JSX'.", code: 2503, category: 1 },
  { start: 225, length: 32, messageText: "JSX element implicitly has type 'any'.", code: 7026, category: 1 }
];
const lineStarts = [0, 32, 100, 101, 173, 206, 219, 258, 278, 305, 343, 361, 381, 400, 459, 518, 577, 588, 601, 608, 612, 614];

describe('_getLineStarts', () => {
  it('works', () => {
    expect(_getLineStarts(example)).toEqual(lineStarts);
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
