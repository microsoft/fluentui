import {
  CLASSNAME_OVERRIDES_WIN_TEST_NAME,
  classNameOverridesWin,
  isConformant as baseIsConformant,
} from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    // `classname-overrides-win` (DECISIONS.md D9) pins the styling override contract
    // cascade-natively: clsx puts `state.<slot>.className` last and the `@layer fui.*`
    // sublayers keep unlayered consumer CSS winning (D2).
    //
    // Wired here rather than per component because this package converts WHOLE: ColorPicker,
    // ColorArea, ColorSlider and AlphaSlider all moved in one pass, so there is no
    // half-converted sibling left rendering Griffel atomics past the consumer's className.
    //
    // `component-has-group-marker` is a DEFAULT test since D16.6 and is taken as-is: every
    // root here stamps its marker.
    //
    // AlphaSlider legitimately carries TWO markers (its own plus ColorSlider's, because it
    // renders ColorSlider's slots) and declares the pair locally via
    // `testOptions['has-group-marker'].markers` — see AlphaSlider.test.tsx.
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    } as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
