const graphviz = require('graphviz');
const parser = /** @type {typeof import('dotparser')['default']}*/ (/** @type {unknown} */ (require('dotparser')));
const { readFileSync } = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');
const yargs = require('yargs');

/** @typedef {import('yargs').Arguments<{root:string;'include-dev'?:string;'graphviz-path'?:string}>} CliArgs */

const { findGitRoot, getDependencies } = require('../monorepo');

const dotFilePath = path.resolve(__dirname, 'repo-graph.dot');
/**
 * @type {string[]}
 */
let ignoreDevDependencies = [];

/**
 * Pick a package in the repository and generate its dependency graph
 *
 * For this utility to work you will actually need to install graphviz on your machine
 * http://www.graphviz.org
 * @param {CliArgs} argv
 */
async function main(argv) {
  if (!argv.root) {
    throw new Error('A root package name should be provided');
  }

  const rootPackage = `@fluentui/${argv.root}`;

  // if dev dependencies should be added
  const includeDevDependencies = argv['include-dev'];
  if (!includeDevDependencies) {
    ignoreDevDependencies = await getDependencies(rootPackage, { dev: true });
  }

  _generateGraphforRepo(dotFilePath);
  const graph = _parseDotFile(dotFilePath);
  const subTree = _getSubTree(graph, rootPackage);

  if (process.platform === 'win32') {
    throw new Error('--graphvis-path argument is required for windows users');
  }

  subTree.setGraphVizPath(argv['graphviz-path'] || '/usr/bin');
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
  const lernaDependencyGraphEntry = path.resolve(findGitRoot(), require.resolve('lerna-dependency-graph/lib/index.js'));

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
      graph.addNode(String(item.node_id.id));
    } else {
      // @ts-expect-error - edge_list doesn't exist  on type definition - is this a bug ?
      graph.addEdge(item.edge_list[0].id, item.edge_list[1].id, { dir: 'forward' });
    }
  });

  return graph;
}

/**
 *
 * @param {import("graphviz").Graph} graph The original graph
 * @param {string} rootPackage The id of the root package/node in the original graph
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

  let value;
  const edgeIterator = resEdges.values();
  while ((value = edgeIterator.next().value)) {
    const edge = value.split(',');
    subTree.addEdge(edge[0], edge[1], { dir: 'forward' });
  }
  return subTree;
}

/**
 * Function that returns all edges and children for a node
 * @param {import("graphviz").Graph} graph
 * @param {string} node id of the node
 */
function _getEdgesAndChildren(graph, node) {
  /** @type any[] */
  const edges = [];
  /** @type any[] */
  const children = [];
  // @ts-expect-error - edges prop doesn't exist on typings - wrong typings ?
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

yargs
  .scriptName('dependency-graph-generator')
  .usage('$0 [args]')
  .command(
    '$0',
    'Generates dependency graphs for packages in the repo',
    yargs => {
      yargs
        .positional('root', {
          type: 'string',
          describe: 'The name of the root package in the dependency tree, without the `@fluentui/` prefix',
          demandOption: true,
        })
        .positional('include-dev', {
          type: 'boolean',
          description: 'Adds ignored dev dependencies to the tree',
        })
        .positional('graphviz-path', {
          type: 'string',
          description: 'The path to graphviz which needs to be installed, required for windows users',
        });
    },
    async argv => await main(/** @type {CliArgs}*/ (argv)),
  )
  .demand('root')
  .help().argv;
