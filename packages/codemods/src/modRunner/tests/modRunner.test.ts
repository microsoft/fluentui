import { getModsPaths, getTsConfigs, runMods, filterMods, getModsPattern, getModsRootPath } from '../runnerUtilities';
import { Codemod, CodeModResult } from '../../codeMods/types';

import { Range } from 'semver';

describe('modRunner tests', () => {
  it('gets the appropriate path to mods based on current dir', () => {
    const modPath = getModsRootPath();
    expect(modPath).toEqual(`${process.cwd()}/src/modRunner/../codeMods/mods`);
  });

  it('returns the right paths to run for mods', () => {
    const gottenPaths = getModsPaths(`${process.cwd()}/src/modRunner/tests/mocks/MockMods`, getModsPattern(true));

    expect(gottenPaths.length).toEqual(1);
    expect(gottenPaths[0]).toContain('CodeMod.mock.ts');
  });

  it('finds the right ts-config files', () => {
    const files = getTsConfigs(`${process.cwd()}/src/modRunner/tests/mocks/MockProject`);

    expect(files.length).toEqual(2);
    expect(files[0]).toContain('tsconfig.json');
  });

  it('runs all mods', () => {
    let runCount = 0;
    const runCallBack = (foo: string): CodeModResult => {
      runCount = runCount + 1;
      return {};
    };
    const mods: Codemod<string>[] = [
      {
        name: 'a',
        run: runCallBack,
        version: '1.1.1',
      },
      {
        name: 'b',
        run: runCallBack,
        version: '1.1.1',
      },
      {
        name: 'c',
        run: runCallBack,
        version: '1.1.1',
      },
    ];
    runMods(mods, [''], () => undefined);
    expect(runCount).toEqual(3);
  });

  it('filtersMods to version', () => {
    const runcallBack = (foo: string): CodeModResult => {
      return {};
    };

    const mods: Codemod<string>[] = [
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

    const filtered = filterMods(mods, new Range('>1.0.0 <=3.0.0'));
    expect(filtered.length).toEqual(1);
  });
});
