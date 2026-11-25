import * as path from 'node:path';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './base-hook-signature';

const FIXTURE_ROOT = path.join(__dirname, '__fixtures__/base-hook-signature');
// NOTE on fixture filenames below:
//   `RuleTester` always lints source code provided in-memory via the `code` field — it never
//   reads the file at `filename` from disk. The `filename` value is only used (a) as a label
//   in error messages and (b) by rules that perform their OWN filesystem lookups relative to it.
//
//   `base-hook-signature` does exactly that: given a state-hook file `useFoo.ts(x)`, it calls
//   `fs.statSync` to check whether a sibling `useFooBase.ts(x)` exists in the same folder, and
//   only enforces the contract when a pair is detected.
//
//   So for the fixture tree under `__fixtures__/base-hook-signature/src/components/`:
//     - The two stub files `Sibling/useSibling.ts` and `Orphan/useOrphan.ts` are docs-only —
//       their existence does NOT affect any assertion (the rule never reads them).
//     - What actually drives the test outcomes is the presence of `Sibling/useSiblingBase.ts`
//       (pair detected → contract enforced) and the absence of
//       `Orphan/useOrphanContextValuesBase.ts(x)` (no pair → contract NOT enforced).
const SIBLING_FILENAME = path.join(FIXTURE_ROOT, 'src/components/Sibling/useSibling.ts');
const ORPHAN_FILENAME = path.join(FIXTURE_ROOT, 'src/components/Orphan/useOrphan.ts');

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Valid base hook: namespace import — `import * as React from 'react'` + `React.Ref<...>`.
    {
      code: `
        import * as React from 'react';
        export const useThingBase_unstable = (props: {}, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Valid base hook: named import — `import { Ref } from 'react'` + `Ref<...>` (FunctionDeclaration form).
    {
      code: `
        import { Ref } from 'react';
        export function useThingBase_unstable(props: {}, ref: Ref<HTMLElement>) {
          return { props, ref };
        }
      `,
    },
    // Valid base hook: default import — `import React from 'react'` + `React.Ref<...>`.
    {
      code: `
        import React from 'react';
        export const useThingBase_unstable = (props: {}, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Valid base hook with only \`props\` (ref is optional). \`props\` still needs a type annotation.
    {
      code: `
        export const useThingBase_unstable = (props: {}) => {
          return { props };
        };
      `,
    },
    // Non-base hook without a paired base hook is not subject to the contract.
    {
      code: `
        export const useThing_unstable = (props, ref, extra) => {
          return { props, ref, extra };
        };
      `,
    },
    // Pair detection (same file): a state hook `useThing_unstable` next to its base hook
    // `useThingBase_unstable` IS subject to the contract. Correct signature passes.
    {
      code: `
        import * as React from 'react';
        export const useThing_unstable = (props: {}, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
        export const useThingBase_unstable = (props: {}, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Pair detection (no sibling base hook on disk): `useOrphanContextValues_unstable(state)`
    // is NOT a paired wrapping hook and must NOT be flagged for its non-(props, ref) signature.
    // The Orphan folder has no `useOrphanContextValuesBase.ts(x)` next to it.
    {
      filename: ORPHAN_FILENAME,
      code: `
        export function useOrphanContextValues_unstable(state) {
          return { state };
        }
      `,
    },
    // Pair detection (sibling file): wrapping state hook lives in `useSibling.ts`, paired with
    // `useSiblingBase.ts` in the same folder. Correct (props, ref) signature passes.
    {
      filename: SIBLING_FILENAME,
      code: `
        import * as React from 'react';
        export const useSibling_unstable = (props: {}, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
      `,
    },
    // Re-export of a base hook from another module is valid. We can't inspect the params
    // of an identifier initializer, so we skip validation but accept it as a pairing marker.
    {
      code: `
        export const useThingBase_unstable = useThingBase;
      `,
    },
    // Re-export of an externally-imported base hook is also valid.
    {
      code: `
        import { useExternalBase_unstable } from 'external-lib';
        export const useThingBase_unstable = useExternalBase_unstable;
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
      ],
    },
    // ObjectPattern for \`props\` is not allowed.
    {
      code: `
        import * as React from 'react';
        export const useThingBase_unstable = ({ a }, ref: React.Ref<HTMLElement>) => ({ a, ref });
      `,
      errors: [
        {
          messageId: 'invalidParamName',
          data: { hookName: 'useThingBase_unstable', index: 1, expected: 'props', actual: '{ ... }' },
        },
      ],
    },
    // \`ref\` parameter without a type annotation. \`props\` is typed so this case stays focused
    // on the ref-type assertion (an untyped \`props\` would also trigger \`missingPropsType\`).
    {
      code: `
        export const useThingBase_unstable = (props: {}, ref) => ({ props, ref });
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
        export const useThingBase_unstable = (props: {}, ref: HTMLElement) => ({ props, ref });
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
        export const useThingBase_unstable = (props: {}, ref: React.ForwardedRef<HTMLElement>) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'React.ForwardedRef' },
        },
      ],
    },
    // \`Ref\` is a locally declared type alias, not imported from react.
    {
      code: `
        type Ref<T> = { current: T | null };
        export const useThingBase_unstable = (props: {}, ref: Ref<HTMLElement>) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'Ref' },
        },
      ],
    },
    // \`Ref\` imported from a non-react package is not accepted.
    {
      code: `
        import { Ref } from 'not-react';
        export const useThingBase_unstable = (props: {}, ref: Ref<HTMLElement>) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'Ref' },
        },
      ],
    },
    // \`React\` is a locally declared identifier, not the react module namespace.
    {
      code: `
        const React = { Ref: null };
        export const useThingBase_unstable = (props: {}, ref: React.Ref<HTMLElement>) => ({ props, ref });
      `,
      errors: [
        {
          messageId: 'invalidRefType',
          data: { hookName: 'useThingBase_unstable', actual: 'React.Ref' },
        },
      ],
    },
    // Pair detection (same file): wrapping state hook with too many params is flagged because
    // its sibling base hook in the same file marks it as a paired wrapper. The base hook itself
    // is correctly typed so only the wrapping hook's error is asserted.
    {
      code: `
        import * as React from 'react';
        export const useThing_unstable = (props, ref, extra) => ({ props, ref, extra });
        export const useThingBase_unstable = (props: {}, ref: React.Ref<HTMLElement>) => ({ props, ref });
      `,
      errors: [{ messageId: 'invalidParamCount', data: { hookName: 'useThing_unstable', actual: 3 } }],
    },
    // Pair detection (sibling file): wrapping state hook in `useSibling.ts` is paired with
    // `useSiblingBase.ts` in the same folder. Wrong param names are flagged (stops at first).
    {
      filename: SIBLING_FILENAME,
      code: `
        import * as React from 'react';
        export const useSibling_unstable = (p, r: React.Ref<HTMLElement>) => ({ p, r });
      `,
      errors: [
        {
          messageId: 'invalidParamName',
          data: { hookName: 'useSibling_unstable', index: 1, expected: 'props', actual: 'p' },
        },
      ],
    },
    // \`props\` parameter without a type annotation (would be inferred as \`any\` and fail
    // \`noImplicitAny\` under TS strict). Asserted on a base hook with only \`props\`.
    {
      code: `
        export const useThingBase_unstable = (props) => ({ props });
      `,
      errors: [{ messageId: 'missingPropsType', data: { hookName: 'useThingBase_unstable' } }],
    },
    // \`props\` without type annotation, even when a correctly-typed \`ref\` is present.
    // Demonstrates that the \`props\`-type check short-circuits before the \`ref\` check, so the
    // user sees the more fundamental problem first.
    {
      code: `
        import * as React from 'react';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => ({ props, ref });
      `,
      errors: [{ messageId: 'missingPropsType', data: { hookName: 'useThingBase_unstable' } }],
    },
    // Base hook initialized to a number literal is invalid.
    {
      code: `
        export const useThingBase_unstable = 42;
      `,
      errors: [{ messageId: 'invalidBaseHookInit', data: { hookName: 'useThingBase_unstable', actual: '42' } }],
    },
    // Base hook initialized to an object literal is invalid.
    {
      code: `
        export const useThingBase_unstable = {};
      `,
      errors: [{ messageId: 'invalidBaseHookInit', data: { hookName: 'useThingBase_unstable', actual: '{}' } }],
    },
    // Base hook initialized to an array literal is invalid.
    {
      code: `
        export const useThingBase_unstable = [];
      `,
      errors: [{ messageId: 'invalidBaseHookInit', data: { hookName: 'useThingBase_unstable', actual: '[]' } }],
    },
    // Base hook initialized to a string literal is invalid.
    {
      code: `
        export const useThingBase_unstable = "not-a-function";
      `,
      errors: [
        { messageId: 'invalidBaseHookInit', data: { hookName: 'useThingBase_unstable', actual: '"not-a-function"' } },
      ],
    },
  ],
});
