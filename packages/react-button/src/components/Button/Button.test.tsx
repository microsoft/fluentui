import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { buttonAccessibilityBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Button } from './Button';
import { ButtonProps } from './Button.types';

describe('Button', () => {
  isConformant({
    Component: Button as React.FunctionComponent<ButtonProps>,
    displayName: 'Button',
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
      const result = render(<Button>This is a button</Button>);
      const button = result.getByRole('button');

      expect(button).toBeTruthy();
      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const result = render(<Button>This is a button</Button>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(<Button disabled>This is a button</Button>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(<Button disabledFocusable>This is a button</Button>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const result = render(<Button onClick={onClick}>This is a button</Button>);

      fireEvent.click(result.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <Button disabled onClick={onClick}>
          This is a button
        </Button>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <Button disabledFocusable onClick={onClick}>
          This is a button
        </Button>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const result = render(
        <Button as="a" href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = result.getByRole('button');

      expect(anchor).toBeTruthy();
      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const result = render(
        <Button as="a" href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(
        <Button as="a" disabled href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(
        <Button as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </Button>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
