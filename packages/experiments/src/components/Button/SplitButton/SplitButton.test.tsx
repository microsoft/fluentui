import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SplitButton } from './SplitButton';
import { ISplitButtonProps } from './SplitButton.types';

const menuProps: ISplitButtonProps['menu'] = {
  items: [
    {
      key: 'a',
      name: 'Item a'
    },
    {
      key: 'b',
      name: 'Item b'
    }
  ]
};

describe('SplitButton', () => {
  it('renders a SplitButton correctly', () => {
    const component = renderer.create(<SplitButton icon="Add" content="Default button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled icon="Add" content="Disabled button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton primary icon="Add" content="Primary button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary SplitButton correctly', () => {
    const component = renderer.create(<SplitButton disabled primary icon="Add" content="Disabled primary button" menu={menuProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled icon="Add" content="First action disabled button" menu={menuProps} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary SplitButton with its first action disabled correctly', () => {
    const component = renderer.create(
      <SplitButton primaryActionDisabled primary icon="Add" content="First action disabled primary button" menu={menuProps} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('focuses correctly when focus is triggered via ISplitButton interface', () => {
    const wrapper = mount(
      <div>
        <SplitButton content="Split Button 1" />
        <SplitButton content="Split Button 2" />
        <SplitButton content="Split Button 3" />
      </div>
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('span.ms-SplitButton > button.ms-Button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    buttons[0].focus();
    expect(document.activeElement!.textContent).toEqual('Split Button 1');

    buttons[1].focus();
    expect(document.activeElement!.textContent).toEqual('Split Button 2');

    buttons[2].focus();
    expect(document.activeElement!.textContent).toEqual('Split Button 3');
  });
});
