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
        const [okays, errors] = result.resultList;

        if (errors.length > 0) {
          error = true;
          logger.error(`File ${result.file.getBaseName()} has had the following mods error: `);
          errors.forEach(v => {
            logger.error('name: ', v.modName, 'errorData: ', v);
          });
        }

        logger.log(`File ${result.file.getBaseName()} has had the following mods run: `);
        okays.forEach(v => {
          logger.log('name: ', v.modName, 'logdata: ', v.logs);
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
