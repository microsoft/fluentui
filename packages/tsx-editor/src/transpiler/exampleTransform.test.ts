import { transformExample } from './exampleTransform';
import * as fs from 'fs';
import * as path from 'path';

describe('example transform', () => {
  function transformFile(file: string) {
    const filename = path.resolve(__dirname, './examples/' + file);
    const fileContents = fs.readFileSync(filename).toString();
    return transformExample(fileContents, 'fake');
  }

  it('handles examples with function components', () => {
    const result = transformFile('function.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('handles examples with class components', () => {
    const result = transformFile('class.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('returns an error from relative imports', () => {
    const result = transformFile('relativeImport.txt');
    expect(result.error).toBe('error: unsupported imports');
  });
});
