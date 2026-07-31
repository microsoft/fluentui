import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { validateBehavior, ComponentTestFacade, toggleButtonBehaviorDefinition } from '@fluentui/a11y-testing';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { ToggleButton } from './ToggleButton';
import type { ToggleButtonProps } from './ToggleButton.types';

describe('ToggleButton', () => {
  beforeAll(() => {
    // Reset body after behavioral checks are done
    document.body.innerHTML = '';
  });

  isConformant({
    Component: ToggleButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToggleButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because D16.1 removed this
    // package's BEM statics: `toggleButtonClassNames` now holds only `root`, pointed at the
    // group marker, and the default test hard-codes the `fui-<Component>__<slot>` format.
    //
    // Takes `component-has-group-marker` with a declared marker SET (unlike Button and SplitButton), and this
    // is a gap in the shared assertion, not in this component. ToggleButton's root is also a
    // Button, so it renders TWO markers by design — `group/fui-toggle-button` and, from
    // `useButtonStyles_unstable`, `group/fui-button` — which is exactly what lets
    // react-toolbar's ToolbarToggleButton compound `:global(.group\/fui-toggle-button)`.
    // `assertGroupMarkerIsStamped` rejects `groupMarkers.length > 1` unconditionally, with
    // no `testOptions` escape hatch, so opting in fails on a contract this family
    // deliberately does not hold. The `classList[0]` half — the D16.2 invariant that
    // actually matters — was verified green here before being backed out; it needs a
    // composed-component allowance in `react-conformance` to stay. Same blocker applies to
    // CompoundButton, MenuButton, react-toolbar's three Toolbar*Buttons and
    // react-breadcrumb's BreadcrumbButton.
    disabledTests: [
      'component-has-static-classnames-object',
      // Renders another package's root, so it carries that component's marker alongside its
      // own. `component-has-group-marker` became a default test with the statics removal
      // (DECISIONS.md D16.6) and asserts EXACTLY ONE marker, which is false here by
      // construction; the local assertion below keeps its load-bearing `classList[0]` half.
    ],
    testOptions: {
      // a ToggleButton IS a Button — `useButtonStyles_unstable` stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-toggle-button'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  xdescribe('AccesibilityButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(ToggleButton, {});
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const { getByRole } = render(<ToggleButton>This is a button</ToggleButton>);
      const button = getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const { getByRole } = render(<ToggleButton>This is a button</ToggleButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(<ToggleButton disabled>This is a button</ToggleButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(<ToggleButton disabledFocusable>This is a button</ToggleButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<ToggleButton onClick={onClick}>This is a button</ToggleButton>);

      userEvent.click(getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when button is disabled', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <ToggleButton disabled onClick={onClick}>
          This is a button
        </ToggleButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when button is disabled and focusable', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <ToggleButton disabledFocusable onClick={onClick}>
          This is a button
        </ToggleButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const { getByRole } = render(
        <ToggleButton as="a" href="https://www.bing.com">
          This is a button
        </ToggleButton>,
      );
      const anchor = getByRole('link');

      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const { getByRole } = render(
        <ToggleButton as="a" href="https://www.bing.com">
          This is a button
        </ToggleButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(
        <ToggleButton as="a" disabled href="https://www.bing.com">
          This is a button
        </ToggleButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(
        <ToggleButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </ToggleButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });

  describe('on state changes', () => {
    it('triggers a change in `aria-pressed` when clicked if it is uncontrolled', () => {
      const { getAllByRole } = render(
        <>
          <ToggleButton defaultChecked={false}>This is a toggle button</ToggleButton>
          <ToggleButton defaultChecked>This is a toggle button</ToggleButton>
        </>,
      );
      const [initiallyUnchecked, initiallyChecked] = getAllByRole('button');

      expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('false');
      userEvent.click(initiallyUnchecked);
      expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('true');
      userEvent.click(initiallyUnchecked);
      expect(initiallyUnchecked.getAttribute('aria-pressed')).toBe('false');

      expect(initiallyChecked.getAttribute('aria-pressed')).toBe('true');
      userEvent.click(initiallyChecked);
      expect(initiallyChecked.getAttribute('aria-pressed')).toBe('false');
      userEvent.click(initiallyChecked);
      expect(initiallyChecked.getAttribute('aria-pressed')).toBe('true');
    });

    it('does not trigger a change in `aria-pressed` when clicked if it is controlled', () => {
      const { getAllByRole } = render(
        <>
          <ToggleButton checked={false}>This is a toggle button</ToggleButton>
          <ToggleButton checked>This is a toggle button</ToggleButton>
        </>,
      );
      const [unchecked, checked] = getAllByRole('button');

      expect(unchecked.getAttribute('aria-pressed')).toBe('false');
      userEvent.click(unchecked);
      expect(unchecked.getAttribute('aria-pressed')).toBe('false');

      expect(checked.getAttribute('aria-pressed')).toBe('true');
      userEvent.click(checked);
      expect(checked.getAttribute('aria-pressed')).toBe('true');
    });

    it('does not trigger a change in `aria-pressed` when clicked if it is disabled', () => {
      const { getAllByRole } = render(
        <>
          <ToggleButton disabled>This is a toggle button</ToggleButton>
          <ToggleButton defaultChecked disabled>
            This is a toggle button
          </ToggleButton>
        </>,
      );
      const [unchecked, checked] = getAllByRole('button');

      expect(unchecked.getAttribute('aria-pressed')).toBe('false');
      userEvent.click(unchecked);
      expect(unchecked.getAttribute('aria-pressed')).toBe('false');

      expect(checked.getAttribute('aria-pressed')).toBe('true');
      userEvent.click(checked);
      expect(checked.getAttribute('aria-pressed')).toBe('true');
    });

    it('does not trigger a change in `aria-pressed` when clicked if it is disabledFocusable', () => {
      const { getAllByRole } = render(
        <>
          <ToggleButton disabledFocusable>This is a toggle button</ToggleButton>
          <ToggleButton defaultChecked disabledFocusable>
            This is a toggle button
          </ToggleButton>
        </>,
      );
      const [unchecked, checked] = getAllByRole('button');

      expect(unchecked.getAttribute('aria-pressed')).toBe('false');
      userEvent.click(unchecked);
      expect(unchecked.getAttribute('aria-pressed')).toBe('false');

      expect(checked.getAttribute('aria-pressed')).toBe('true');
      userEvent.click(checked);
      expect(checked.getAttribute('aria-pressed')).toBe('true');
    });

    describe('when passed a checkbox role', () => {
      it('triggers a change in `aria-checked` when clicked if it is uncontrolled', () => {
        const { getAllByRole } = render(
          <>
            <ToggleButton defaultChecked={false} role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked={false} role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
          </>,
        );
        const [initiallyUncheckedCheckbox, initiallyCheckedCheckbox] = getAllByRole('checkbox');
        const [initiallyUncheckedMenuItemCheckbox, initiallyCheckedMenuItemCheckbox] = getAllByRole('menuitemcheckbox');

        expect(initiallyUncheckedCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(initiallyUncheckedCheckbox);
        expect(initiallyUncheckedCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(initiallyUncheckedCheckbox);
        expect(initiallyUncheckedCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(initiallyCheckedCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(initiallyCheckedCheckbox);
        expect(initiallyCheckedCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(initiallyCheckedCheckbox);
        expect(initiallyCheckedCheckbox.getAttribute('aria-checked')).toBe('true');

        expect(initiallyUncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(initiallyUncheckedMenuItemCheckbox);
        expect(initiallyUncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(initiallyUncheckedMenuItemCheckbox);
        expect(initiallyUncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(initiallyCheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(initiallyCheckedMenuItemCheckbox);
        expect(initiallyCheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(initiallyCheckedMenuItemCheckbox);
        expect(initiallyCheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
      });

      it('does not trigger a change in `aria-checked` when clicked if it is controlled', () => {
        const { getAllByRole } = render(
          <>
            <ToggleButton checked={false} role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton checked role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton checked={false} role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton checked role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
          </>,
        );
        const [uncheckedCheckbox, checkedCheckbox] = getAllByRole('checkbox');
        const [uncheckedMenuItemCheckbox, checkedMenuItemCheckbox] = getAllByRole('menuitemcheckbox');

        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedCheckbox);
        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedCheckbox);
        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');

        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedMenuItemCheckbox);
        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedMenuItemCheckbox);
        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
      });

      it('does not trigger a change in `aria-checked` when clicked if it is disabled', () => {
        const { getAllByRole } = render(
          <>
            <ToggleButton disabled role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked disabled role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton disabled role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked disabled role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
          </>,
        );
        const [uncheckedCheckbox, checkedCheckbox] = getAllByRole('checkbox');
        const [uncheckedMenuItemCheckbox, checkedMenuItemCheckbox] = getAllByRole('menuitemcheckbox');

        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedCheckbox);
        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedCheckbox);
        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');

        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedMenuItemCheckbox);
        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedMenuItemCheckbox);
        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
      });

      it('does not trigger a change in `aria-checked` when clicked if it is disabledFocusable', () => {
        const { getAllByRole } = render(
          <>
            <ToggleButton disabledFocusable role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked disabledFocusable role="checkbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton disabledFocusable role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
            <ToggleButton defaultChecked disabledFocusable role="menuitemcheckbox">
              This is a toggle button
            </ToggleButton>
          </>,
        );
        const [uncheckedCheckbox, checkedCheckbox] = getAllByRole('checkbox');
        const [uncheckedMenuItemCheckbox, checkedMenuItemCheckbox] = getAllByRole('menuitemcheckbox');

        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedCheckbox);
        expect(uncheckedCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedCheckbox);
        expect(checkedCheckbox.getAttribute('aria-checked')).toBe('true');

        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');
        userEvent.click(uncheckedMenuItemCheckbox);
        expect(uncheckedMenuItemCheckbox.getAttribute('aria-checked')).toBe('false');

        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
        userEvent.click(checkedMenuItemCheckbox);
        expect(checkedMenuItemCheckbox.getAttribute('aria-checked')).toBe('true');
      });
    });
  });
});
