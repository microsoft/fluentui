const { getPackages } = require('@lerna/project');
const PackageGraph = require('@lerna/package-graph');

(async function() {
  const cwd = process.cwd(); // or process.argv?
  const pkgs = await getPackages('packages/fluentui');
  const value = pkgs.filter(pkg => pkg.name === '@fluentui/react-northstar');
  const graph = new PackageGraph(pkgs, 'dependencies');
  const json = {};

  graph.forEach((node, name) => {
    json[name] = [...node.localDependencies.keys()];
  });

  console.log(JSON.stringify(json, null, 2));
})();
