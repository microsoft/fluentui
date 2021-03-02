import { Project } from 'ts-morph';
import { runMods } from '../../../modRunner/runnerUtilities';
import { CodeMod } from '../../types';
/* This is a TEST file for developers to try out their config-based codemods. */

//const DropdownPropsFile = 'mDropdownProps.tsx';

describe('Tests a simple data-driven codeMod', () => {
  let project: Project;

  /* Before you test, add the desired source file to your project! */
  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/*.tsx`);
  });

  it('can run all mods in upgrades.json successfully', () => {
    /* Run and test your codemod here! */
    const codemodArray: CodeMod[] = []; // TODO: Add your own codemod array!
    runMods(
      codemodArray,
      project.getSourceFiles(),
      () => null,
      result => {
        result.result.resolve(
          v => {
            console.log(`Upgraded file ${result.file.getBaseName()} with mod ${result.mod.name}`, v.logs);
          },
          e => {
            console.warn(
              `Mod ${result.mod.name} did not run on file ${result.file.getBaseName()} for: `,
              'error' in e ? e.error : e.logs,
            );
          },
        );
      },
    );
  });
});
