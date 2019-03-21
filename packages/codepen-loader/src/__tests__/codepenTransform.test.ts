import { transform } from '../codepenTransform';
import * as fs from 'fs';
import * as path from 'path';

describe('exampleData', () => {
  it('contains all expected interfaces', () => {
    // This test is protection against interfaces/functions being split out from
    // office-ui-fabric-react/src/utilities/exampleData.ts without the loader also being updated.
    const filename = path.resolve(__dirname, '../../lib/exampleData.ts');
    const exampleData = fs.readFileSync(filename).toString();
    expect(exampleData).toContain('export interface IExampleItem');
    expect(exampleData).toContain('export function createListItems');
    expect(exampleData).toContain('export function createGroups');
    expect(exampleData).toContain('export function lorem');
    expect(exampleData).toContain('export function isGroupable');
  });
});

describe('codepen transform', () => {
  function testFile(file: string): void {
    const filename = path.resolve(__dirname, './examples/' + file);
    const fileContents = fs.readFileSync(filename).toString();
    const transformResult = transform(fileContents);
    expect(transformResult).toMatchSnapshot();
  }

  it('handles examples with function components', () => {
    testFile('function.txt');
  });

  it('handles examples with class components', () => {
    testFile('class.txt');
  });

  it('handles examples importing exampleData', () => {
    testFile('exampleData.txt');
  });
});
