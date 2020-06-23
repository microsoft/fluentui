import { utilities } from '../../../utilities/utilities';
import { Project } from 'ts-morph';

const fileName = 'mockImports.tsx';
const rootPath = 'office-ui-fabric-react';
const buttonPath = `${rootPath}/lib/Button`;

describe('Import Utilities test', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/__tests__/mock/utils/*.tsx`);
  });

  it('can find import based on exact string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const tag = utilities.getImportsByPath(file, buttonPath);
    expect(tag).toBeTruthy();
    expect(tag![0].getModuleSpecifierValue()).toEqual(buttonPath);
  });

  it('only finds exact matches', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imp = utilities.getImportsByPath(file, rootPath);
    expect(imp.length).toEqual(0);
  });

  it('can find a single import based on a regex string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imp = utilities.getImportsByPath(file, /office\-ui\-fabric\-react.+Button/);
    expect(imp).toBeTruthy();
    expect(imp?.length).toEqual(1);
    expect(imp![0].getModuleSpecifierValue()).toEqual(buttonPath);
  });

  it('can find all imports based on a regex string match', () => {
    const file = project.getSourceFileOrThrow(fileName);
    const imps = utilities.getImportsByPath(file, /office\-ui\-fabric\-react/);
    expect(imps).toBeTruthy();
    expect(imps?.length).toBeGreaterThan(1);
    imps!.forEach(imp => {
      expect(imp.getModuleSpecifierValue()).toContain(rootPath);
    });
  });

  it('can replace an import path', () => {
    const replacementString = 'Complete/NewPath';
    const file = project.getSourceFileOrThrow(fileName);
    const imps = utilities.getImportsByPath(file, /office\-ui\-fabric\-react/);

    utilities.repathImport(imps![0], replacementString);
    expect(
      file.getImportStringLiterals().some(val => {
        return val.getLiteralValue() === replacementString;
      }),
    ).toBe(true);
  });

  it('can replace a partial import path', () => {
    const replacementRegex = /office\-ui\-fabric\-react/;
    const file = project.getSourceFileOrThrow(fileName);
    const imps = utilities.getImportsByPath(file, /office\-ui\-fabric\-react/);

    utilities.repathImport(imps![0], 'NewPath', replacementRegex);
    expect(
      file.getImportStringLiterals().some(val => {
        return val.getLiteralValue() === 'NewPath/lib/Button';
      }),
    ).toBe(true);
  });
});
