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
    // No imports at all — base hook body is not inspected.
    {
      code: `
        export const useThingBase_unstable = (props, ref) => {
          return { props, ref };
        };
      `,
    },
  ],
  invalid: [
    // Referencing an imported binding inside a base hook without typed services available
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
            forbiddenRuntimes: 'tabster',
          },
        },
      ],
    },
    // Every import is analyzed transitively, not just a fixed allow-list of packages — so even
    // an unrelated package such as `keyborg` needs typed services to be cleared.
    {
      code: `
        import { createKeyborg, KEYBORG_FOCUSIN } from 'keyborg';
        export const useThingBase_unstable = (props, ref) => {
          return { kb: createKeyborg(window), evt: KEYBORG_FOCUSIN };
        };
      `,
      errors: [
        {
          messageId: 'typedServicesUnavailable',
          data: {
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

const transitiveOptions: readonly [{ forbiddenRuntimes: string[] }] = [
  {
    forbiddenRuntimes: ['heavy-runtime'],
  },
];

const transitiveOptionsAllowTypeImports: readonly [{ forbiddenRuntimes: string[]; allowTypeImports: boolean }] = [
  {
    forbiddenRuntimes: ['heavy-runtime'],
    allowTypeImports: true,
  },
];

// `workspace-runtime` stands in for a forbidden runtime that lives in the repo rather than in
// `node_modules` (e.g. `@fluentui/react-motion`), which TypeScript resolves through `paths`
// straight to source.
const workspaceRuntimeOptions: readonly [{ forbiddenRuntimes: string[] }] = [
  {
    forbiddenRuntimes: ['workspace-runtime'],
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
    // A base props bag derived from a styled one by subtracting the forbidden-runtime member is
    // clean: `Omit` really removes it, so the resolved type has no coupling left. The declaration
    // still *mentions* `StyledProps`, which is why this has to be answered structurally rather
    // than by following declaration syntax.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { DerivedBaseProps } from 'watched-pkg';
        export const useThingBase_unstable = (props: DerivedBaseProps, ref) => {
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
    // Relative import of a local module that does not reach the forbidden runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useLocalLight } from './local-light';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useLocalLight();
          return { props, ref };
        };
      `,
    },
    // Barrels must stay transparent: pulling a clean export from a package barrel must not
    // inherit the dependencies of the forbidden-runtime sibling exported next to it.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useCleanExport } from 'barrel-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useCleanExport();
          return { props, ref };
        };
      `,
    },
    // Same guarantee for a local folder barrel.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useLocalLight } from './local-barrel';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useLocalLight();
          return { props, ref };
        };
      `,
    },
    // A wrapper-package export whose implementation bottoms out in a benign dependency is allowed,
    // even though sibling exports of the same package do reach the forbidden runtime. This is the
    // `useOnKeyboardNavigationChange` -> `keyborg` shape.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useBenign } from 'wrapper-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useBenign();
          return { props, ref };
        };
      `,
    },
    // Same guarantee one package further out: `useActiveDescendant` -> `useOnKeyboardNavigationChange`
    // -> `keyborg` must stay clean across package boundaries.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useRelay } from 'relay-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useRelay();
          return { props, ref };
        };
      `,
    },
    // A `.d.ts`-declared symbol that does not touch the forbidden runtime stays valid.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useDistClean } from 'typed-dist-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          useDistClean();
          return { props, ref };
        };
      `,
    },
    // A props type doing `typeof SomeComponent` describes the component's shape; it does not
    // consume its runtime, so the component's implementation must not be walked.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { WidgetHostProps } from 'component-pkg';
        export const useThingBase_unstable = (props: WidgetHostProps, ref) => {
          return { props, ref };
        };
      `,
    },
    // A symbol whose own shape does not touch the forbidden runtime is fine even when the file
    // declaring it imports that runtime for a *sibling* export.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { CleanTag } from 'watched-pkg';
        export const useThingBase_unstable = (props: CleanTag, ref) => {
          return { props, ref };
        };
      `,
    },
    // Cyclic re-export graph must not infinite-loop; \`useA\` does not reach heavy-runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
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
      options: transitiveOptions,
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
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/cyclic-heavy-pkg/a.ts',
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
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/heavy-runtime/index.ts',
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
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/heavy-runtime/index.ts',
          },
        },
      ],
    },
    // The counterpart of the `Omit` case: while the member is still present the coupling is real
    // and must be reported, so the structural check is not simply blind to subtraction.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { StyledProps } from 'watched-pkg';
        export const useThingBase_unstable = (props: StyledProps, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'StyledProps',
            package: 'watched-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/heavy-runtime/index.ts',
          },
        },
      ],
    },
    // Indirect type leakage: `HeavyWrapper` is declared in `watched-pkg/index.ts`, but its own
    // shape embeds `HeavyType`, which is itself typed by the forbidden runtime.
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
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/heavy-runtime/index.ts',
          },
        },
      ],
    },
    // The forbidden-runtime sibling of a barrel is still reported when it is the binding actually
    // referenced.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useDirtyExport } from 'barrel-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: useDirtyExport() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useDirtyExport',
            package: 'barrel-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/barrel-pkg/dirty.ts',
          },
        },
      ],
    },
    // A workspace forbidden runtime reached through a pure re-export barrel. The alias collapse
    // skips the intermediate `workspace-runtime` specifier, and the leaf declaration is
    // path-mapped to source, so ownership can only be recovered from its package manifest.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: workspaceRuntimeOptions,
      code: `
        import { runWorkspaceHeavy } from 'workspace-relay-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: runWorkspaceHeavy() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'runWorkspaceHeavy',
            package: 'workspace-relay-pkg',
            runtime: 'workspace-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/workspace-runtime/index.ts',
          },
        },
      ],
    },
    // Same for a type re-exported from a workspace forbidden runtime — API coupling, not just runtime.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: workspaceRuntimeOptions,
      code: `
        import type { WorkspaceHeavyOptions } from 'workspace-relay-pkg';
        export const useThingBase_unstable = (props: { a: WorkspaceHeavyOptions }, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'WorkspaceHeavyOptions',
            package: 'workspace-relay-pkg',
            runtime: 'workspace-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/workspace-runtime/index.ts',
          },
        },
      ],
    },
    // Relative imports are analyzed too: `./local-trigger` -> `./local-heavy` -> `heavy-runtime`.
    // This is the shape that let `@fluentui/react-tabster` leak into `useDropdownBase_unstable`.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useLocalTrigger } from './local-trigger';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: useLocalTrigger() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useLocalTrigger',
            package: './local-trigger',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/src/local-heavy.ts',
          },
        },
      ],
    },
    // A package that appears in no option list is still analyzed transitively.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useUnlisted } from 'unlisted-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: useUnlisted() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useUnlisted',
            package: 'unlisted-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/unlisted-pkg/index.ts',
          },
        },
      ],
    },
    // The sibling export of that same wrapper package is still reported, with `via` naming the
    // innermost file rather than the package entry point.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { useDeep } from 'wrapper-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: useDeep() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'useDeep',
            package: 'wrapper-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/wrapper-pkg/useDeepInner.ts',
          },
        },
      ],
    },
    // Declaration files are traversed too, so a package linted against built output still has its
    // type coupling to the forbidden runtime detected.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import type { DistHeavy } from 'typed-dist-pkg';
        export const useThingBase_unstable = (props: DistHeavy, ref) => {
          return { props, ref };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'DistHeavy',
            package: 'typed-dist-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/heavy-runtime/index.ts',
          },
        },
      ],
    },
    // Actually rendering that same component in a base hook is a runtime dependency and is reported.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { Widget } from 'component-pkg';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, components: { widget: Widget } };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'Widget',
            package: 'component-pkg',
            runtime: 'heavy-runtime',
            viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/component-pkg/widget.ts',
          },
        },
      ],
    },
    // A subpath specifier of a forbidden runtime is normalized to its package name.
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: `
        import { runHeavySub } from 'heavy-runtime/sub';
        export const useThingBase_unstable = (props: { a: number }, ref) => {
          return { props, ref, x: runHeavySub() };
        };
      `,
      errors: [
        {
          messageId: 'forbiddenRuntimeDirect',
          data: {
            hookName: 'useThingBase_unstable',
            importedName: 'runHeavySub',
            package: 'heavy-runtime',
          },
        },
      ],
    },
  ],
});

// ---------------------------------------------------------------------------
// Cache partitioning by forbidden-runtime set.
//
// An answer is only true relative to the set it was computed for, while the Program (and the
// symbols and types in it) is shared by every configuration pointed at the same tsconfig. These
// runs are ordered on purpose: each one re-asks about `useHeavy` after a previous run has already
// cached an answer for it under a *different* set.
// ---------------------------------------------------------------------------
const heavyReference = `
  import { useHeavy } from 'watched-pkg';
  export const useThingBase_unstable = (props, ref) => {
    return { props, ref, x: useHeavy() };
  };
`;

const heavyReferenceError = [
  {
    messageId: 'forbiddenRuntimeReach' as const,
    data: {
      hookName: 'useThingBase_unstable',
      importedName: 'useHeavy',
      package: 'watched-pkg',
      runtime: 'heavy-runtime',
      viaFile: 'rules/__fixtures__/base-hook-no-forbidden-runtime/stubs/watched-pkg/heavy.ts',
    },
  },
];

// 1. Seeds the `heavy-runtime` bucket with a hit.
new RuleTester().run(`${RULE_NAME} (typed, cache seeded for heavy-runtime)`, rule, {
  valid: [],
  invalid: [
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: heavyReference,
      errors: heavyReferenceError,
    },
  ],
});

// 2. A configuration that does not ban `heavy-runtime` must not inherit that hit — otherwise it
//    is told about a package it explicitly allows.
new RuleTester().run(`${RULE_NAME} (typed, hit not reused by a set that allows it)`, rule, {
  valid: [
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: workspaceRuntimeOptions,
      code: heavyReference,
    },
  ],
  invalid: [],
});

// 3. ...and the clean answer just cached for that set must not suppress the real one.
new RuleTester().run(`${RULE_NAME} (typed, clean result not reused by a set that forbids it)`, rule, {
  valid: [],
  invalid: [
    {
      languageOptions: typedLanguageOptions,
      filename: TYPED_FILENAME,
      options: transitiveOptions,
      code: heavyReference,
      errors: heavyReferenceError,
    },
  ],
});
