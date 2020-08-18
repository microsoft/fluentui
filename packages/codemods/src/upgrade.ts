import { runMods, getTsConfigs, getEnabledMods } from './modRunner/runnerUtilities';
import { CommandParserResult } from './command';
import { Logger } from './modRunner/logger';
import { Project } from 'ts-morph';
// Injection point for logger so that it can easily be replaced.
const logger: Logger = console;
export function upgrade(options: CommandParserResult) {
  const mods = getEnabledMods(logger).filter(options.modsFilter);

  logger.log('getting configs');
  const configs = getTsConfigs();

  configs.forEach(configString => {
    // Lazily create/load each project to help deal with large monorepos
    const project = new Project({ tsConfigFilePath: configString });
    let error = false;
    try {
      const files = project.getSourceFiles();
      runMods(mods, files, result => {
        if (result.error) {
          logger.error(`Error running mod ${result.mod.name} on file ${result.file.getBaseName()}`, result.error);
          error = true;
        } else {
          logger.log(`Upgraded file ${result.file.getBaseName()} with mod ${result.mod.name}`);
        }
      });
    } catch (e) {
      logger.error(e);
      error = true;
    }
    if (!error) {
      project.save();
    }
  });
}
