import * as path from 'node:path';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './consistent-base-hook';

const FIXTURE_ROOT = path.join(__dirname, '__fixtures__/consistent-base-hook');
const TYPED_FILENAME = 'src/test.ts';

const typedLanguageOptions = {
  parserOptions: {
    project: path.join(FIXTURE_ROOT, 'tsconfig.json'),
    tsconfigRootDir: FIXTURE_ROOT,
  },
};

// ---------------------------------------------------------------------------
// Parameter-shape checks — no typed linting required.
// ---------------------------------------------------------------------------
const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Valid base hook: 2 Identifier params, no forbidden imports.
    {
      code: `
        import * as React from 'react';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Valid base hook declared as FunctionDeclaration.
    {
      code: `
        import { Ref } from 'react';
        export function useThingBase_unstable(props, ref: Ref<HTMLElement>) {
          return { props, ref };
        }
      `,
    },
    // Valid base hook with only \`props\` (ref is optional).
    {
      code: `
        export const useThingBase_unstable = (props) => {
          return { props };
        };
      `,
    },
    // Non-base hook is not subject to the param-shape constraint.
    {
      code: `
        export const useThing_unstable = (props, ref, extra) => {
          return { props, ref, extra };
        };
      `,
    },
    // Identifier with the same local name as a forbidden import alias does not collide via scope analysis.
    {
      code: `
        import { useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThing_unstable = (props, ref) => {
          return useArrowNavigationGroup({});
        };
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          const useArrowNavigationGroup = () => 1;
          return { value: useArrowNavigationGroup() };
        };
      `,
    },
    // \`keyborg\` is not in the default forbidden runtime list — bindings imported from it are allowed inside base hooks.
    {
      code: `
        import { createKeyborg, KEYBORG_FOCUSIN } from 'keyborg';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          return { kb: createKeyborg(window), evt: KEYBORG_FOCUSIN };
        };
      `,
    },
  ],
  invalid: [
    // Too few params (0).
    {
      code: `
        export const useThingBase_unstable = () => ({});
      `,
      errors: [{ messageId: 'invalidParamCount', data: { hookName: 'useThingBase_unstable', actual: 0 } }],
    },
    // Too many params.
    {
      code: `
        export const useThingBase_unstable = (props, ref, extra) => ({ props, ref, extra });
      `,
      errors: [{ messageId: 'invalidParamCount', data: { hookName: 'useThingBase_unstable', actual: 3 } }],
    },
    // Wrong param names.
    {
      code: `
        export const useThingBase_unstable = (p, r) => ({ p, r });
      `,
      errors: [
        {
          messageId: 'invalidParamName',
          data: { hookName: 'useThingBase_unstable', index: 1, expected: 'props', actual: 'p' },
        },
        {
          messageId: 'invalidParamName',
          data: { hookName: 'useThingBase_unstable', index: 2, expected: 'ref', actual: 'r' },
        },
      ],
    },
    // ObjectPattern for \`props\` is not allowed.
    {
      code: `
        export const useThingBase_unstable = ({ a }, ref: React.Ref<HTMLElement>) => ({ a, ref });
      `,
      errors: [
        {
          messageId: 'invalidParamName',
          data: { hookName: 'useThingBase_unstable', index: 1, expected: 'props', actual: '{ ... }' },
        },
      ],
    },
    // \`ref\` parameter without a type annotation.
    {
      code: `
        export const useThingBase_unstable = (props, ref) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: '<missing type annotation>' },
        },
      ],
    },
    // \`ref\` parameter typed as something other than React.Ref.
    {
      code: `
        export const useThingBase_unstable = (props, ref: HTMLElement) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'HTMLElement' },
        },
      ],
    },
    // \`ref\` parameter typed as React.ForwardedRef (must be React.Ref).
    {
      code: `
        export const useThingBase_unstable = (props, ref: React.ForwardedRef<HTMLElement>) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'React.ForwardedRef' },
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

typedRuleTester.run(`${RULE_NAME} (typed)`, rule, {
  valid: [
    // The defining file of \`useLight\` only reaches \`light-helper\`, not \`heavy-runtime\`.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useLight } from 'watched-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
          useLight();
          return { props, ref };
        };
      `,
    },
    // Type-only import of a symbol whose defining file reaches the forbidden runtime is allowed.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { HeavyType } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyType, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Per-specifier type-only import is also OK.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { type HeavyType, useLight } from 'watched-pkg';
        export const useThingBase_unstable = (props: HeavyType, ref: React.Ref<HTMLElement>) => {
          useLight();
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
        export const useThingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
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
        export const useThingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
          return { props, ref, value: useA() };
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
        export const useThingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
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
        export const useThingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
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
            viaFile: 'rules/__fixtures__/consistent-base-hook/stubs/watched-pkg/heavy.ts',
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
        export function useThingBase_unstable(props: { a: number }, ref: React.Ref<HTMLElement>) {
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
  ],
});
