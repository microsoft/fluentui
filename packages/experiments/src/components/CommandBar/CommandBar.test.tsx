/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { CommandBar } from './CommandBar';
import * as renderer from 'react-test-renderer';
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
    if (
      !expect(renderer.create(
        <CommandBar
          items={ [
            { key: '1', name: 'asdf' },
            { key: '2', name: 'asdf' }
          ] }
        />
      ).toJSON()).toMatchSnapshot()
    ) {
      console.error('Run to regen snapshots: npm run build jest -- -u');
    }
  });

  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const commandBar = mount<CommandBar>(
      <CommandBar
        items={ [
          {
            name: 'TestText 1',
            key: 'TestKey1',
            className: 'MenuItem',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          },
        ] }
      />
    );

    const menuItem = commandBar.find('.MenuItem button');

    expect(menuItem.length).toEqual(1);

    menuItem.simulate('click');

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('keeps menu open after update if item is still present', () => {
    const commandBar = mount(
      <CommandBar
        items={ [
          {
            name: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          },
        ] }
      />
    );

    let menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeDefined();

    // Update the props, and re-render
    commandBar.setProps({
      items: commandBar.props().items.concat([
        {
          name: 'Test Key 2',
          key: 'TestKey2'
        }
      ])
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('closes menu after update if item is not longer present', () => {
    const commandBar = mount(
      <CommandBar
        items={ [
          {
            name: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          },
        ] }
      />
    );

    let menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeDefined();

    // Update the props, and re-render
    commandBar.setProps({
      items: []
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClass')).toBeFalsy();
  });

  it('updates menu after update if item is still present', () => {
    let items = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: [
            {
              name: 'SubmenuText 1',
              key: 'SubmenuKey1',
              className: 'SubMenuClass'
            }
          ]
        }
      },
    ];

    const commandBar = mount(
      <CommandBar
        items={ items }
      />
    );

    let menuItem = commandBar.find('button');

    menuItem.simulate('click');

    // Make sure the menu is open before the re-render
    expect(document.querySelector('.SubMenuClass')).toBeDefined();

    // Update the props
    items[0].subMenuProps.items[0].className = 'SubMenuClassUpdate';

    // Re-render
    commandBar.setProps({
      items: items
    });

    // Make sure the menu is still open after the re-render
    expect(document.querySelector('.SubMenuClassUpdate')).toBeDefined();
  });

});
