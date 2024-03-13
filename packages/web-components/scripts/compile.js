/* eslint-disable no-undef */
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, '..');

main();

function compile() {
  const packageJsonPath = path.join(root, 'package.json');
  const tsConfigLibPath = path.join(root, 'tsconfig.lib.json');
  const tsConfigSpecPath = path.join(root, 'tsconfig.spec.json');

  const tsConfigLib = JSON.parse(fs.readFileSync(tsConfigLibPath, 'utf-8'));
  const tsConfigSpec = JSON.parse(fs.readFileSync(tsConfigSpecPath, 'utf-8'));
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const modifiedTsConfigLib = overrideTsConfig({ ...tsConfigLib });
  const modifiedTsConfigSpec = overrideTsConfig({ ...tsConfigSpec });

  const tempTsconfigLibPath = path.join(root, 'tsconfig.lib-generated.json');
  const tempTsconfigSpecPath = path.join(root, 'tsconfig.spec-generated.json');

  fs.writeFileSync(tempTsconfigLibPath, JSON.stringify(modifiedTsConfigLib, null, 2), 'utf-8');
  fs.writeFileSync(tempTsconfigSpecPath, JSON.stringify(modifiedTsConfigSpec, null, 2), 'utf-8');

  const workspaceDependencies = Object.keys(packageJson.dependencies).filter(depName =>
    depName.startsWith('@fluentui/'),
  );

  try {
    console.log(chalk.bold(`🎬 compile:start`));

    console.log(chalk.blueBright(`compile: building workspace dependencies: ${workspaceDependencies}`));
    execSync(`lage build --to ${workspaceDependencies}`, { stdio: 'inherit' });

    console.log(chalk.blueBright(`compile: generating design tokens`));
    execSync(`node ./scripts/generate-tokens.cjs`, { stdio: 'inherit' });

    console.log(chalk.blueBright(`compile: running tsc`));
    execSync(`tsc -p tsconfig.lib-generated.json`, { stdio: 'inherit' });
    execSync(`tsc -p tsconfig.spec-generated.json`, { stdio: 'inherit' });

    console.log(chalk.bold(`🏁 compile:end`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    fs.unlinkSync(tempTsconfigLibPath);
    fs.unlinkSync(tempTsconfigSpecPath);
  }
}

/**
 *
 * @param {Record<string,any>} config
 */
function overrideTsConfig(config) {
  config.compilerOptions.paths = {};
  config.compilerOptions.rootDir = './src';
  return config;
}

function main() {
  compile();
}
