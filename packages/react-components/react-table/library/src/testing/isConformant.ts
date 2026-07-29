import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package is now converted, so the package-wide opt-out of
    // `component-has-group-marker` (a default test since DECISIONS.md D16.6) is gone and it
    // no longer takes the opt-in `hasStaticClassNames`: the `fui-Table*` / `fui-DataGrid*`
    // BEM statics that test asserted were removed by D16.1, and every component here stamps
    // a `group/fui-*` marker instead.
    //
    // `make-styles-overrides-win` is disabled and `classname-overrides-win` added per
    // component, and the seven DataGrid* components declare their marker SET, because both
    // are per-component facts. See any *.test.tsx in this package.
    extraTests: griffelTests as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
