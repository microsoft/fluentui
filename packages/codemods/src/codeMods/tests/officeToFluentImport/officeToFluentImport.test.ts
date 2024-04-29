import { Project, SourceFile } from 'ts-morph';
import RepathOfficeToFluentImports from '../../mods/officeToFluentImport/officeToFluentImport.mod';

const basicFileName = 'mockImports.tsx';
const edgeCaseFile = 'mockEdgeImports.tsx';
const newRoot = '@fluentui/react';
const oldRoot = 'office-ui-fabric-react';
const oldFabricRoot = '@uifabric';
const newFluentRoot = '@fluentui';

describe('Office to Fluent import repath tests', () => {
  const project: Project = new Project();
  project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/utils/*.tsx`);
  let file: SourceFile;

  afterEach(() => {
    file.refreshFromFileSystemSync();
  });

  it('Can remove all old paths in one file', () => {
    file = project.getSourceFileOrThrow(basicFileName);
    RepathOfficeToFluentImports.run(file);

    file.getImportStringLiterals().forEach(val => {
      const impPath = val.getLiteralValue();
      expect(impPath.indexOf(oldRoot)).not.toEqual(0);
    });
  });

  it('Can replace all old paths in one with the new root', () => {
    file = project.getSourceFileOrThrow(basicFileName);
    const oldImportList = file.getImportStringLiterals().map(val => {
      return val.getLiteralValue();
    });

    RepathOfficeToFluentImports.run(file);
    const newImpList = file.getImportStringLiterals();
    expect(newImpList.some(val => val.getLiteralValue().indexOf(newRoot) > -1)).toBe(true);
    newImpList.forEach((val, index) => {
      if (oldImportList[index] === oldRoot) {
        expect(val.getLiteralValue().indexOf(newRoot)).toBe(0);
      }
    });
  });

  it('Only Replaces paths that start with oufr', () => {
    file = project.getSourceFileOrThrow(edgeCaseFile);
    const oldImportList = file.getImportStringLiterals().map(val => {
      return val.getLiteralValue();
    });

    RepathOfficeToFluentImports.run(file);
    const newImpList = file.getImportStringLiterals();
    newImpList.forEach((val, index) => {
      const indexOfOld: number = oldImportList[index].indexOf(oldRoot);
      if (indexOfOld === 0) {
        expect(val.getLiteralValue().indexOf(newRoot)).toBe(0);
        // If the old index didn't start the path, then we should ensure
        // That this import hasn't changed
      } else if (indexOfOld > 0) {
        expect(val.getLiteralValue()).toEqual(oldImportList[index]);
      }
    });
  });

  it('Can replace all old paths in one with the new root', () => {
    file = project.getSourceFileOrThrow(basicFileName);
    const oldImportList = file.getImportStringLiterals().map(val => {
      return val.getLiteralValue();
    });

    RepathOfficeToFluentImports.run(file);
    const newImpList = file.getImportStringLiterals();
    expect(newImpList.some(val => val.getLiteralValue().indexOf(newRoot) > -1)).toBe(true);
    newImpList.forEach((val, index) => {
      if (oldImportList[index].indexOf(oldRoot) === 0) {
        expect(val.getLiteralValue().indexOf(newRoot)).toBe(0);
      }
    });
  });

  it('Replaces @uifabric with @fluentui', () => {
    file = project.getSourceFileOrThrow(basicFileName);
    const oldImportList = file.getImportStringLiterals().map(val => {
      return val.getLiteralValue();
    });

    RepathOfficeToFluentImports.run(file);
    const newImpList = file.getImportStringLiterals();
    expect(newImpList.some(val => val.getLiteralValue().indexOf(newFluentRoot) > -1)).toBe(true);
    newImpList.forEach((val, index) => {
      if (oldImportList[index].indexOf(oldFabricRoot) === 0) {
        expect(val.getLiteralValue().indexOf(newFluentRoot)).toBe(0);
      }
    });
  });

  it('Replaces old uifabric package to new package', () => {
    file = project.getSourceFileOrThrow(basicFileName);

    RepathOfficeToFluentImports.run(file);
    const newImpList = file.getImportStringLiterals();
    expect(newImpList.some(val => val.getLiteralValue().indexOf('font-icons-mdl2') > -1)).toBe(true);
  });
});
