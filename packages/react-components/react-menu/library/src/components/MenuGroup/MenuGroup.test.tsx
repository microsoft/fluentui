import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { MenuGroup } from './MenuGroup';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGroup', () => {
  isConformant({
    Component: MenuGroup,
    displayName: 'MenuGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // MenuGroup still has no styles of its own — the only local in MenuGroup.module.css is
    // the identity-only `.root {}` that keeps the group marker off `classList[0]`
    // (DECISIONS.md D16.2) — so `make-styles-overrides-win` stays disabled for that reason
    // as well as because this hook no longer calls mergeClasses at all.
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed; `component-has-group-marker` (a default test since
    // D16.6) replaces it.
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for MenuGroup in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGroup>Default MenuGroup</MenuGroup>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should allow user to specify their own aria-labelledby attribute', () => {
    // Arrange
    const id = 'xxx';

    // Act
    const { container } = render(<MenuGroup aria-labelledby={id} />);

    // Assert
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toEqual(id);
  });
});
