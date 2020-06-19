import * as React from 'react';
import * as path from 'path';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { isConformant } from '@fluentui/react-conformance';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: Button,
    displayName: 'Button',
    disabledTests: ['has-docblock'],
  });

  it('renders Button as a "div" with the correct accessibility props', () => {
    const onClick = jest.fn();

    const component = mount(<Button as="div" content="Button" onClick={onClick} />);

    const button = component.find('div');

    expect(button.getElements().length).toBe(1);
    expect(button.props().role).toBe('button');
    expect(button.props().tabIndex).toBe(0);

    ReactTestUtils.Simulate.keyDown(button.getDOMNode(), { keyCode: EnterKey });
    ReactTestUtils.Simulate.keyDown(button.getDOMNode(), { keyCode: SpacebarKey });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
