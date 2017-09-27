/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

import { CommandBar } from './CommandBar';
import { IContextualMenuItem } from '../ContextualMenu/ContextualMenu.Props';

describe('CommandBar', () => {

  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
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

    let renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ items }
      />
    ) as React.Component<CommandBar, {}>;
    document.body.appendChild(ReactDOM.findDOMNode(renderedContent));

    let menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
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

    let renderedContent = ReactTestUtils.renderIntoDocument<CommandBar>(
      <CommandBar
        items={ items }
      />
    ) as React.Component<CommandBar, {}>;
    document.body.appendChild(ReactDOM.findDOMNode(renderedContent));

    let menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('keeps menu open after update if item is still present', () => {
    let renderContainer = document.createElement('div');
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

      let menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
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
    let renderContainer = document.createElement('div');
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

      let menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
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
    let renderContainer = document.createElement('div');
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

      let menuItem = (ReactDOM.findDOMNode(renderedContent) as HTMLElement).querySelector('button') as HTMLButtonElement;
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
});