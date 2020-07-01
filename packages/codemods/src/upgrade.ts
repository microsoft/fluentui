import { runMods, getModsPaths, getTsConfigs, shouldRunMod, loadMod } from './modRunner/runnerUtilities';
import { Project } from 'ts-morph';

// TODO actually do console logging, implement some nice callbacks.
export function upgrade() {
  const mods = getModsPaths()
    .filter(pth => pth.endsWith('.js'))
    .map(pth => {
      console.log('fetching codeMod at ', pth);
      return loadMod(pth, e => {
        console.error(e);
      });
    })
    .filter(result => result.success && shouldRunMod(result.mod!))
    .map(mod => mod.mod!);

  console.log('getting configs');
  const configs = getTsConfigs();
  const projects: Project[] = configs.map(configString => new Project({ tsConfigFilePath: configString }));

  projects.forEach(project => {
    let error = false;
    try {
      const files = project.getSourceFiles();
      runMods(mods, files, result => {
        if (result.error) {
          console.error(`Error running mod ${result.mod.name} on file ${result.file.getBaseName()}`, result.error);
          error = true;
        } else {
          console.log(`Upgraded file ${result.file.getBaseName()} with mod ${result.mod.name}`);
        }
      });
    } catch (e) {
      console.error(e);
      error = true;
    }
    if (!error) {
      project.save();
    }
  });
}
