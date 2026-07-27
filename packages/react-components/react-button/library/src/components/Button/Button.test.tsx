import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buttonAccessibilityBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

describe('Button', () => {
  isConformant({
    Component: Button as React.FunctionComponent<ButtonProps>,
    displayName: 'Button',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // Replaced repo-wide by a `classname-overrides-win` conformance test in a later phase.
    //
    // Deliberately NOT disabled for ToggleButton/CompoundButton/MenuButton/SplitButton:
    // those still call mergeClasses with the consumer className last before delegating to
    // useButtonStyles_unstable, so the test keeps observing a real call for them.
    disabledTests: ['make-styles-overrides-win'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
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
