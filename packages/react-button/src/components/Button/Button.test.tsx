import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { Button } from './Button';
import { GlobalClassNames } from './useButtonClasses';
import { validateBehavior, ComponentTestFacade, buttonBehaviorDefinition } from '@fluentui/a11y-testing';

describe('Button (isConformant)', () =>
  isConformant({
    Component: Button,
    displayName: 'Button',
  }));

describe('Button', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Button in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Button>Default button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be focused', () => {
    const rootRef = React.createRef<HTMLButtonElement>();

    wrapper = mount(<Button ref={rootRef}>Focus me</Button>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('can trigger a function by being clicked', () => {
    const onClick = jest.fn();
    wrapper = mount(<Button onClick={onClick}>Focus me</Button>);

    wrapper.find(`.${GlobalClassNames.root}`).simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when button is disabled', () => {
    const onClick = jest.fn();
    wrapper = mount(
      <Button disabled onClick={onClick}>
        I am a button
      </Button>,
    );

    wrapper.find(`.${GlobalClassNames.root}`).simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });

  it(`does not trigger a function by being clicked when button is disabled, even when disabledFocusable has been
      provided`, () => {
    const onClick = jest.fn();
    wrapper = mount(
      <Button disabled disabledFocusable onClick={onClick}>
        I am a button
      </Button>,
    );

    wrapper.find(`.${GlobalClassNames.root}`).simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });

  describe('AccessibilityButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(Button, {});
    const errors = validateBehavior(buttonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
