import { _upgradeInternal } from '../../upgrade';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as os from 'os';
import { getTsConfigs } from '../runnerUtilities';

const tempDir = os.tmpdir();
const tempPath = path.join(tempDir, 'codemods');
const startingPath = process.cwd();

describe('modRunner tests', () => {
  let temp: string = '';

  beforeEach(() => {
    temp = fs.mkdtempSync(tempPath);
  });

  afterEach(() => {
    fs.removeSync(temp);
  });

  it('saves syncronously correctly', () => {
    const saveAsync = jest.fn();
    const saveSync = jest.fn();
    try {
      fs.copySync(path.join(__dirname, '/mocks/MockProject'), temp);
      process.chdir(temp);
      _upgradeInternal(
        {
          modsFilter: () => true,
        },
        { getTsConfigs: () => getTsConfigs(temp), saveAsync: saveAsync, saveSync: saveSync },
      );
      expect(saveAsync).toHaveBeenCalled();
    } finally {
      process.chdir(startingPath);
    }
  });
  it('saves asynchronously correctly', () => {
    const saveAsync = jest.fn();
    const saveSync = jest.fn();
    try {
      fs.copySync(path.join(__dirname, '/mocks/MockProject'), temp);
      process.chdir(temp);
      _upgradeInternal(
        {
          modsFilter: () => true,
          saveSync: true,
        },
        { getTsConfigs: () => getTsConfigs(temp), saveAsync: saveAsync, saveSync: saveSync },
      );
      expect(saveSync).toHaveBeenCalled();
    } finally {
      process.chdir(startingPath);
    }
  });
});
