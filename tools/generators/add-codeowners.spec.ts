import { Tree, addProjectConfiguration, stripIndents } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { addCodeowner } from './add-codeowners';
import { setupCodeowners } from '../utils-testing';
import { workspacePaths } from '../utils';

describe(`#addCodeowner`, () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(tree, '@proj/react-one', {
      root: '/packages/react-one',
      projectType: 'library',
      sourceRoot: '/packages/react-one/src',
      targets: {},
    });
    addProjectConfiguration(tree, '@proj/react-two', {
      root: '/packages/react-two',
      projectType: 'library',
      sourceRoot: '/packages/react-two/src',
      targets: {},
    });
    addProjectConfiguration(tree, '@proj/react-three', {
      root: '/packages/react-three',
      projectType: 'library',
      sourceRoot: '/packages/react-three/src',
      targets: {},
    });
  });

  it(`should throw if no CODEOWNER exists`, () => {
    expect(() => {
      addCodeowner(tree, { packageName: '@proj/react-three', owner: '@org/team-three' });
    }).toThrowErrorMatchingInlineSnapshot(`"CODEOWNERS doesn't exists"`);
  });

  it(`should throw if NX placeholder is missing`, () => {
    createCodeowners(tree, { withPlaceholder: false });
    expect(() => {
      addCodeowner(tree, { packageName: '@proj/react-three', owner: '@org/team-three' });
    }).toThrowErrorMatchingInlineSnapshot(`"CODEOWNERS is missing '# <%= NX-CODEOWNER-PLACEHOLDER %>' placeholder"`);
  });

  it(`should add codeowner`, () => {
    createCodeowners(tree);

    expect(tree.read(workspacePaths.github.codeowners, 'utf8')).toMatchInlineSnapshot(`
      "/packages/react-one @org/team-one
      /packages/react-one @org/team-two
      # <%= NX-CODEOWNER-PLACEHOLDER %>"
    `);

    addCodeowner(tree, { packageName: '@proj/react-three', owner: '@org/team-three' });

    expect(tree.read(workspacePaths.github.codeowners, 'utf8')).toMatchInlineSnapshot(`
      "/packages/react-one @org/team-one
      /packages/react-one @org/team-two
      /packages/react-three @org/team-three
      ## <%= NX-CODEOWNER-PLACEHOLDER %>
      "
    `);
  });
});

function createCodeowners(tree: Tree, options: { withPlaceholder?: boolean } = {}) {
  setupCodeowners(tree, {
    content: stripIndents`
     /packages/react-one @org/team-one
      /packages/react-one @org/team-two
     `,
    ...options,
  });
}
