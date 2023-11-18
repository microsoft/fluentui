import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { CommandBar } from './CommandBar';
import { mount } from 'enzyme';

describe('CommandBar', () => {
  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
  });

  it('renders commands correctly', () => {
    expect(
      renderer
        .create(
          <CommandBar
            items={[
              { key: '1', name: 'asdf' },
              { key: '2', name: 'asdf' },
            ]}
            className={'TestClassName'}
          />,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const commandBar = mount(
      <CommandBar
        items={[
          {
            name: 'TestText 1',
            key: 'TestKey1',
            className: 'MenuItem',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );

    const menuItem = commandBar.find('.MenuItem button');

    expect(menuItem.length).toEqual(1);

    menuItem.simulate('click');

    expect(document.querySelector('.SubMenuClass')).toBeTruthy();
  });

  it('keeps menu open after update if item is still present', () => {
    const commandBar = mount(
      <CommandBar
        items={[
          {
            name: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );

    const menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();

    // Update the props, and re-render
    commandBar.setProps({
      items: commandBar.props().items.concat([
        {
          name: 'Test Key 2',
          key: 'TestKey2',
        },
      ]),
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();
  });

  it('closes menu after update if item is not longer present', () => {
    const commandBar = mount(
      <CommandBar
        items={[
          {
            name: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );

    const menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();

    // Update the props, and re-render
    commandBar.setProps({
      items: [],
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClass')).toBeFalsy();
  });

  it('updates menu after update if item is still present', () => {
    const items = (subMenuItemClassName: string) => [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: [
            {
              name: 'SubmenuText 1',
              key: 'SubmenuKey1',
              className: subMenuItemClassName,
            },
          ],
        },
      },
    ];

    const commandBar = mount(<CommandBar items={items('SubMenuClass')} />);

    const menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();

    // Re-render
    commandBar.setProps({
      items: items('SubMenuClassUpdate'),
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClassUpdate')).toBeTruthy();
  });
});
