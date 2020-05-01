import React from 'react';
import { mount } from 'enzyme';
import { ButtonBase } from './Button.base';

describe('ButtonBase', () => {
  it('focuses correctly when focus is triggered via IButton interface', () => {
    const button1 = React.createRef<HTMLElement>();
    const button2 = React.createRef<HTMLElement>();
    const button3 = React.createRef<HTMLElement>();

    const wrapper = mount(
      <div>
        <ButtonBase ref={button1}>Button 1</ButtonBase>
        <ButtonBase ref={button2}>Button 2</ButtonBase>
        <ButtonBase ref={button3}>Button 3</ButtonBase>
      </div>,
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    button1.current!.focus();
    expect(document.activeElement!).toBe(buttons[0]);

    button2.current!.focus();
    expect(document.activeElement!).toBe(buttons[1]);

    button3.current!.focus();
    expect(document.activeElement!).toBe(buttons[2]);
  });
});
