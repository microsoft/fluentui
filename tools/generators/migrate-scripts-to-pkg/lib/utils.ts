// use this module to define any kind of generic utilities that are used in more than 1 place within the generator implementation

import { joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';

export function dummyHelper() {
  return;
}

export function findUpTree(tree: Tree, fileName: string, start: string, stop = '.') {
  let currentDirname = path.dirname(start);

  let foundPath: string | undefined;

  while (currentDirname !== stop) {
    const pathToLookFor = joinPathFragments(currentDirname, fileName);

    if (tree.exists(pathToLookFor)) {
      foundPath = pathToLookFor;
      break;
    }

    currentDirname = path.dirname(currentDirname);
  }

  return foundPath;
}
