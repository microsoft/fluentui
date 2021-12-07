import { TsConfig } from '../../../types';
import { globsToJs } from '../utils/globsToJs';

export const tsconfig = (options: { platform: 'node' | 'web'; js: boolean; hasConformance: boolean }) => {
  return {
    main: () => {
      const tsConfig: TsConfig = {
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          target: 'ES2019',
          // by default we'll use tsc for type checking only
          noEmit: true,
          isolatedModules: true,
          importHelpers: true,
          jsx: 'react',
          noUnusedLocals: true,
          preserveConstEnums: true,
        },
        include: [],
        files: [],
        references: [
          {
            path: './tsconfig.lib.json',
          },
          {
            path: './tsconfig.spec.json',
          },
        ],
      };

      if (options.js) {
        tsConfig.compilerOptions.allowJs = true;
        tsConfig.compilerOptions.checkJs = true;
        delete tsConfig.compilerOptions.preserveConstEnums;
      }

      return tsConfig;
    },
    lib: () => {
      const tsConfig: TsConfig = {
        extends: './tsconfig.json',
        compilerOptions: {
          noEmit: false,
          lib: ['ES2019'],
          outDir: 'dist',
          declaration: true,
          types: ['static-assets', 'environment'],
        },
        exclude: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
        include: ['./src/**/*.ts', './src/**/*.tsx'],
      };

      if (options.platform === 'node') {
        tsConfig.compilerOptions.module = 'CommonJS';
      }
      if (options.platform === 'web') {
        tsConfig.compilerOptions.lib?.push('dom');
        tsConfig.compilerOptions.types?.push('inline-style-expand-shorthand');
      }
      if (options.hasConformance) {
        tsConfig.exclude!.unshift('./src/common/**');
      }
      if (options.js) {
        tsConfig.include = globsToJs(tsConfig.include!);
        tsConfig.exclude = globsToJs(tsConfig.exclude!);
      }

      return tsConfig;
    },
    test: () => {
      const tsConfig: TsConfig = {
        extends: './tsconfig.json',
        compilerOptions: {
          module: 'CommonJS',
          outDir: 'dist',
          types: ['jest', 'node', 'inline-style-expand-shorthand'],
        },
        include: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
      };

      if (options.js) {
        tsConfig.include = globsToJs(tsConfig.include!);
      }

      return tsConfig;
    },
  };
};
