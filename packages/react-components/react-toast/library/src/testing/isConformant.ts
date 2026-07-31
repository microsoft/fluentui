import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package is converted, so every component stamps a `group/fui-*` marker and takes
    // `component-has-group-marker` from the DEFAULT set (DECISIONS.md D16.6). The package-wide
    // opt-out that used to sit here is gone, along with the `hasStaticClassNames` opt-in that
    // stood in for it while the BEM statics were still published — those statics are removed
    // (D16.1) and `component-has-static-classnames-object` asserts a format that no longer
    // exists.
    //
    // `griffelTests` (i.e. `make-styles-overrides-win`) stays REGISTERED but is disabled per
    // component in the individual `.test.tsx` files, where `classname-overrides-win` — its
    // cascade-native replacement (D9) — is added alongside. Registering it here and disabling
    // it there keeps the rationale next to the component it applies to.
  };

  baseIsConformant(defaultOptions, testInfo);
}
