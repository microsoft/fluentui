/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import {
  KeyCodes,
} from '../../Utilities';
import { FocusZoneDirection } from '../../FocusZone';

let { expect } = chai;

import { ContextualMenu } from './ContextualMenu';
import { IContextualMenuItem, ContextualMenuItemType } from './ContextualMenu.Props';
import { Layer } from '../Layer/Layer';

describe('ContextualMenu', () => {

  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
  });

  it('does not have a scrollbar due to an overflowing icon', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1', canCheck: true, isChecked: true },
      { name: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
      { name: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
      { name: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true },
    ];

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuList = document.querySelector('.ms-ContextualMenu-list') as HTMLUListElement;

    expect(menuList.scrollHeight).to.be.lte(menuList.offsetHeight, 'ContextualMenu is showing a scrollbar due to checkmark');
  });

  it('closes on left arrow if it is a submenu', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' },
    ];

    let spyCalled = false;
    let onDismissSpy = (ev?: any, dismissAll?: boolean) => { spyCalled = true; };

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
        isSubMenu={ true }
        onDismiss={ onDismissSpy }
      />
    );

    let menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).to.be.true;
  });

  it('does not close on left arrow if it is a submenu with horizontal arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' },
    ];

    let spyCalled = false;
    let onDismissSpy = (ev?: any, dismissAll?: boolean) => { spyCalled = true; };

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
        isSubMenu={ true }
        onDismiss={ onDismissSpy }
        arrowDirection={ FocusZoneDirection.horizontal }
      />
    );

    let menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).to.be.false;
  });

  it('does not close on left arrow if it is a submenu with bidirectional arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' },
    ];

    let spyCalled = false;
    let onDismissSpy = (ev?: any, dismissAll?: boolean) => { spyCalled = true; };

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
        isSubMenu={ true }
        onDismiss={ onDismissSpy }
        arrowDirection={ FocusZoneDirection.horizontal }
      />
    );

    let menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).to.be.false;
  });

  it('opens a submenu item on right arrow', () => {
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
    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });

    expect(document.querySelector('.SubMenuClass')).to.exist;
  });

  it('opens a submenu item on click', () => {
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

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).to.exist;
  });

  it('still works with deprecated IContextualMenuItem.items property', () => {
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

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });

    expect(document.querySelector('.SubMenuClass')).to.exist;
  });

  it('renders headers properly', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        itemType: ContextualMenuItemType.Header
      },
      {
        name: 'TestText 2',
        key: 'TestKey3'
      },
      {
        name: 'TestText 3',
        key: 'TestKey3',
        itemType: ContextualMenuItemType.Header
      }
    ];

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuItems = document.querySelectorAll('li');

    expect(menuItems.length).to.be.eq(4, 'This menu has an incorrect number of items');
    let headerOne = menuItems[0];
    let dividerOne = menuItems[2];
    let headerTwo = menuItems[3];

    expect(headerOne.className).to.not.contain('divider', 'The first item is a divider and it should be a header');
    expect(headerOne.firstElementChild!.className).to.contain('header', 'The first item was not a header');
    expect(dividerOne.className).to.contain('divider', 'The third item in the contextualmenu was not a divider');
    expect(headerTwo.firstElementChild!.className).to.contain('header', 'The final item was not a header');
  });

  it('renders sections properly', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          topDivider: true,
          bottomDivider: true,
          items: [
            {
              name: 'TestText 2',
              key: 'TestKey3'
            },
            {
              name: 'TestText 3',
              key: 'TestKey3',
            }
          ]
        }
      }, {
        name: 'TestText 4',
        key: 'TestKey4',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          items: [
            {
              name: 'TestText 5',
              key: 'TestKey5'
            },
            {
              name: 'TestText 6',
              key: 'TestKey6',
            }
          ]
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let menuItems = document.querySelectorAll('li');
    expect(menuItems.length).to.be.eq(8, 'This menu has an incorrect number of items');
  });

  it('does not return a value if no items are given', () => {
    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ [] }
      />
    );
    let menuList = document.querySelector('.ms-ContextualMenu-list');

    expect(menuList).to.be.eq(null, 'ContextualMenu is not return null even though no items are provided');

  });

  it('correctly focuses the first element', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      },
    ];

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
      />
    );

    let focusedItem = document.querySelector('.testkey1')!.firstChild;
    expect(document.activeElement).to.be.eq(focusedItem, 'The first element was not focused');
  });

  it('will not focus the first element when shouldFocusOnMount is false', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      },
    ];

    ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
        shouldFocusOnMount={ false }
      />
    );

    let focusedItem = document.querySelector('.testkey1')!.firstChild;
    expect(document.activeElement).to.be.not.eq(focusedItem, 'The first element was not focused');
  });

  it('ContextualMenu menuOpened callback is called only when menu is available', () => {
    let layerMounted = false;
    let menuMounted = false;
    let menuMountedFirst = false;
    let layerMountedFirst = false;

    // Alter the Layer's prototype so that we can confirm that it mounts before the contextualmenu mounts.
    /* tslint:disable:no-function-expression */
    Layer.prototype.componentDidMount = function (componentDidMount) {
      return function () {
        if (menuMounted) {
          menuMountedFirst = true;
        }
        layerMounted = true;
        return componentDidMount.call(this);
      };
    }(Layer.prototype.componentDidMount);
    /* tslint:enable:no-function-expression */

    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      },
    ];
    ReactTestUtils.renderIntoDocument<HTMLDivElement>(
      <div>
        <button id='target' style={ { top: '10px', left: '10px', height: '0', width: '0px' } }> target </button>
        <ContextualMenu
          target='#target'
          items={ items }
          onMenuOpened={ () => {
            if (layerMounted) {
              layerMountedFirst = true;
            }
            menuMounted = true;
          } }
        >
        </ContextualMenu>
      </div>
    );
    expect(menuMounted).to.be.equal(true, 'Menu opened callback was not properly called');
    expect(layerMountedFirst).to.be.equal(true, 'Menu Mounted First');
    expect(menuMountedFirst).to.be.equal(false, 'Layer Mounted first');
  });
});
