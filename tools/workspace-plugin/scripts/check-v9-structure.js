// @ts-check

const fs = require('fs');
const path = require('path');

const REACT_COMPONENTS_DIR = path.resolve(__dirname, '../../../packages/react-components');

// Packages that are NOT component packages (utilities, configs, etc.)
const EXCLUDED_PACKAGES = new Set([
  'react-components', // barrel package
  'react-conformance-griffel',
  'react-context-selector',
  'react-jsx-runtime',
  'react-migration-v0-v9',
  'react-migration-v8-v9',
  'react-motion',
  'react-motion-components-preview',
  'react-overflow',
  'react-portal',
  'react-portal-compat',
  'react-portal-compat-context',
  'react-positioning',
  'react-provider',
  'react-shared-contexts',
  'react-storybook-addon',
  'react-storybook-addon-export-to-sandbox',
  'react-tabster',
  'react-theme',
  'react-theme-sass',
  'react-utilities',
  'react-utilities-compat',
  'react-aria',
  'react-icons-compat',
  'react-virtualizer',
]);

/**
 * Validates that v9 component packages follow the canonical file structure.
 * See docs/architecture/component-patterns.md for the expected pattern.
 */
function main() {
  const packages = fs
    .readdirSync(REACT_COMPONENTS_DIR)
    .filter(name => name.startsWith('react-') && !EXCLUDED_PACKAGES.has(name));

  let totalChecked = 0;
  let totalIssues = 0;
  /** @type {string[]} */
  const issues = [];

  for (const pkg of packages) {
    const librarySrc = path.join(REACT_COMPONENTS_DIR, pkg, 'library', 'src');

    if (!fs.existsSync(librarySrc)) {
      // Some packages may not have library/src yet
      continue;
    }

    const componentsDir = path.join(librarySrc, 'components');
    if (!fs.existsSync(componentsDir)) {
      continue;
    }

    const components = fs.readdirSync(componentsDir).filter(name => {
      const fullPath = path.join(componentsDir, name);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const component of components) {
      totalChecked++;
      const componentDir = path.join(componentsDir, component);
      const files = fs.readdirSync(componentDir);

      // Check required files
      const requiredPatterns = [
        { pattern: `${component}.tsx`, description: 'Component file' },
        { pattern: `${component}.types.ts`, description: 'Types file' },
        { pattern: 'index.ts', description: 'Barrel export' },
      ];

      // Styles file — must end in .styles.ts
      const hasStyles = files.some(f => f.endsWith('.styles.ts'));

      // Hook file — use<Name>.ts or use<Name>.tsx
      const hookPattern = `use${component}`;
      const hasHook = files.some(f => f.startsWith(hookPattern) && !f.includes('Styles') && (f.endsWith('.ts') || f.endsWith('.tsx')));

      // Render file — render<Name>.tsx
      const renderPattern = `render${component}`;
      const hasRender = files.some(f => f.startsWith(renderPattern) && f.endsWith('.tsx'));

      for (const { pattern, description } of requiredPatterns) {
        if (!files.includes(pattern)) {
          issues.push(`${pkg}/components/${component}: Missing ${description} (${pattern})`);
          totalIssues++;
        }
      }

      if (!hasStyles) {
        issues.push(
          `${pkg}/components/${component}: Missing styles file (use${component}Styles.styles.ts). See docs/architecture/component-patterns.md`,
        );
        totalIssues++;
      }

      if (!hasHook) {
        issues.push(
          `${pkg}/components/${component}: Missing hook file (${hookPattern}.ts or .tsx). See docs/architecture/component-patterns.md`,
        );
        totalIssues++;
      }

      if (!hasRender) {
        issues.push(
          `${pkg}/components/${component}: Missing render file (${renderPattern}.tsx). See docs/architecture/component-patterns.md`,
        );
        totalIssues++;
      }
    }
  }

  if (totalIssues > 0) {
    console.error(`\n🚨 V9 component structure issues found (${totalIssues} issues in ${totalChecked} components):\n`);
    for (const issue of issues) {
      console.error(`  - ${issue}`);
    }
    console.error(
      '\nExpected structure: docs/architecture/component-patterns.md',
    );
    process.exit(1);
  }

  console.log(`✅ All ${totalChecked} v9 components follow the canonical structure`);
}

main();
