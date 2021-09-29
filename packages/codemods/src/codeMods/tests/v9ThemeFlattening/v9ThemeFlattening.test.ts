import { Project } from 'ts-morph';
import v9ThemeFlattening from '../../mods/v9ThemeFlattening/v9ThemeFlattening.mod';

describe('v9: Theme flattening', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/v9/**/*.ts`);
  });

  it('can work on the dropdown example', () => {
    const file = project.getSourceFileOrThrow('mMakeStylesDeep.ts');
    v9ThemeFlattening.run(file);

    console.log(file.getText());
  });
});
