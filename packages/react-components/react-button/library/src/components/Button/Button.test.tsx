import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buttonAccessibilityBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

describe('Button', () => {
  isConformant({
    Component: Button as React.FunctionComponent<ButtonProps>,
    displayName: 'Button',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // ToggleButton/CompoundButton/MenuButton/SplitButton are converted too now and carry
    // the identical pair in their own test files. Both entries stay per-component rather
    // than moving into src/testing/isConformant.ts, so that a future component added to
    // this package has to opt in deliberately.
    //
    // `component-has-static-classnames-object` is disabled because D16.1 removed this
    // package's BEM statics: `buttonClassNames` now holds only `root`, pointed at the
    // group marker, and the default test hard-codes the `fui-<Component>__<slot>` format
    // (react-conformance/src/defaultTests.tsx). `component-has-group-marker` (now a default test) is its
    // replacement — it asserts the marker IS stamped and, crucially, that it is never
    // `classList[0]` (DECISIONS.md D15.1 / D16.2 / D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  describe('meets accessibility requirements', () => {
    const testFacade = new ComponentTestFacade(Button, {});
    const errors = validateBehavior(buttonAccessibilityBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);

    afterAll(() => {
      // Reset body after behavioral checks are done
      document.body.innerHTML = '';
    });
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const { getByRole } = render(<Button>This is a button</Button>);
      const button = getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const { getByRole } = render(<Button>This is a button</Button>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(<Button disabled>This is a button</Button>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(<Button disabledFocusable>This is a button</Button>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<Button onClick={onClick}>This is a button</Button>);

      userEvent.click(getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <Button disabled onClick={onClick}>
          This is a button
        </Button>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <Button disabledFocusable onClick={onClick}>
          This is a button
        </Button>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const { getByRole } = render(
        <Button as="a" href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = getByRole('link');

      expect(anchor.tagName).toBe('A');
      expect(anchor.getAttribute('role')).toBeFalsy();
    });

    it('applies role and tabindex with no href', () => {
      const { getByRole } = render(<Button as="a">This is a button</Button>);
      const anchor = getByRole('button');

      expect(anchor.tagName).toBe('A');
      expect(anchor.getAttribute('role')).toEqual('button');
      expect(anchor.tabIndex).toEqual(0);
    });

    it('can be focused', () => {
      const { getByRole } = render(
        <Button as="a" href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      userEvent.tab();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(
        <Button as="a" disabled href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(
        <Button as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      userEvent.tab();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
