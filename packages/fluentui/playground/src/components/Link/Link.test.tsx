import React from 'react';
import { mount } from 'enzyme';
import { LinkBase } from './Link.base';

describe('LinkBase', () => {
  it('focuses correctly when focus is triggered via ILink interface', () => {
    const link1 = React.createRef<HTMLElement>();
    const link2 = React.createRef<HTMLElement>();
    const link3 = React.createRef<HTMLElement>();

    const wrapper = mount(
      <div>
        <LinkBase ref={link1} href="#">
          Link 1
        </LinkBase>
        <LinkBase ref={link2} href="#">
          Link 2
        </LinkBase>
        <LinkBase ref={link3}>Link 3</LinkBase>
      </div>,
    );

    const links = wrapper.getDOMNode().querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toEqual(3);

    link1.current!.focus();
    expect(document.activeElement!).toBe(links[0]);

    link2.current!.focus();
    expect(document.activeElement!).toBe(links[1]);

    link3.current!.focus();
    expect(document.activeElement!).toBe(links[2]);
  });
});
