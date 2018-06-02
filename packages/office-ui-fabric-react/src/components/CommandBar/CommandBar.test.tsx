import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CommandBarBase } from './CommandBar.base';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { CommandBar } from './CommandBar';
import { mount } from 'enzyme';
import { IContextualMenuItem } from '../../ContextualMenu';

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
      renderer.create(<CommandBar items={[{ key: '1', text: 'asdf' }, { key: '2', text: 'asdf' }]} className={'TestClassName'} />).toJSON()
    ).toMatchSnapshot();
  });

  it('adds the correct aria-setsize and -posinset attributes to the command bar items.', () => {
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        className: 'item1',
        subMenuProps: {
          items: [
            {
              text: 'SubmenuText 1',
              key: 'SubmenuKey1',
              className: 'SubMenuClass'
            }
          ]
        }
      },
      {
        text: 'TestText 2',
        key: 'TestKey2',
        className: 'item2'
      },
      {
        text: 'TestText 3',
        key: 'TestKey3',
        className: 'item3'
      }
    ];

    const renderedContent = ReactTestUtils.renderIntoDocument<CommandBarBase>(<CommandBarBase items={items} />) as React.Component<
      CommandBarBase,
      {}
    >;
    document.body.appendChild(ReactDOM.findDOMNode(renderedContent)!);

    const [item1, item2, item3] = ['.item1', '.item2', '.item3'].map(i => document.querySelector(i)!);
    expect(item1.getAttribute('aria-setsize')).toBe('3');
    expect(item2.getAttribute('aria-setsize')).toBe('3');
    expect(item3.getAttribute('aria-setsize')).toBe('3');
    expect(item1.getAttribute('aria-posinset')).toBe('1');
    expect(item2.getAttribute('aria-posinset')).toBe('2');
    expect(item3.getAttribute('aria-posinset')).toBe('3');
  });

  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const commandBar = mount(
      <CommandBar
        items={[
          {
            text: 'TestText 1',
            key: 'TestKey1',
            className: 'MenuItem',
            subMenuProps: {
              items: [
                {
                  text: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ]}
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
        items={[
          {
            text: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  text: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ]}
      />
    );

    const menuItem = commandBar.find('button');

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
        items={[
          {
            text: 'TestText 1',
            key: 'TestKey1',
            subMenuProps: {
              items: [
                {
                  text: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ]}
      />
    );

    const menuItem = commandBar.find('button');

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
    const items = [
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
      }
    ];

    const commandBar = mount(<CommandBar items={items} />);

    const menuItem = commandBar.find('button');

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
