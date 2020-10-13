/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { CommandBar } from './CommandBar';
import { IContextualMenuItem } from '../ContextualMenu/ContextualMenu.types';

describe('CommandBar', () => {

  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
  });

  it('renders CommandBar correctly', () => {
    const items: IContextualMenuItem[] = [
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
    const component = renderer.create(
      <CommandBar items={ items } />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opens a menu with deprecated IContextualMenuItem.items property', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        items: [
          {
            name: 'SubmenuText 1',
            key: 'SubmenuKey1',
            className: 'SubMenuClass'
          }
        ]
      },
    ];

    const renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ items }
      />
    ) as React.Component<CommandBar, {}>;
    document.body.appendChild(ReactDOM.findDOMNode(renderedContent));

    const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const items: IContextualMenuItem[] = [
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

    const renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ items }
      />
    ) as React.Component<CommandBar, {}>;
    document.body.appendChild(ReactDOM.findDOMNode(renderedContent));

    const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('keeps menu open after update if item is still present', () => {
    const renderContainer = document.createElement('div');
    document.body.appendChild(renderContainer);

    try {
      const items: IContextualMenuItem[] = [
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

      let renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuItem);

      // Make sure the menu is open before the re-render
      expect(document.querySelector('.SubMenuClass')).toBeDefined();

      // Update the props, and re-render
      items.push({
        name: 'Test Key 2',
        key: 'TestKey2'
      });

      renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      // Make sure the menu is still open after the re-render
      expect(document.querySelector('.SubMenuClass')).toBeDefined();
    } finally {
      ReactDOM.unmountComponentAtNode(renderContainer);
      document.body.removeChild(renderContainer);
    }
  });

  it('closes menu after update if item is not longer present', () => {
    const renderContainer = document.createElement('div');
    document.body.appendChild(renderContainer);

    try {
      let items: IContextualMenuItem[] = [
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

      let renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuItem);

      // Make sure the menu is open before the re-render
      expect(document.querySelector('.SubMenuClass')).toBeDefined();

      // Update the props, and re-render
      items = [{
        name: 'Test Key 2',
        key: 'TestKey2'
      }];

      renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      // Make sure the menu is still open after the re-render
      expect(document.querySelector('.SubMenuClass')).toBeNull();
    } finally {
      ReactDOM.unmountComponentAtNode(renderContainer);
      document.body.removeChild(renderContainer);
    }
  });

  it('updates menu after update if item is still present', () => {
    const renderContainer = document.createElement('div');
    document.body.appendChild(renderContainer);

    try {
      const items: IContextualMenuItem[] = [
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

      let renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuItem);

      // Make sure the menu is open before the re-render
      expect(document.querySelector('.SubMenuClass')).toBeDefined();

      // Update the props, and re-render
      items[0].subMenuProps!.items[0].className = 'SubMenuClassUpdate';

      renderedContent = ReactDOM.render(
        <CommandBar
          items={ items }
        />,
        renderContainer
      ) as React.Component<CommandBar, {}>;

      // Make sure the menu is still open after the re-render
      expect(document.querySelector('.SubMenuClass')).toBeNull();
      expect(document.querySelector('.SubMenuClassUpdate')).toBeDefined();
    } finally {
      ReactDOM.unmountComponentAtNode(renderContainer);
      document.body.removeChild(renderContainer);
    }
  });

  it('Command bar item shows chevron even if submenu has no items', () => {
    const menuWithNoSubmenu: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: []
        }
      },
    ];

    const renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ menuWithNoSubmenu }
      />
    ) as React.Component<CommandBar, {}>;
    const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;

    expect(menuItem.querySelector('.ms-CommandBarItem-chevronDown')).not.toEqual(null);
  });

  it('Command bar item onMenuOpened is called even if submenu has no items', () => {
    let subMenuOpened = false;

    const onSubMenuOpened = (): void => {
      subMenuOpened = true;
    };

    const menuWithEmptySubMenu: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: [],
          onMenuOpened: onSubMenuOpened
        }
      }
    ];

    const renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ menuWithEmptySubMenu }
      />
    ) as React.Component<CommandBar, {}>;

    const menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(menuItem);

    expect(subMenuOpened).toEqual(true);
  });

});