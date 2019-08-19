import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SplitButton } from './SplitButton';
import { ISplitButton, ISplitButtonProps } from './SplitButton.types';

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
    const button1 = React.createRef<ISplitButton>();
    const button2 = React.createRef<ISplitButton>();
    const button3 = React.createRef<ISplitButton>();

    const wrapper = mount(
      <div>
        <SplitButton content="Button 1" componentRef={button1} />
        <SplitButton content="Button 2" componentRef={button2} />
        <SplitButton content="Button 3" componentRef={button3} />
      </div>
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('span.ms-SplitButton > button.ms-Button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    button1.current!.focus();
    expect(document.activeElement!).toBe(buttons[0]);

    button2.current!.focus();
    expect(document.activeElement!).toBe(buttons[1]);

    button3.current!.focus();
    expect(document.activeElement!).toBe(buttons[2]);
  });
});
