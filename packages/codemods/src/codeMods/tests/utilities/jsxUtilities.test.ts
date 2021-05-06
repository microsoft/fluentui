import { findJsxTag, renameImport } from '../../utilities';
import { Project } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/*.tsx`);
const fileName = 'mockFunction.tsx';

describe('JSX Utilities Test', () => {
  it('can find a regular jsx tag', () => {
    const tag = findJsxTag(project.getSourceFileOrThrow(fileName), 'JSXFunctionalNormalTag');
    expect(tag.length).toEqual(1);
  });

  it('can find a self closing jsx tag', () => {
    const tag = findJsxTag(project.getSourceFileOrThrow(fileName), 'JSXFunctionalSelfClosingTag');
    expect(tag.length).toEqual(1);
  });

  it('can replace a tag', () => {
    const file = project.getSourceFileOrThrow(fileName);
    renameImport(file, 'ToImport', 'Renamed');
    expect(file.getText().indexOf('ToImport')).toBe(-1);
  });
});
