import { runMods, getTsConfigs, getEnabledMods } from './modRunner/runnerUtilities';
import { CommandParserResult } from './command';
import { Logger } from './modRunner/logger';
import { Project } from 'ts-morph';
// Injection point for logger so that it can easily be replaced.
const logger: Logger = console;

interface UpgradeFunctions {
  getTsConfigs: () => string[];
  saveSync: (file: { saveSync: () => void }) => void;
  saveAsync: (project: { save: () => void }) => void;
}

export function _upgradeInternal(options: CommandParserResult, fns: UpgradeFunctions) {
  const mods = getEnabledMods(logger).filter(options.modsFilter);

  logger.log('getting configs');
  const configs = fns.getTsConfigs();

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
        if (!error && options.saveSync) {
          logger.log(`Saving file: ${result.file.getBaseName()}`);
          fns.saveSync(result.file);
          result.file.forgetDescendants();
          result.file.forget();
        }
      });
    } catch (e) {
      logger.error(e);
      error = true;
    }
    if (!error && !options.saveSync) {
      fns.saveAsync(project);
    }
  });
}

export function upgrade(options: CommandParserResult) {
  _upgradeInternal(options, {
    saveAsync: pr => pr.save(),
    saveSync: file => file.saveSync(),
    getTsConfigs: getTsConfigs,
  });
}
