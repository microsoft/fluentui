import fs from 'fs-extra';
import { join } from 'path';

export const getPackageRoot: () => string = () => {
  return process.cwd();
};

export const getConfigDir: (scenario: string) => string = scenario => {
  return join(getPackageRoot(), 'benchmarks', scenario, 'config');
};

export const getResultsDir: (scenario: string) => string = scenario => {
  return join(getPackageRoot(), 'benchmarks', scenario, 'results');
};

export const getScenariosDir: () => string = () => {
  return join(getPackageRoot(), 'scenarios');
};

export const readDirJson: (dir: string) => string[] = dir => {
  return fs.readdirSync(dir).filter((file: string) => file.endsWith('.json'));
};

export const remove: (path: string) => boolean = path => {
  if (fs.pathExistsSync(path)) {
    fs.removeSync(path);
    return true;
  }

  return false;
};

export const mkdirp: (path: string) => void = path => {
  if (!fs.pathExistsSync(path)) {
    fs.mkdirpSync(path);
  }
};

export const ensureClean: (path: string) => void = path => {
  remove(path);
  mkdirp(path);
};

export const getFixturesDir: () => string = () => {
  return join(getPackageRoot(), 'src', 'fixtures');
};
