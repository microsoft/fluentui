import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DrawerFooter } from './DrawerFooter';
import { isConformant } from '../../testing/isConformant';

describe('DrawerFooter', () => {
  isConformant({
    Component: DrawerFooter,
    displayName: 'DrawerFooter',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts `drawerFooterClassNames` still holds
    // `fui-DrawerFooter` AND that it is rendered. Both are false by design: DECISIONS.md
    // D16.1 removed the BEM statics, D16.5 narrowed the export to `{ root }` and re-pointed
    // it at the group marker. It is replaced by `component-has-group-marker`, now a default
    // test.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<DrawerFooter>Default DrawerFooter</DrawerFooter>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <footer
          class="group/fui-drawer-footer"
          data-scroll-state="none"
          role="none"
        >
          Default DrawerFooter
        </footer>
      </div>
    `);
  });
});
