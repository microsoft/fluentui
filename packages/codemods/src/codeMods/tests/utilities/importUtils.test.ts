import { getImportsByPath, repathImport } from '../../utilities';
import { Err, Ok } from '../../../helpers/result';
import { Project, ImportDeclaration } from 'ts-morph';
import { NoOp } from '../../types';

const fileName = 'mockImports.tsx';
const rootPath = 'office-ui-fabric-react';
const buttonPath = `${rootPath}/lib/Button`;

describe('Import Utilities test', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/utils/*.tsx`);
  });

  it('can find import based on exact string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const tag = getImportsByPath(file, buttonPath)
      .then(v => v[0].getModuleSpecifierValue())
      .okOrElse('Error');
    expect(tag).toEqual(buttonPath);
  });

  it('only finds exact matches', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imp = getImportsByPath(file, rootPath)
      .then(v => v.length)
      .okOrElse(-1);
    expect(imp).toEqual(0);
  });

  it('can find a single import based on a regex string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imp = getImportsByPath(file, /office\-ui\-fabric\-react.+Button/)
      .chain(v => {
        if (v.length !== 1) {
          return Err<ImportDeclaration, NoOp>({ logs: ['wrong number of results'] });
        }
        return Ok(v[0]);
      })
      .resolve(
        v => v.getModuleSpecifierValue(),
        () => 'error',
      );
    expect(imp).toEqual(buttonPath);
  });

  it('can find all imports based on a regex string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imps = getImportsByPath(file, /office\-ui\-fabric\-react/)
      .chain(v => {
        return v.length > 1 ? Ok(v) : Err<ImportDeclaration[], NoOp>({ logs: ['too few values returned'] });
      })
      .then(v => v.map(i => i.getModuleSpecifierValue()))
      .resolveOk(() => ['error']);
    imps.forEach(imp => {
      expect(imp).toContain(rootPath);
    });
  });

  it('can replace an import path', () => {
    const replacementString = 'Complete/NewPath';
    const file = project.getSourceFileOrThrow(fileName);
    getImportsByPath(file, /office\-ui\-fabric\-react/)
      .then(v => v[0])
      .then(v => repathImport(v, replacementString));
    expect(
      file.getImportStringLiterals().some(val => {
        return val.getLiteralValue() === replacementString;
      }),
    ).toBe(true);
  });

  it('can replace a partial import path', () => {
    const replacementRegex = /office\-ui\-fabric\-react/;
    const file = project.getSourceFileOrThrow(fileName);
    getImportsByPath(file, /office\-ui\-fabric\-react/)
      .then(v => v.shift()!)
      .then(v => repathImport(v, 'NewPath', replacementRegex));
    expect(
      file.getImportStringLiterals().some(val => {
        return val.getLiteralValue() === 'NewPath/lib/Button';
      }),
    ).toBe(true);
  });
});
