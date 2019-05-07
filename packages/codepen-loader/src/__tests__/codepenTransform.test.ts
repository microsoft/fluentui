import { transform } from '../codepenTransform';
import * as fs from 'fs';
import * as path from 'path';

describe('codepen transform', () => {
  function transformFile(file: string): string {
    const filename = path.resolve(__dirname, './examples/' + file);
    const fileContents = fs.readFileSync(filename).toString();
    return transform(fileContents);
  }

  it('handles examples with function components', () => {
    const result = transformFile('function.txt');
    expect(result).toMatchSnapshot();
  });

  it('handles examples with class components', () => {
    const result = transformFile('class.txt');
    expect(result).toMatchSnapshot();
  });

  it('handles examples importing exampleData', () => {
    // Don't do a snapshot test on this file to avoid being sensitive to inconsequential changes.
    // Instead, just check for the main expected interface/functions.
    const result = transformFile('exampleData.txt');
    expect(result).toMatch(/^interface IExampleItem/m);
    expect(result).toMatch(/^function createListItems/m);
    expect(result).toMatch(/^function createGroups/m);
    expect(result).toMatch(/^function lorem/m);
    expect(result).toMatch(/^function isGroupable/m);
  });

  it('handles examples importing TestImages', () => {
    let result = transformFile('testImages.txt');
    result = shortenTestImages(result);
    expect(result).toMatchSnapshot();
  });

  it('handles examples importing PeopleExampleData', () => {
    let result = transformFile('people.txt');
    // Shorten the output and make it less sensitive to (likely inconsequential) data changes
    result = result.replace(/^(const people.*? = \[)$[\s\S]*?^(\];)$/m, '$1$2');
    result = shortenTestImages(result);
    expect(result).toMatchSnapshot();
  });
});

function shortenTestImages(result: string): string {
  return result.replace(/^(const TestImages = \{)$[\s\S]*?^(\};)$/m, '$1$2');
}
