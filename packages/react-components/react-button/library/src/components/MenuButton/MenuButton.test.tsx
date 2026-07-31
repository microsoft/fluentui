import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';
import type { MenuButtonProps } from './MenuButton.types';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton as React.FunctionComponent<MenuButtonProps>,
    displayName: 'MenuButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because D16.1 removed this
    // package's BEM statics: `menuButtonClassNames` now holds only `root`, pointed at the
    // group marker, and the default test hard-codes the `fui-<Component>__<slot>` format.
    // The per-slot `expectedClassNames` overrides this call site used to carry went with
    // them.
    //
    // `component-has-group-marker` runs with a declared marker SET: this root is also a Button, so it renders
    // two markers by design (`group/fui-menu-button` + `group/fui-button`), and
    // `assertGroupMarkerIsStamped` rejects more than one with no escape hatch. See the
    // longer note in ToggleButton.test.tsx.
    disabledTests: [
      'component-has-static-classnames-object',
      // Renders another package's root, so it carries that component's marker alongside its
      // own. `component-has-group-marker` became a default test with the statics removal
      // (DECISIONS.md D16.6) and asserts EXACTLY ONE marker, which is false here by
      // construction; the local assertion below keeps its load-bearing `classList[0]` half.
    ],
    testOptions: {
      // a MenuButton IS a Button — `useButtonStyles_unstable` stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-menu-button'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const { getByRole } = render(<MenuButton>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const { getByRole } = render(<MenuButton>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(<MenuButton disabled>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(<MenuButton disabledFocusable>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<MenuButton onClick={onClick}>This is a button</MenuButton>);

      userEvent.click(getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuButton disabled onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuButton disabledFocusable onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const { getByRole } = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const { getByRole } = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(
        <MenuButton as="a" disabled href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(
        <MenuButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
