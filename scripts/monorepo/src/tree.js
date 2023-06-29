const { workspaceRoot } = require('@nrwl/devkit');
const { FsTree } = require('nx/src/generators/tree');
const tree = new FsTree(workspaceRoot, false);

exports.tree = tree;
