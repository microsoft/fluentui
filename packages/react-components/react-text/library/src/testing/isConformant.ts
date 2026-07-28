import {
  CLASSNAME_OVERRIDES_WIN_TEST_NAME,
  classNameOverridesWin,
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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; every component in this package now
    // composes with clsx and never calls mergeClasses, so the test can no longer observe
    // the contract. The guarantee itself is unchanged — clsx puts `state.root.className`
    // last and the `@layer fui.*` sublayers keep unlayered consumer CSS winning
    // (DECISIONS.md D2/D9). `classname-overrides-win` is its cascade-native replacement.
    //
    // Wired here rather than per component (react-button wires it per component) because
    // this package converts WHOLE: Text and all 17 presets go through
    // `useTextStyles_unstable`/`createPreset`, so there is no half-converted sibling left
    // rendering Griffel atomics past the consumer's className.
    disabledTests: ['make-styles-overrides-win'],
    extraTests: {
      ...(griffelTests as TestObject<TProps>),
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    } as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
