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
      runMods(mods, files, logValue => {
        logValue.result.resolve(
          v => {
            logger.log(`Upgraded file ${logValue.file.getBaseName()} with mod ${logValue.mod.name}`, v.logs);
          },
          e => {
            logger.warn(`Mod ${logValue.mod.name} did not run on file ${logValue.file.getBaseName()} for: `, e.reason);
          },
        );
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
