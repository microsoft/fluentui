// @ts-check

const fs = require('fs');
const path = require('path');
const { createProjectGraphAsync, logger } = require('@nx/devkit');

/**
 * Validates package dependency layer boundaries.
 * See docs/architecture/layers.md for the layer model.
 *
 * Layer hierarchy (dependencies may only flow downward):
 *   Tier 4: Barrel (@fluentui/react-components)
 *   Tier 3: Component packages (react-button, react-dialog, etc.)
 *   Tier 2: Foundation (react-utilities, react-theme, react-shared-contexts, etc.)
 *   Tier 1: Core (@griffel/react, @fluentui/tokens, etc.)
 *
 * Key rule: Tier 3 packages must NOT depend on other Tier 3 packages.
 */

const REACT_COMPONENTS_DIR = path.resolve(__dirname, '../../../packages/react-components');

// Tier 2: Foundation packages that component packages ARE allowed to depend on
const FOUNDATION_PACKAGES = new Set([
  '@fluentui/react-utilities',
  '@fluentui/react-utilities-compat',
  '@fluentui/react-theme',
  '@fluentui/react-shared-contexts',
  '@fluentui/react-tabster',
  '@fluentui/react-positioning',
  '@fluentui/react-portal',
  '@fluentui/react-portal-compat',
  '@fluentui/react-portal-compat-context',
  '@fluentui/react-overflow',
  '@fluentui/react-context-selector',
  '@fluentui/react-aria',
  '@fluentui/react-icons-compat',
  '@fluentui/react-jsx-runtime',
  '@fluentui/react-motion',
  '@fluentui/react-motion-components-preview',
  '@fluentui/react-provider',
  '@fluentui/react-virtualizer',
  '@fluentui/tokens',
  '@griffel/react',
  '@griffel/core',
]);

// Tier 4: Barrel package
const BARREL_PACKAGE = '@fluentui/react-components';

// Packages that are not component packages (build tools, migrations, etc.)
const NON_COMPONENT_PACKAGES = new Set([
  '@fluentui/react-conformance-griffel',
  '@fluentui/react-migration-v0-v9',
  '@fluentui/react-migration-v8-v9',
  '@fluentui/react-storybook-addon',
  '@fluentui/react-storybook-addon-export-to-sandbox',
  '@fluentui/react-theme-sass',
]);

main()
  .catch(err => {
    logger.error(err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });

async function main() {
  const graph = await createProjectGraphAsync();

  // Build a set of all v9 component package names (Tier 3)
  /** @type {Set<string>} */
  const componentPackages = new Set();

  const reactComponentsDirs = fs.readdirSync(REACT_COMPONENTS_DIR).filter(name => {
    const pkgJsonPath = path.join(REACT_COMPONENTS_DIR, name, 'library', 'package.json');
    // Also check root-level package.json for packages without library/ structure
    const rootPkgJsonPath = path.join(REACT_COMPONENTS_DIR, name, 'package.json');
    return fs.existsSync(pkgJsonPath) || fs.existsSync(rootPkgJsonPath);
  });

  for (const dir of reactComponentsDirs) {
    let pkgJsonPath = path.join(REACT_COMPONENTS_DIR, dir, 'library', 'package.json');
    if (!fs.existsSync(pkgJsonPath)) {
      pkgJsonPath = path.join(REACT_COMPONENTS_DIR, dir, 'package.json');
    }
    if (!fs.existsSync(pkgJsonPath)) {
      continue;
    }

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const pkgName = pkgJson.name;

    if (
      pkgName &&
      pkgName !== BARREL_PACKAGE &&
      !FOUNDATION_PACKAGES.has(pkgName) &&
      !NON_COMPONENT_PACKAGES.has(pkgName)
    ) {
      componentPackages.add(pkgName);
    }
  }

  /** @type {string[]} */
  const violations = [];

  // Check each component package's dependencies
  for (const [projectName, deps] of Object.entries(graph.dependencies)) {
    // Find the npm package name for this project
    const projectNode = graph.nodes[projectName];
    if (!projectNode) {
      continue;
    }

    const projectRoot = projectNode.data.root;
    if (!projectRoot || !projectRoot.includes('react-components')) {
      continue;
    }

    // Skip stories projects
    if (projectRoot.includes('/stories')) {
      continue;
    }

    // Check if this is a component package
    let pkgJsonPath = path.join(path.resolve(__dirname, '../../..'), projectRoot, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) {
      continue;
    }

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const pkgName = pkgJson.name;

    if (!componentPackages.has(pkgName)) {
      continue;
    }

    // Check this component's dependencies for other component packages
    for (const dep of deps) {
      const target = dep.target;

      // Only check workspace (non-npm) dependencies
      if (target.startsWith('npm:')) {
        continue;
      }

      // Find the target's package name
      const targetNode = graph.nodes[target];
      if (!targetNode) {
        continue;
      }

      const targetRoot = targetNode.data.root;
      if (!targetRoot) {
        continue;
      }

      const targetPkgJsonPath = path.join(path.resolve(__dirname, '../../..'), targetRoot, 'package.json');
      if (!fs.existsSync(targetPkgJsonPath)) {
        continue;
      }

      const targetPkgJson = JSON.parse(fs.readFileSync(targetPkgJsonPath, 'utf-8'));
      const targetPkgName = targetPkgJson.name;

      if (componentPackages.has(targetPkgName)) {
        violations.push(
          `${pkgName} depends on ${targetPkgName} — component packages (Tier 3) must not depend on other component packages. See docs/architecture/layers.md`,
        );
      }
    }
  }

  if (violations.length > 0) {
    console.error(`\n🚨 Layer boundary violations found (${violations.length}):\n`);
    for (const v of violations) {
      console.error(`  - ${v}`);
    }
    console.error('\nSee docs/architecture/layers.md for the dependency layer model.');
    process.exit(1);
  }

  console.log(`✅ No layer boundary violations found (checked ${componentPackages.size} component packages)`);
}
