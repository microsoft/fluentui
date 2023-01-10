import { getTsPathAliasesApiExtractorConfig } from './utils';

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
describe(`utils`, () => {
  describe(`#getTsPathAliasesApiExtractorConfig`, () => {
    type Options = Parameters<typeof getTsPathAliasesApiExtractorConfig>[0];
    function setup(options: DeepPartial<Options> = {}) {
      const defaults = {
        tsConfig: {
          compilerOptions: {
            outDir: '../../dist/out-tsc',
            ...options.tsConfig?.compilerOptions,
          },
        },
        tsConfigPath: 'tsconfig.lib.json',
        packageJson: {
          name: '@proj/one',
          version: '0.0.1',
          main: 'lib/index.js',
          dependencies: { ...options.packageJson?.dependencies },
          peerDependencies: { ...options.packageJson?.peerDependencies },
        },
        definitionsRootPath: options.definitionsRootPath ?? 'dist/types',
      };

      return getTsPathAliasesApiExtractorConfig(defaults as Options);
    }

    it(`should set compilerOptions`, () => {
      const actual = setup();

      expect(actual.overrideTsconfig.compilerOptions).toEqual(
        expect.objectContaining({ isolatedModules: false, skipLibCheck: false }),
      );
    });

    it(`should override path aliases to emitted declaration files instead of source files`, () => {
      const actual = setup({ definitionsRootPath: 'dist/for/types' });

      const newPaths = (actual.overrideTsconfig.compilerOptions.paths as unknown) as Record<string, string[]>;

      const newPath = Object.values(newPaths)[0][0];
      expect(newPath).toMatch(new RegExp('^dist/for/types.+src/index.d.ts$', 'i'));
    });

    it(`should set allowSyntheticDefaultImports if package has invalid deps/peerDeps`, () => {
      const actual = setup({ packageJson: { dependencies: { '@storybook/api': '6.5.0' } } });
      expect(actual.overrideTsconfig.compilerOptions).toEqual(
        expect.objectContaining({ allowSyntheticDefaultImports: true }),
      );
    });
  });
});
