import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  buttonAccessibilityBehaviorDefinition,
  // buttonBehaviorDefinition,
  validateBehavior,
  ComponentTestFacade,
} from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Button } from './Button';
import { ButtonProps } from './Button.types';

describe('Button', () => {
  const testId = 'test-button';

  isConformant({
    Component: Button as React.FunctionComponent<ButtonProps>,
    displayName: 'Button',
  });

  describe('meets accessibility requirements', () => {
    const testFacade = new ComponentTestFacade(Button, {});

    // let errors;
    const errors = validateBehavior(buttonAccessibilityBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);

    // errors = validateBehavior(buttonBehaviorDefinition, testFacade);
    // expect(errors).toEqual([]);
  });

  it('renders a default button', () => {
    const component = render(<Button>This is a button</Button>);
    expect(component.container).toMatchSnapshot();
  });

  it('can be focused', () => {
    const rootRef = React.createRef<HTMLButtonElement>();
    render(<Button ref={rootRef}>This is a button</Button>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('can trigger a function by being clicked', () => {
    const onClick = jest.fn();
    const component = render(
      <Button data-testid={testId} onClick={onClick}>
        This is a button
      </Button>,
    );

    fireEvent.click(component.getByTestId(testId));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when button is disabled', () => {
    const onClick = jest.fn();
    const component = render(
      <Button data-testid={testId} disabled onClick={onClick}>
        This is a button
      </Button>,
    );

    fireEvent.click(component.getByTestId(testId));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when button is disabled and focusable', () => {
    const onClick = jest.fn();
    const component = render(
      <Button data-testid={testId} disabledFocusable onClick={onClick}>
        This is a button
      </Button>,
    );

    fireEvent.click(component.getByTestId(testId));

    expect(onClick).not.toHaveBeenCalled();
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const component = render(
        <Button data-testid={testId} as="a" href="https://www.bing.com">
          This is a button
        </Button>,
      );

      const button = component.getByTestId(testId);
      expect(button.tagName).toBe('A');

      expect(component.container).toMatchSnapshot();
    });

    it('can be focused', () => {
      const rootRef = React.createRef<HTMLAnchorElement>();

      render(
        <Button href="https://www.bing.com" ref={rootRef}>
          This is a button
        </Button>,
      );

      expect(typeof rootRef.current).toEqual('object');
      expect(document.activeElement).not.toEqual(rootRef.current);

      rootRef.current?.focus();

      expect(document.activeElement).toEqual(rootRef.current);
    });
  });
});
