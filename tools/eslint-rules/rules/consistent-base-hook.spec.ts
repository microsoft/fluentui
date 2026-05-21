import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './consistent-base-hook';

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
    // Valid base hook with only `props` (ref is optional).
    {
      code: `
        export const useThingBase_unstable = (props) => {
          return { props };
        };
      `,
    },
    // Forbidden import exists but is only used by a non-base hook in the same file.
    {
      code: `
        import { useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          return { props, ref };
        };
        export const useThing_unstable = (props, ref) => {
          const nav = useArrowNavigationGroup({});
          return { ...useThingBase_unstable(props, ref), nav };
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
    // Allowlist opt-out: a specific imported name is permitted inside base hooks.
    {
      code: `
        import { useFocusFinders } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          const finders = useFocusFinders();
          return { props, ref, finders };
        };
      `,
      options: [
        {
          forbiddenPackages: [{ name: '@fluentui/react-tabster', allow: ['useFocusFinders'] }],
        },
      ],
    },
    // Default allowlist: `useFocusWithin` from `@fluentui/react-tabster` is permitted inside base hooks.
    {
      code: `
        import { useFocusWithin } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLSpanElement>) => {
          return { props, ref: useFocusWithin<HTMLSpanElement>() };
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
    // ObjectPattern for `props` is not allowed.
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
    // `ref` parameter without a type annotation.
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
    // `ref` parameter typed as something other than React.Ref.
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
    // `ref` parameter typed as React.ForwardedRef (must be React.Ref).
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
    // Body uses a binding imported from @fluentui/react-tabster.
    {
      code: `
        import { useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          const nav = useArrowNavigationGroup({});
          return { props, ref, nav };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenPackageUsage',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useArrowNavigationGroup',
            package: '@fluentui/react-tabster',
          },
        },
      ],
    },
    // Body uses a binding imported from tabster, even when aliased.
    {
      code: `
        import { getTabsterAttribute as gta } from 'tabster';
        export function useThingBase_unstable(props, ref: React.Ref<HTMLElement>) {
          return { attr: gta({}) };
        }
      `,
      errors: [
        {
          messageId: 'forbiddenPackageUsage',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'getTabsterAttribute',
            package: 'tabster',
          },
        },
      ],
    },
    // Body uses a binding imported from keyborg.
    {
      code: `
        import { createKeyborg } from 'keyborg';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          return { kb: createKeyborg(window) };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenPackageUsage',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'createKeyborg',
            package: 'keyborg',
          },
        },
      ],
    },
    // Allowlist excludes one name; siblings still error.
    {
      code: `
        import { useFocusFinders, useArrowNavigationGroup } from '@fluentui/react-tabster';
        export const useThingBase_unstable = (props, ref: React.Ref<HTMLElement>) => {
          const finders = useFocusFinders();
          const nav = useArrowNavigationGroup({});
          return { props, ref, finders, nav };
        };
      `,
      options: [
        {
          forbiddenPackages: [{ name: '@fluentui/react-tabster', allow: ['useFocusFinders'] }],
        },
      ],
      errors: [
        {
          messageId: 'forbiddenPackageUsage',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useArrowNavigationGroup',
            package: '@fluentui/react-tabster',
          },
        },
      ],
    },
  ],
});
