import {
  getModsPaths,
  getTsConfigs,
  runMods,
  getModsPattern,
  getModsRootPath,
  getEnabledMods,
} from '../runnerUtilities';
import { CodeMod, CodeModResult } from '../../codeMods/types';
import { Maybe, Nothing } from '../../helpers/maybe';
import { Ok } from '../../helpers/result';

describe('modRunner tests', () => {
  it('gets the appropriate path to mods based on current dir', () => {
    const modPath = getModsRootPath().replace(/\\/g, '/');
    expect(modPath).toEqual(`${process.cwd().replace(/\\/g, '/')}/src/modRunner/../codeMods/mods`);
  });

  it('returns the right paths to run for mods', () => {
    const gottenPaths = getModsPaths(`${process.cwd()}/src/modRunner/tests/mocks/MockMods`, getModsPattern(true));

    expect(gottenPaths.length).toEqual(2);
    expect(gottenPaths[0]).toContain('CodeMod.mock.ts');
  });

  it('only returns .js files when includeTs is false', () => {
    const gottenPaths = getModsPaths(`${process.cwd()}/src/modRunner/tests/mocks/MockMods`, getModsPattern(false));

    expect(gottenPaths.length).toEqual(1);
    expect(gottenPaths[0]).toContain('JSMock.mod.js');
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
      return Ok({ logs: [] });
    };
    const mods: CodeMod<string>[] = [
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

  it('filters enabled and nothing Mods', () => {
    const runcallBack = (foo: string): CodeModResult => {
      return Ok({ logs: [] });
    };

    // use a generator to simulate getting each mod back
    function* modGen(): Generator<Maybe<CodeMod<string>>> {
      yield Maybe({
        name: 'a',
        run: runcallBack,
      });
      yield Maybe({
        name: 'b',
        run: runcallBack,
        enabled: true,
      });
      yield Maybe({
        name: 'c',
        run: runcallBack,
      });
      yield Nothing();
    }

    const gen = modGen();

    const filtered = getEnabledMods(
      console,
      () => ['1', '2', '3', '4'],
      () => gen.next().value,
    );
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toEqual('b');
  });
});
