const graphviz = require('graphviz');
const parser = require('dotparser');
const readFileSync = require('fs').readFileSync;
const spawnSync = require('child_process').spawnSync;
const findGitRoot = require('../monorepo/index').findGitRoot;
const path = require('path');
const argv = require('yargs').argv;

const dotFilePath = path.resolve(__dirname, 'repo-graph.dot');
const ignoreDevDependencies = [
  '@fluentui/set-version',
  '@fluentui/react-conformance',
  '@fluentui/test-utilities',
  '@fluentui/eslint-plugin',
  '@fluentui/a11y-testing',
  '@fluentui/jest-serializer-merge-styles',
  '@fluentui/scripts',
];

/**
 * Pick a package in the repository and generate its dependency graph
 *
 * For this utility to work you will actually need to install graphviz on your machine
 * http://www.graphviz.org
 */
function main() {
  if (!argv.root) {
    throw new Error('A root package name should be provided');
  }

  const rootPackage = `@fluentui/${argv.root}`;

  // if dev dependencies should be added
  const includeDevDependencies = argv['include-dev'];
  if (includeDevDependencies) {
    ignoreDevDependencies.splice(0, ignoreDevDependencies.length);
  }

  _generateGraphforRepo(dotFilePath);
  const graph = _parseDotFile(dotFilePath);
  const subTree = _getSubTree(graph, rootPackage);

  subTree.setGraphVizPath(argv.graphVisPath || '/usr/bin');
  const pngOuputFile = path.resolve(__dirname, `${argv.root}.png`);

  subTree.output('png', pngOuputFile);
}

/**
 * Generates a dependency graph of the entire repo as a dotfile
 * For this function to work you will actually need to install graphviz on your machine
 * http://www.graphviz.org
 *
 * @param {string} outputPath the output path of the dot file
 */
function _generateGraphforRepo(outputPath) {
  const lernaDependencyGraphArgs = [`--outputPath ${outputPath}`];
  // The package uses a shebang with windows line endings, call node on the entrypoint directly to avoid issues
  const lernaDependencyGraphEntry = path.resolve(findGitRoot(), 'node_modules/lerna-dependency-graph/lib/index.js');

  const result = spawnSync(`node ${lernaDependencyGraphEntry}`, lernaDependencyGraphArgs, {
    cwd: findGitRoot(),
    shell: true,
    stdio: 'inherit',
  });

  if (result.status) {
    throw new Error(
      (result.error && result.error.stack) || `failed to run lerna-dependency-graph with status ${result.status}`,
    );
  }
}

/**
 * Returns an graphviz instance of a parsed dotfile
 * Assumes one graph only in the dotfile
 *
 * @param {string} pathToDotFile
 */
function _parseDotFile(pathToDotFile) {
  const content = readFileSync(pathToDotFile);
  const graph = graphviz.digraph('G');
  const parsed = parser(content.toString());

  const items = parsed[0].children;
  items.forEach(item => {
    if (item.type === 'node_stmt') {
      graph.addNode(item.node_id.id);
    } else {
      graph.addEdge(item.edge_list[0].id, item.edge_list[1].id);
    }
  });

  return graph;
}

/**
 *
 * @param {graphviz graph} graph The original graph
 * @param {*} rootPackage The id of the root package/node in the original graph
 */
function _getSubTree(graph, rootPackage) {
  const nodesToProcess = [rootPackage];
  const subTree = graphviz.graph('G');

  // Dedupe bidirectional edges
  const resEdges = new Set();

  let i = 0;
  while (i < nodesToProcess.length) {
    const currentNode = nodesToProcess[i];
    subTree.addNode(currentNode);
    const { edges, children } = _getEdgesAndChildren(graph, currentNode);

    children.forEach(child => nodesToProcess.push(child));

    edges.forEach(edge => resEdges.add(`${edge.nodeOne.id},${edge.nodeTwo.id}`));

    i++;
  }

  const edgeIterator = resEdges.values();
  while ((value = edgeIterator.next().value)) {
    const edge = value.split(',');
    subTree.addEdge(edge[0], edge[1]);
  }
  return subTree;
}

/**
 * Function that returns all edges and children for a node
 * @param {graphviz graph} graph
 * @param {string} node id of the node
 */
function _getEdgesAndChildren(graph, node) {
  const edges = [];
  const children = [];
  graph.edges.forEach(edge => {
    if (ignoreDevDependencies.includes(edge.nodeOne.id) || ignoreDevDependencies.includes(edge.nodeTwo.id)) {
      return;
    }

    if (edge.nodeOne.id === node) {
      edges.push(edge);
      children.push(edge.nodeTwo.id);
    }
  });

  return { edges, children };
}

main();
