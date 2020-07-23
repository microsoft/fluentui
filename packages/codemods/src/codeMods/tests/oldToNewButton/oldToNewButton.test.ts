import { Project } from 'ts-morph';
import { findJsxTag, renameProp } from '../../utilities';
const buttonPath = '/**/tests/mock/**/button/**/*.tsx';

describe('Persona props mod tests', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}${buttonPath}`);
  });
  it('can rename the toggled feature in Button', () => {
    const file = project.getSourceFileOrThrow('mButtonProps.tsx');
    //renameImport(file, 'toggled', 'checked');
    const tags = findJsxTag(file, 'Button');
    renameProp(tags, 'toggled', 'checked');
    tags.forEach(val => {
      expect(val.getAttribute('toggled')).not.toBeTruthy();
    });
    console.log(file);
  });
});
