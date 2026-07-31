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
    // cascade-natively: clsx puts `state.root.className` last and the `@layer fui.*`
    // sublayers keep unlayered consumer CSS winning (D2).
    //
    // Wired here rather than per component (react-button wires it per component) because
    // this package converts WHOLE: Text and all 17 presets go through
    // `useTextStyles_unstable`/`createPreset`, so there is no half-converted sibling left
    // rendering Griffel atomics past the consumer's className.
    //
    // `component-has-static-classnames-object` is disabled for the same whole-package
    // reason: react-text publishes no BEM statics any more (DECISIONS.md D16.1), and the
    // test hard-codes the `fui-<Component>` format and asserts those classes are rendered.
    // For the 17 presets it would also demand a `<preset>ClassNames` export, and those were
    // REMOVED rather than re-pointed — presets stamp no marker of their own, so there is
    // nothing to re-point `root` to (D16.7).
    //
    // `component-has-group-marker` replaces it. Text's own displayName derives the right
    // marker (`group/fui-text`); every preset overrides it via
    // `testOptions['has-group-marker']` to the same value, because a `<Body1>` IS a `<Text>`.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    } as TestObject<TProps>,
  };

  baseIsConformant(defaultOptions, testInfo);
}
