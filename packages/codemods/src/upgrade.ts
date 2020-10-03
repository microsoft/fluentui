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

  if (options.saveSync) {
    logger.log('Saving files synchronously');
  }
  configs.forEach(configString => {
    // Lazily create/load each project to help deal with large monorepos
    const project = new Project({ tsConfigFilePath: configString });
    let error = false;
    try {
      const files = project.getSourceFiles();
      runMods(mods, files, result => {
        if (!result.resultList.some(v => v.status === 'error')) {
          if (options.saveSync) {
            result.file.saveSync();
          }
        } else {
          error = true;
        }
        logger.log(`File ${result.file.getBaseName()} has had the following mods run: `);
        result.resultList.forEach(v => {
          logger.log('name: ', v.modName, 'result: ', v.status, 'logdata: ', v.logs);
        });
      });
    } catch (e) {
      logger.error(e);
      error = true;
    }
    if (!error && !options.saveSync) {
      project.save();
    }
  });
}
