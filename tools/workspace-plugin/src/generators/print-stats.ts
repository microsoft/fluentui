import chalk from 'chalk';
import { Tree, ProjectConfiguration, logger } from '@nx/devkit';

interface Options<T extends ProjectConfiguration> {
  title: string;
  projects: Map<string, T>;
  shouldProcessPackage: (tree: Tree, project: ProjectConfiguration) => boolean;
  isMigratedCheck: (tree: Tree, project: ProjectConfiguration) => boolean;
  projectInfoFormat?: (data: StatData<T>) => string;
}
type StatData<T extends ProjectConfiguration> = T & { projectName: string };

export function printStats<T extends ProjectConfiguration>(tree: Tree, options: Options<T>) {
  const { isMigratedCheck, projectInfoFormat, shouldProcessPackage, title, projects } = {
    projectInfoFormat: defaultProjectInfoFormat,
    ...options,
  };

  const stats = {
    migrated: { application: [] as Array<StatData<T>>, library: [] as Array<StatData<T>> },
    notMigrated: { application: [] as Array<StatData<T>>, library: [] as Array<StatData<T>> },
  };

  projects.forEach((project, projectName) => {
    if (!project.projectType) {
      throw new Error(`${projectName}: is missing "projectType" categorization in project.json!`);
    }
    if (!shouldProcessPackage(tree, project)) {
      return;
    }

    if (isMigratedCheck(tree, project)) {
      stats.migrated[project.projectType].push({ projectName, ...project });

      return;
    }

    stats.notMigrated[project.projectType].push({ projectName, ...project });
  });

  const heading = printTitle(`${title} migration stats:`);

  logger.info(heading);

  logger.info(chalk.reset.inverse.bold.green(` Migrated: `));
  logger.info(`Libs: (${stats.migrated.library.length})`);
  logger.info(stats.migrated.library.map(projectInfoFormat).join('\n'));
  logger.info(`Apps (${stats.migrated.application.length}):`);
  logger.info(stats.migrated.application.map(projectInfoFormat).join('\n'));

  logger.info(chalk.reset.hex('#FFF').bgHex('#FF8800').bold(` Not Migrated: `));
  logger.info(`Libs (${stats.notMigrated.library.length}):`);
  logger.info(stats.notMigrated.library.map(projectInfoFormat).join('\n'));
  logger.info(`Apps (${stats.notMigrated.application.length}):`);
  logger.info(stats.notMigrated.application.map(projectInfoFormat).join('\n'));

  return tree;
}

const printTitle = (title: string) => `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(` ${title} `)))}\n`;
function defaultProjectInfoFormat<T extends ProjectConfiguration>(data: StatData<T>) {
  return `- ${data.projectName}`;
}
