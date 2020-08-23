import { Project } from 'ts-morph';
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
  });
});
