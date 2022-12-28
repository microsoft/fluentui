import { Tree, writeJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { dummyHelper, findUpTree } from './utils';

describe(`utils`, () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });
  it(`should behave...`, () => {
    expect(dummyHelper()).toBe(undefined);
  });

  it(`should findUp tree`, () => {
    function setup() {
      tree.write('packages/one/config/hello.txt', '');
      tree.write('packages/one/src/index.txt', '');
      tree.write('packages/one/config.txt', '');
      writeJson(tree, 'packages/one/package.json', {});

      tree.write('packages/no-pkg/hello.txt', '');
      tree.write('packages/no-pkg/src/index.txt', '');
    }

    setup();

    let found = findUpTree(tree, 'package.json', 'packages/one/config/hello.txt');
    expect(found).toBe('packages/one/package.json');

    found = findUpTree(tree, 'package.json', 'packages/one/src/index.txt');
    expect(found).toBe('packages/one/package.json');

    found = findUpTree(tree, 'package.json', 'packages/one/config.txt');
    expect(found).toBe('packages/one/package.json');

    let notFound = findUpTree(tree, 'package.json', 'packages/no-pkg/hello.txt');
    expect(notFound).toBe(undefined);

    notFound = findUpTree(tree, 'package.json', 'packages/no-pkg/src/index.txt');
    expect(notFound).toBe(undefined);
  });
});
