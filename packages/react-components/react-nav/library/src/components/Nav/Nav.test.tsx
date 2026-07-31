import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // D16 statics-removal sweep retired; `navClassNames.root` is now the group marker
    // (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test) replaces
    // it.
    //
    // todo - # 30012, remove `consistent-callback-args` when conformance is updated
    disabledTests: ['consistent-callback-args', 'component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
