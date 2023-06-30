const { workspaceRoot } = require('@nrwl/devkit');
const { FsTree, flushChanges } = require('nx/src/generators/tree');

const tree = new FsTree(workspaceRoot, false);

exports.flushTreeChanges = () => flushChanges(workspaceRoot, tree.listChanges());
exports.tree = tree;
