import { Project } from 'ts-morph';
import { createCodeModsFromJson } from '../../mods/configMod/configMod';
import { Maybe } from '../../../helpers/maybe';
import { runMods } from '../../../modRunner/runnerUtilities';

const buttonPath = '/**/tests/mock/**/button/**/*.tsx';
const dropDownPath = '/**/tests/mock/**/dropdown/**/*.tsx';

const basicFileName = 'mockImports.tsx';
const oldRoot = 'office-ui-fabric-react';

describe('Tests a simple data-driven codeMod', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}${buttonPath}`);
    project.addSourceFilesAtPaths(`${process.cwd()}${dropDownPath}`);
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/utils/*.tsx`);
  });

  it('can run all mods in upgrades.json successfully', () => {
    const mods = Maybe(createCodeModsFromJson());
    if (mods.something) {
      runMods(mods.value, project.getSourceFiles(), result => {
        result.result.resolve(
          v => {
            console.log(`Upgraded file ${result.file.getBaseName()} with mod ${result.mod.name}`, v.logs);
          },
          e => {
            console.warn(`Mod ${result.mod.name} did not run on file ${result.file.getBaseName()} for: `, e.reason);
          },
        );
      });
    }
    /* Test for renameProp. */
    expect(project.getSourceFile('mCompoundButtonProps.tsx')?.getFullText()).toMatchSnapshot();
    expect(project.getSourceFile('mDropdownProps.tsx')?.getFullText()).toMatchSnapshot();
    /* Test for repathImport. */
    const file = project.getSourceFileOrThrow(basicFileName);
    file.getImportStringLiterals().forEach(val => {
      const impPath = val.getLiteralValue();
      expect(impPath.indexOf(oldRoot)).not.toEqual(0);
    });
  });
});
