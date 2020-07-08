import * as React from 'react';
import * as path from 'path';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { isConformant } from '@fluentui/react-conformance';
import { Button } from './Button';
import { ButtonRef } from './Button.types';

describe('Button', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: Button,
    displayName: 'Button',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });

  /**
   * Note: see more visual regression tests for Button in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Button>DefaultButton</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be focused', () => {
    const rootRef = React.createRef<HTMLButtonElement>();
    const componentRef = React.createRef<ButtonRef>();

    wrapper = mount(
      <Button ref={rootRef} componentRef={componentRef}>
        Focus me
      </Button>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    componentRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('renders Button as a "div" with the correct accessibility props', () => {
    const onClick = jest.fn();

    const component = mount(
      <Button as="div" onClick={onClick}>
        Button
      </Button>,
    );

    const button = component.find('div');

    expect(button.getElements().length).toBe(1);
    expect(button.props().role).toBe('button');
    expect(button.props().tabIndex).toBe(0);

    ReactTestUtils.Simulate.keyDown(button.getDOMNode(), { keyCode: EnterKey });
    ReactTestUtils.Simulate.keyDown(button.getDOMNode(), { keyCode: SpacebarKey });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
