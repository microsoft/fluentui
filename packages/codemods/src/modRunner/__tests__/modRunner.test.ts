import { getModsPaths, getTsConfigs, runMods, filterMods, getModsPattern, getModsRootPath } from '../runnerUtilities';
import { ICodeMod, CodeModResult } from '../../codeMods/ICodeMod';

import { Range } from 'semver';

describe('modRunner tests', () => {
  it('gets the appropriate path to mods based on current dir', () => {
    let modPath = getModsRootPath();
    expect(modPath).toEqual(`${process.cwd()}/src/modRunner/../codeMods/mods`);
  });
  it('returns the right paths to run for mods', () => {
    const gottenPaths = getModsPaths(`${process.cwd()}/src/modRunner/__tests__/mocks/MockMods`, getModsPattern(true));

    expect(gottenPaths.length).toEqual(1);
    expect(gottenPaths[0]).toContain('CodeMod.mock.ts');
  });

  it('finds the right ts-config files', () => {
    const files = getTsConfigs(`${process.cwd()}/src/modRunner/__tests__/mocks/MockProject`);

    expect(files.length).toEqual(2);
    expect(files[0]).toContain('tsconfig.json');
  });

  it('gets a mod when given a path', () => {
    const path = './mocks/MockMods/CodeMod.mock.ts';
    let mod: ICodeMod<string> = require(path).default;
    let spy = jest.spyOn(mod, 'run');

    mod.run('foo');

    expect(spy).toHaveBeenCalled();
  });

  it('runs all mods', () => {
    let runCount = 0;
    let runcallBack = (foo: string): CodeModResult => {
      runCount = runCount + 1;
      return {};
    };
    let mods: ICodeMod<string>[] = [
      {
        name: 'a',
        run: runcallBack,
        version: '1.1.1',
      },
      {
        name: 'b',
        run: runcallBack,
        version: '1.1.1',
      },
      {
        name: 'c',
        run: runcallBack,
        version: '1.1.1',
      },
    ];
    runMods(mods, [''], () => void 0);
    expect(runCount).toEqual(3);
  });

  it('filtersMods to version', () => {
    let runcallBack = (foo: string): CodeModResult => {
      return {};
    };

    let mods: ICodeMod<string>[] = [
      {
        name: 'a',
        run: runcallBack,
        version: '1.1.1',
      },
      // This is the only valid mod, it's both enabled and has the appropriate version
      {
        name: 'b',
        run: runcallBack,
        version: '2.1.1',
        enabled: true,
      },
      {
        name: 'c',
        run: runcallBack,
        version: '3.1.1',
      },
    ];

    let filtered = filterMods(mods, new Range('>1.0.0 <=3.0.0'));
    expect(filtered.length).toEqual(1);
  });
});
