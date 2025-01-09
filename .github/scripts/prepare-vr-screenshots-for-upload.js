// @ts-check

const { join } = require('node:path');
const { existsSync, cpSync, mkdirSync, writeFileSync } = require('node:fs');
const { createProjectGraphAsync } = require('@nx/devkit');

module.exports = main;

/**
 *
 * @param {import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams & {config:{projects:string[]}} } options
 * @returns
 */
async function main(options) {
  const rootDir = 'screenshots';
  const graph = await createProjectGraphAsync();

  /**
   * @type {{[project_name:string]:{path:string}}}
   */
  const report = {};

  options.config.projects.forEach(project => {
    const projectConfig = graph.nodes[project];
    const screenshotsPath = join(projectConfig.data.root, 'dist/screenshots');

    if (!existsSync(screenshotsPath)) {
      return;
    }

    const destinationFolder = join(rootDir, project);

    mkdirSync(destinationFolder, { recursive: true });

    cpSync(screenshotsPath, destinationFolder, {
      recursive: true,
    });

    console.info(`✅ ${screenshotsPath} contents copied to ${destinationFolder}`);
    report[project] = { path: project };
  });

  writeFileSync(join(rootDir, 'screenshots-report.json'), JSON.stringify(report, null, 2));

  return rootDir;
}
