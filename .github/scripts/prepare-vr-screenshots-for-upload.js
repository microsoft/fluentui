// @ts-check

const { dirname, isAbsolute, join, resolve } = require('node:path');
const {
  existsSync,
  cpSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} = require('node:fs');
const { createProjectGraphAsync } = require('@nx/devkit');

module.exports = main;

/**
 *
 * @param {import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams & {config:{projects:string[]}} } options
 * @returns
 */
async function main(options) {
  const rootDir = 'screenshots';
  const reportPath = join(rootDir, 'screenshots-report.json');
  const graph = await createProjectGraphAsync();
  const report = /** @type {{[project_name:string]:{path:string}}} */ ({});
  const files = /** @type {{source:string,destination:string}[]} */ ([]);
  const destinations = new Set();
  const directories = new Set();

  for (const project of options.config.projects) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(project)) {
      throw new Error(`Invalid screenshot project name: ${project}`);
    }

    const projectConfig = graph.nodes[project];
    if (!projectConfig) {
      throw new Error(`Screenshot project not found: ${project}`);
    }

    const metadata = projectConfig.data.metadata?.visualRegression;
    let screenshotsPath;
    let reportProject = project;

    if (project.endsWith('-vrt') || metadata) {
      const hostProject = 'vr-tests-react-components';
      const hostRoot = 'apps/vr-tests-react-components';
      const expectedPath = `${hostRoot}/dist/visual-regression/${project}/screenshots`;
      if (
        !project.endsWith('-vrt') ||
        !metadata ||
        metadata.hostProject !== hostProject ||
        metadata.hostRoot !== hostRoot ||
        metadata.screenshotsPath !== expectedPath
      ) {
        throw new Error(`Invalid visual regression metadata for ${project}`);
      }
      screenshotsPath = expectedPath;
      reportProject = hostProject;
    } else {
      const projectRoot = projectConfig.data.root;
      if (
        typeof projectRoot !== 'string' ||
        isAbsolute(projectRoot) ||
        /^[a-zA-Z]:/.test(projectRoot) ||
        projectRoot.split(/[\\/]/)[0] === rootDir ||
        projectRoot.split(/[\\/]/).some(segment => !segment || segment === '.' || segment === '..')
      ) {
        throw new Error(`Invalid screenshot project root for ${project}`);
      }
      screenshotsPath = join(projectRoot, 'dist/screenshots');
    }

    if (!existsSync(screenshotsPath)) {
      continue;
    }

    if (!lstatSync(screenshotsPath).isDirectory() || realpathSync(screenshotsPath) !== resolve(screenshotsPath)) {
      throw new Error(`Invalid screenshots directory: ${screenshotsPath}`);
    }

    const collectFiles = (folder, relativePath = '') => {
      for (const entry of readdirSync(folder, { withFileTypes: true })) {
        const filename = join(relativePath, entry.name);
        const source = join(folder, entry.name);
        if (entry.isDirectory()) {
          collectFiles(source, filename);
        } else if (entry.isFile()) {
          const destination = join(reportProject, filename);
          if (destinations.has(destination) || directories.has(destination)) {
            throw new Error(`Duplicate screenshot destination: ${destination}`);
          }
          for (let parent = dirname(destination); parent !== '.'; parent = dirname(parent)) {
            if (destinations.has(parent)) {
              throw new Error(`Duplicate screenshot destination: ${destination}`);
            }
            directories.add(parent);
          }
          destinations.add(destination);
          files.push({ source, destination: join(rootDir, destination) });
        } else {
          throw new Error(`Invalid screenshot file: ${source}`);
        }
      }
    };
    collectFiles(screenshotsPath);
    report[reportProject] = { path: reportProject };
    console.info(`✅ ${screenshotsPath} contents copied to ${join(rootDir, reportProject)}`);
  }

  rmSync(rootDir, { recursive: true, force: true });
  mkdirSync(rootDir);
  for (const file of files) {
    mkdirSync(dirname(file.destination), { recursive: true });
    cpSync(file.source, file.destination);
  }

  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  return rootDir;
}
