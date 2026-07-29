import {
  COMPONENT_HAS_GROUP_MARKER_TEST_NAME,
  HAS_STATIC_CLASSNAMES_TEST_NAME,
  hasStaticClassNames,
  isConformant as baseIsConformant,
} from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration, batch S4
    // (migration/griffel-to-tailwind/reports/s4-v8-layering-decision.md).
    //
    // The package-wide opt-out of `component-has-group-marker` (a default test since
    // DECISIONS.md D16.6) STAYS, because the conversion only reached the three components that
    // owned a styles file. `StackShim` and `StackItemShim` now stamp `group/fui-stack-shim` /
    // `group/fui-stack-item-shim`; `CheckboxShim` and the eight Button shims render no DOM
    // element of their own (their outermost node is the wrapped v9 component's root, which
    // already carries that component's marker — one marker per element, D15.1), and `MenuShim`
    // and the Theme shims carry no styles at all. A package-wide default would fail all of them.
    //
    // `hasStaticClassNames` — the test that moved out of the default set to make room for the
    // marker test (D16.6) — is taken explicitly so its coverage is preserved. Note the shims'
    // classes are v8 `ms-*` interop classes, not `fui`-prefixed BEM statics, so D16.1's removal sweep
    // does not cover them; `ms-StackItem` in particular is load-bearing for StackShim.module.css's
    // unlayered `:not(:global(.ms-StackItem))` exclusions.
    disabledTests: [COMPONENT_HAS_GROUP_MARKER_TEST_NAME],
    extraTests: {
      ...griffelTests,
      [HAS_STATIC_CLASSNAMES_TEST_NAME]: hasStaticClassNames,
    } as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
