import * as React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import {
  buttonAccessibilityBehaviorDefinition,
  // buttonBehaviorDefinition,
  validateBehavior,
  ComponentTestFacade,
} from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Button } from './Button';

describe('Button', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    Component: Button,
    displayName: 'Button',
  });

  describe('meets accessibility requirements', () => {
    const testFacade = new ComponentTestFacade(Button, {});

    let errors;
    errors = validateBehavior(buttonAccessibilityBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);

    // errors = validateBehavior(buttonBehaviorDefinition, testFacade);
    // expect(errors).toEqual([]);
  });

  it('renders a default button', () => {
    wrapper = mount(<Button>This is a button</Button>);
    const button = wrapper.find('button');
    const anchor = wrapper.find('a');
    expect(button.length).toBe(1);
    expect(anchor.length).toBe(0);

    const component = renderer.create(<Button>This is a button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders as an anchor when href is provided', () => {
  //   wrapper = mount(<Button href="https://www.bing.com">This is a button</Button>);
  //   const button = wrapper.find('button');
  //   const anchor = wrapper.find('a');
  //   expect(button.length).toBe(0);
  //   expect(anchor.length).toBe(1);

  //   const component = renderer.create(<Button href="https://www.bing.com">This is a button</Button>);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('can be focused', () => {
    const rootRef = React.createRef<HTMLButtonElement>();

    wrapper = mount(<Button ref={rootRef}>This is a button</Button>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  // it('can be focused when rendered as an anchor', () => {
  //   const rootRef = React.createRef<HTMLButtonElement>();

  //   wrapper = mount(
  //     <Button href="https://www.bing.com" ref={rootRef}>
  //       This is a button
  //     </Button>,
  //   );

  //   expect(typeof rootRef.current).toEqual('object');
  //   expect(document.activeElement).not.toEqual(rootRef.current);

  //   rootRef.current?.focus();

  //   expect(document.activeElement).toEqual(rootRef.current);
  // });

  it('can trigger a function by being clicked', () => {
    const onClick = jest.fn();
    wrapper = mount(<Button onClick={onClick}>This is a button</Button>);

    wrapper.find('button').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when button is disabled', () => {
    const onClick = jest.fn();
    wrapper = mount(
      <Button disabled onClick={onClick}>
        This is a button
      </Button>,
    );

    wrapper.find('button').simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });

  // it(`does not trigger a function by being clicked when button is disabled, even when disabledFocusable has been
  //     provided`, () => {
  //   const onClick = jest.fn();
  //   wrapper = mount(
  //     <Button disabled disabledFocusable onClick={onClick}>
  //       This is a button
  //     </Button>,
  //   );

  //   wrapper.find('button').simulate('click');

  //   expect(onClick).not.toHaveBeenCalled();
  // });
});
