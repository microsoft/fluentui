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
    const result = transformFile('exampleData.txt');
    expect(result).toMatchSnapshot();
  });
});
