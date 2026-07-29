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
    // The package-wide opt-out of `component-has-group-marker` (DECISIONS.md D16.6) is gone:
    // DatePicker now stamps `group/fui-date-picker` and takes the default test, and
    // `hasStaticClassNames` goes with the BEM statics it asserted (D16.1).
    //
    // `griffelTests` stays registered (react-divider's shape): removing it would silently
    // turn DatePicker's `make-styles-overrides-win` entry in `disabledTests` into a no-op
    // name, and that entry is what documents that the contract moved to
    // `classname-overrides-win`.
    extraTests: griffelTests as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
