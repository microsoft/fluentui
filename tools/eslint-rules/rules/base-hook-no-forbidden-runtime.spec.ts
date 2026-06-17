import * as path from 'node:path';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './base-hook-no-forbidden-runtime';

const FIXTURE_ROOT = path.join(__dirname, '__fixtures__/base-hook-no-forbidden-runtime');
const TYPED_FILENAME = 'src/test.ts';

const typedLanguageOptions = {
  parserOptions: {
    project: path.join(FIXTURE_ROOT, 'tsconfig.json'),
    tsconfigRootDir: FIXTURE_ROOT,
  },
};

// ---------------------------------------------------------------------------
// Untyped checks: direct forbidden imports, scope shadowing, default allow-list,
// and the `typedServicesUnavailable` one-shot warning.
// ---------------------------------------------------------------------------
const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Identifier with the same local name as a forbidden import alias does not collide via scope analysis.
    {
      code: `
        import { useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThing_unstable = (props, ref) => {
          return useArrowNavigationGroup({});
        };
        export const useThingBase_unstable = (props, ref) => {
          const useArrowNavigationGroup = () => 1;
          return { value: useArrowNavigationGroup() };
        };
      `,
    },
    // \`keyborg\` is not in the default forbidden runtime list — bindings imported from it are allowed inside base hooks.
    {
      code: `
        import { createKeyborg, KEYBORG_FOCUSIN } from 'keyborg';
        export const useThingBase_unstable = (props, ref) => {
          return { kb: createKeyborg(window), evt: KEYBORG_FOCUSIN };
        };
      `,
    },
    // No watched/forbidden imports — base hook body is not inspected at all.
    {
      code: `
        export const useThingBase_unstable = (props, ref) => {
          return { props, ref };
        };
      `,
    },
  ],
  invalid: [
    // Referencing a watched-package binding inside a base hook without typed services available
    // surfaces a one-shot `typedServicesUnavailable` diagnostic so the misconfiguration is visible.
    {
      code: `
        import { useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref) => {
          return useArrowNavigationGroup({});
        };
      `,
      errors: [
        {
          messageId: 'typedServicesUnavailable',
          data: {
            watchedPackages: '@fluentui/react-tabster',
            forbiddenRuntimes: 'tabster',
          },
        },
      ],
    },
  ],
});

// ---------------------------------------------------------------------------
// Forbidden-runtime + transitive-reach checks — require typed linting.
// ---------------------------------------------------------------------------
const typedRuleTester = new RuleTester();

const transitiveOptions: readonly [{ watchedPackages: string[]; forbiddenRuntimes: string[] }] = [
  {
    watchedPackages: ['watched-pkg'],
    forbiddenRuntimes: ['heavy-runtime'],
  },
];

const transitiveOptionsAllowTypeImports: readonly [
  { watchedPackages: string[]; forbiddenRuntimes: string[]; allowTypeImports: boolean },
] = [
  {
    watchedPackages: ['watched-pkg'],
    forbiddenRuntimes: ['heavy-runtime'],
    allowTypeImports: true,
  },
];

typedRuleTester.run(`${RULE_NAME} (typed)`, rule, {
  valid: [
    // The defining file of \`useLight\` only reaches \`light-helper\`, not \`heavy-runtime\`.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useLight } from 'watched-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useLight();
          return { props, ref };
        };
      `,
    },
    // Type-only import of a watched-package symbol whose defining file does NOT reach the
    // forbidden runtime is allowed (`LightOptions` is defined in `light.ts` which only pulls
    // `light-helper`).
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { LightOptions } from 'watched-pkg';
        export const useThingBase_unstable = (props: LightOptions, ref) => {
          return { props, ref };
        };
      `,
    },
    // Watched-package import exists but only used by a non-base hook in the same file.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useHeavy } from 'watched-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref };
        };
        export const useThing_unstable = (props, ref) => {
          return useHeavy();
        };
      `,
    },
    // Cyclic re-export graph must not infinite-loop; \`useA\` does not reach heavy-runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: [
        {
          watchedPackages: ['cyclic-pkg'],
          forbiddenRuntimes: ['heavy-runtime'],
        },
      ],
      code: `
        import { useA } from 'cyclic-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, value: useA() };
        };
      `,
    }, // With `allowTypeImports: true`, type-only imports from a forbidden runtime are permitted.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptionsAllowTypeImports,
      code: `
        import type { HeavyOptions } from 'heavy-runtime';
        export const useThingBase_unstable = (props: HeavyOptions, ref) => {
          return { props, ref };
        };
      `,
    },
    // With `allowTypeImports: true`, per-specifier type-only import from a forbidden runtime is permitted.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptionsAllowTypeImports,
      code: `
        import { type HeavyOptions } from 'heavy-runtime';
        export const useThingBase_unstable = (props: HeavyOptions, ref) => {
          return { props, ref };
        };
      `,
    },
    // Symmetric `allowTypeImports`: also exempts watched-package type-only imports whose defining
    // module reaches a forbidden runtime (no runtime coupling is possible from a type).
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptionsAllowTypeImports,
      code: `
        import type { HeavyType } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyType, ref) => {
          return { props, ref };
        };
      `,
    },
  ],
  invalid: [
    // Direct import from a forbidden-runtime package.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { runHeavy } from 'heavy-runtime';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: runHeavy() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeDirect',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'runHeavy',
            package: 'heavy-runtime',
          },
        },
      ],
    },
    // Symbol from watched package whose defining file transitively imports the forbidden runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useHeavy } from 'watched-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: useHeavy() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useHeavy',
            package: 'watched-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/watched-pkg/heavy.ts',
          },
        },
      ],
    },
    // Regression: when the defining symbol lives on one node of a cycle, forbidden runtime
    // imported by another node in that cycle must still appear in transitive reach.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: [
        {
          watchedPackages: ['cyclic-heavy-pkg'],
          forbiddenRuntimes: ['heavy-runtime'],
        },
      ],
      code: `
          import { useB } from 'cyclic-heavy-pkg';
          export const useThingBase_unstable = (props: { a: number }, ref) => {
            return { props, ref, value: useB() };
          };
        `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useB',
            package: 'cyclic-heavy-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/cyclic-heavy-pkg/b.ts',
          },
        },
      ],
    },
    // Aliased import from a forbidden-runtime package is still flagged on the alias use site.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { runHeavy as go } from 'heavy-runtime';
        export function useThingBase_unstable(props: { a: number }, ref) {
          return go();
        }
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeDirect',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'runHeavy',
            package: 'heavy-runtime',
          },
        },
      ],
    },
    // By default, a top-level type-only import from a forbidden runtime is disallowed.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { HeavyOptions } from 'heavy-runtime';
        export const useThingBase_unstable = (props: HeavyOptions, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeDirect',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'HeavyOptions',
            package: 'heavy-runtime',
          },
        },
      ],
    },
    // By default, a per-specifier type-only import from a forbidden runtime is also disallowed.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { type HeavyOptions } from 'heavy-runtime';
        export const useThingBase_unstable = (props: HeavyOptions, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeDirect',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'HeavyOptions',
            package: 'heavy-runtime',
          },
        },
      ],
    },
    // Type-leakage through a watched package: a top-level `import type` of a watched-package
    // symbol whose defining module transitively reaches the forbidden runtime is disallowed
    // because the type still ties the base hook's public API to the forbidden runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { HeavyType } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyType, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'HeavyType',
            package: 'watched-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/watched-pkg/heavy.ts',
          },
        },
      ],
    },
    // Per-specifier `type` modifier variant of the same scenario.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { type HeavyType, useLight } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyType, ref) => {
          useLight();
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'HeavyType',
            package: 'watched-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/watched-pkg/heavy.ts',
          },
        },
      ],
    },
    // Indirect type leakage: `HeavyWrapper` is declared in `watched-pkg/index.ts` (not in `heavy.ts`),
    // but its defining file value-re-exports `./heavy`, so the type-graph reach from `index.ts` still
    // includes `heavy-runtime`. The base hook surface is therefore tied to the forbidden runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { HeavyWrapper } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyWrapper, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'HeavyWrapper',
            package: 'watched-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/watched-pkg/index.ts',
          },
        },
      ],
    },
  ],
});
