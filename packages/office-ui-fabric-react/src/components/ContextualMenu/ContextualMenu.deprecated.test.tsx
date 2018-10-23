import * as React from 'react';
import { Promise } from 'es6-promise';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes, createRef } from '../../Utilities';
import { FocusZoneDirection } from '../../FocusZone';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';
import { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.types';
import { ContextualMenu } from './ContextualMenu';
import { canAnyMenuItemsCheck } from './ContextualMenu.base';
import { ContextualMenuItemType } from './ContextualMenu.types';
import { IContextualMenuRenderItem } from './ContextualMenuItem.types';
import { IMenuItemClassNames, getItemClassNames } from './ContextualMenu.classNames';
import { createTheme } from '../../Styling';

let customClassNames: () => IMenuItemClassNames;

describe('ContextualMenu', () => {
  beforeAll(() => {
    jest.spyOn(WarnUtil, 'warnDeprecations').mockImplementation(() => {
      /** no impl **/
    });

    customClassNames = (): IMenuItemClassNames => {
      return {
        item: 'itemFoo',
        divider: 'dividerFoo',
        root: 'rootFoo',
        linkContent: 'linkFoo',
        icon: 'iconFoo',
        checkmarkIcon: 'checkmarkIconFoo',
        subMenuIcon: 'subMenuIconFoo',
        label: 'labelFoo',
        secondaryText: 'secondaryTextFoo',
        splitContainer: 'splitContainerFoo',
        splitPrimary: 'splitPrimaryFoo',
        splitMenu: 'splitMenuFoo',
        linkContentMenu: 'linkContentMenuFoo'
      };
    };
  });

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
      { name: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuList = document.querySelector('.ms-ContextualMenu-list') as HTMLUListElement;

    expect(menuList.scrollHeight).toBeLessThanOrEqual(menuList.offsetHeight);
  });

  it('includes the classNames on ContextualMenuItem(s)', () => {
    const items: IContextualMenuItem[] = [{ name: 'Test 1', key: 'Test1' }];

    const getClassNames = () => {
      return {
        container: 'containerFoo',
        root: 'rootFoo',
        list: 'listFoo',
        header: 'headerFoo',
        title: 'titleFoo'
      };
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} getMenuClassNames={getClassNames} />);

    const container = document.querySelector('.containerFoo') as HTMLElement;
    const rootEl = document.querySelector('.rootFoo') as HTMLElement;
    const list = document.querySelector('.listFoo') as HTMLElement;
    const header = document.querySelector('.headerFoo') as HTMLElement;
    const title = document.querySelector('.titleFoo') as HTMLElement;

    expect(container).toBeDefined();
    expect(rootEl).toBeDefined();
    expect(list).toBeDefined();
    expect(header).toBeDefined();
    expect(title).toBeDefined();
  });

  it('applies in-line style property if present on ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [{ name: 'Test 1', key: 'Test1', style: { background: 'red' } }];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('.ms-ContextualMenu-link') as HTMLButtonElement;

    expect(menuItem.style.background).toEqual('red');
  });

  it('applies getItemClassNames for split menu items', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'newItem',
        text: 'New',
        split: true,
        onClick: () => console.log('New clicked'),
        getItemClassNames: customClassNames,
        subMenuProps: {
          items: [
            {
              key: 'share',
              text: 'Share'
            }
          ]
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const splitContainerEl = document.querySelector('.splitContainerFoo') as HTMLElement;
    const splitPrimaryEl = document.querySelector('.splitPrimaryFoo') as HTMLElement;
    const splitMenuEl = document.querySelector('.splitMenuFoo') as HTMLElement;
    const subMenuIconEl = document.querySelector('.subMenuIconFoo') as HTMLElement;
    const linkContentMenuEl = document.querySelector('.linkContentMenuFoo') as HTMLElement;

    expect(splitContainerEl.classList.contains('splitContainerFoo')).toBeTruthy();
    expect(splitPrimaryEl.classList.contains('splitPrimaryFoo')).toBeTruthy();
    expect(splitMenuEl.classList.contains('splitMenuFoo')).toBeTruthy();
    expect(subMenuIconEl.classList.contains('subMenuIconFoo')).toBeTruthy();
    expect(linkContentMenuEl.classList.contains('linkContentMenuFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for checkable menu items', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'edit',
        text: 'Edit',
        canCheck: true,
        isChecked: false,
        onClick: () => console.log('Edit clicked'),
        getItemClassNames: customClassNames
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const checkmarkIconEl = document.querySelector('.checkmarkIconFoo') as HTMLElement;

    expect(checkmarkIconEl.classList.contains('checkmarkIconFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for menu items with icons', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        iconProps: {
          iconName: 'Clock'
        },
        text: 'Later Today',
        secondaryText: '7:00 PM',
        getItemClassNames: customClassNames
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const iconEl = document.querySelector('.iconFoo') as HTMLElement;

    expect(iconEl.classList.contains('iconFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for divider menu items', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        text: 'Later Today'
      },
      {
        key: 'divider_1',
        itemType: ContextualMenuItemType.Divider,
        getItemClassNames: customClassNames
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const dividerEl = document.querySelector('.dividerFoo') as HTMLElement;

    expect(dividerEl.classList.contains('dividerFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for menu items with secondary text', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        iconProps: {
          iconName: 'Clock'
        },
        text: 'Later Today',
        secondaryText: '7:00 PM',
        getItemClassNames: customClassNames
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const secondaryTextEl = document.querySelector('.secondaryTextFoo') as HTMLElement;

    expect(secondaryTextEl.classList.contains('secondaryTextFoo')).toBeTruthy();
  });

  it('applies getItemClassNames property if present on ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'newItem',
        text: 'New',
        onClick: () => console.log('New clicked'),
        getItemClassNames: customClassNames
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const itemEl = document.querySelector('.itemFoo') as HTMLElement;
    const rootEl = document.querySelector('.rootFoo') as HTMLElement;
    const linkContentEl = document.querySelector('.linkFoo') as HTMLElement;
    const labelEl = document.querySelector('.labelFoo') as HTMLElement;

    expect(itemEl.classList.contains('itemFoo')).toBeTruthy();
    expect(rootEl.classList.contains('rootFoo')).toBeTruthy();
    expect(linkContentEl.classList.contains('linkFoo')).toBeTruthy();
    expect(labelEl.classList.contains('labelFoo')).toBeTruthy();
  });

  it('closes on left arrow if it is a submenu', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' }
    ];

    let spyCalled = false;
    const onDismissSpy = (ev?: any, dismissAll?: boolean) => {
      spyCalled = true;
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} isSubMenu={true} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).toEqual(true);
  });

  it('does not close on left arrow if it is a submenu with horizontal arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' }
    ];

    let spyCalled = false;
    const onDismissSpy = (ev?: any, dismissAll?: boolean) => {
      spyCalled = true;
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
      <ContextualMenu
        items={items}
        isSubMenu={true}
        onDismiss={onDismissSpy}
        focusZoneProps={{ direction: FocusZoneDirection.horizontal }}
      />
    );

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).toEqual(false);
  });

  it('does not close on left arrow if it is a submenu with bidirectional arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1' },
      { name: 'TestText 2', key: 'TestKey2' },
      { name: 'TestText 3', key: 'TestKey3' },
      { name: 'TestText 4', key: 'TestKey4' }
    ];

    let spyCalled = false;
    const onDismissSpy = (ev?: any, dismissAll?: boolean) => {
      spyCalled = true;
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
      <ContextualMenu
        items={items}
        isSubMenu={true}
        onDismiss={onDismissSpy}
        focusZoneProps={{ direction: FocusZoneDirection.bidirectional }}
      />
    );

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(spyCalled).toEqual(false);
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
      }
    ];
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
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
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('opens a splitbutton submenu item on touch start', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        split: true,
        onClick: () => {
          alert('test');
        },
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

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.getElementsByName('TestText 1')[0] as HTMLButtonElement;

    // in a normal scenario, when we do a touchstart we would also cause a
    // click event to fire. This doesn't happen in the simulator so we're
    // manually adding this in.
    ReactTestUtils.Simulate.touchStart(menuItem);
    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.is-expanded')).toBeTruthy();
  });

  it('sets the correct aria-owns attribute for the submenu', () => {
    const submenuId = 'testSubmenuId';
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          id: submenuId,
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

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const parentMenuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(parentMenuItem);
    const childMenu = document.getElementById(submenuId);

    expect(childMenu!.id).toBe(submenuId);
    expect(parentMenuItem.getAttribute('aria-owns')).toBe(submenuId);
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
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('can focus on disabled items', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2',
        disabled: true
      },
      {
        name: 'TestText 3',
        key: 'TestKey3',
        isDisabled: true
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItems = document.querySelectorAll('button.ms-ContextualMenu-link') as NodeListOf<HTMLButtonElement>;
    expect(menuItems.length).toEqual(3);

    menuItems[0].focus();
    expect(document.activeElement.textContent).toEqual('TestText 1');
    expect(document.activeElement.className.split(' ')).not.toContain('is-disabled');

    menuItems[1].focus();
    expect(document.activeElement.textContent).toEqual('TestText 2');
    expect(document.activeElement.className.split(' ')).toContain('is-disabled');

    menuItems[2].focus();
    expect(document.activeElement.textContent).toEqual('TestText 3');
    expect(document.activeElement.className.split(' ')).toContain('is-disabled');
  });

  it('cannot click on disabled items', () => {
    const itemsClicked = [false, false, false];
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        onClick: () => (itemsClicked[0] = true)
      },
      {
        name: 'TestText 2',
        key: 'TestKey2',
        disabled: true,
        onClick: () => {
          itemsClicked[1] = true;
          fail('Disabled item should not be clickable');
        }
      },
      {
        name: 'TestText 3',
        key: 'TestKey3',
        isDisabled: true,
        onClick: () => {
          itemsClicked[2] = true;
          fail('Disabled item should not be clickable');
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItems = document.querySelectorAll('button.ms-ContextualMenu-link') as NodeListOf<HTMLButtonElement>;
    expect(menuItems.length).toEqual(3);

    menuItems[0].click();
    expect(itemsClicked[0]).toEqual(true);

    menuItems[1].click();
    expect(itemsClicked[1]).toEqual(false);

    menuItems[2].click();
    expect(itemsClicked[2]).toEqual(false);
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

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItems = document.querySelectorAll('li');

    expect(menuItems.length).toEqual(4);
    const headerOne = menuItems[0];
    const dividerOne = menuItems[2];
    const headerTwo = menuItems[3];

    expect(headerOne.className).not.toEqual(expect.stringMatching('divider'));
    expect(headerOne.firstElementChild!.className).toEqual(expect.stringMatching('header'));
    expect(dividerOne.className).toEqual(expect.stringMatching('divider'));
    expect(headerTwo.firstElementChild!.className).toEqual(expect.stringMatching('header'));
  });

  it('renders sections properly', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          key: 'Section1',
          topDivider: true,
          bottomDivider: true,
          items: [
            {
              name: 'TestText 2',
              key: 'TestKey2'
            },
            {
              name: 'TestText 3',
              key: 'TestKey3'
            }
          ]
        }
      },
      {
        name: 'TestText 4',
        key: 'TestKey4',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          key: 'Section1',
          items: [
            {
              name: 'TestText 5',
              key: 'TestKey5'
            },
            {
              name: 'TestText 6',
              key: 'TestKey6'
            }
          ]
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItems = document.querySelectorAll('li');
    expect(menuItems.length).toEqual(8);
  });

  describe('with links', () => {
    const testUrl = 'http://test.com';
    let items: IContextualMenuItem[];
    let menuItems: NodeListOf<Element>;
    let linkNoTarget: Element;
    let linkBlankTarget: Element;
    let linkBlankTargetAndRel: Element;
    let linkSelfTarget: Element;
    let linkNoTargetAndRel: Element;

    beforeEach(() => {
      items = [
        {
          name: 'TestText 1',
          key: 'TestKey1',
          href: testUrl
        },
        {
          name: 'TestText 2',
          key: 'TestKey2',
          href: testUrl,
          target: '_blank'
        },
        {
          name: 'TestText 3',
          key: 'TestKey3',
          href: testUrl,
          target: '_blank',
          rel: 'test'
        },
        {
          name: 'TestText 4',
          key: 'TestKey4',
          href: testUrl,
          target: '_self'
        },
        {
          name: 'TestText 5',
          key: 'TestKey5',
          href: testUrl,
          rel: 'test'
        }
      ];

      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

      menuItems = document.querySelectorAll('li a');
      linkNoTarget = menuItems[0];
      linkBlankTarget = menuItems[1];
      linkBlankTargetAndRel = menuItems[2];
      linkSelfTarget = menuItems[3];
      linkNoTargetAndRel = menuItems[4];
    });

    it('should render an anchor with the passed href', () => {
      expect(linkNoTarget.getAttribute('href')).toEqual(testUrl);
    });

    describe('with target passed', () => {
      it('should render with the specified target', () => {
        expect(linkSelfTarget.getAttribute('target')).toEqual('_self');
      });

      it('should not default the rel if the target is not _blank', () => {
        expect(linkSelfTarget.getAttribute('rel')).toBeNull();
      });

      describe('when the target is _blank and there is no rel specified', () => {
        it('should default a rel to prevent clickjacking', () => {
          expect(linkBlankTarget.getAttribute('rel')).toEqual('nofollow noopener noreferrer');
        });
      });

      describe('when the target is _blank and there is a rel specified', () => {
        it('should use the specified rel', () => {
          expect(linkBlankTargetAndRel.getAttribute('rel')).toEqual('test');
        });
      });
    });

    describe('with rel passed', () => {
      it('should add the specified rel', () => {
        expect(linkNoTargetAndRel.getAttribute('rel')).toEqual('test');
      });
    });
  });

  it('does not return a value if no items are given', () => {
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={[]} />);
    const menuList = document.querySelector('.ms-ContextualMenu-list');

    expect(menuList).toBeNull();
  });

  it('correctly focuses the first element', done => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    new Promise<any>(resolve => {
      let focusedItem;
      for (let i = 0; i < 20; i++) {
        focusedItem = document.querySelector('.testkey1')!.firstChild;
        if (focusedItem === document.activeElement) {
          break;
        }
      }
      expect(document.activeElement).toEqual(focusedItem);
      done();
      resolve();
    }).catch(done());
  });

  it('will not focus the first element when shouldFocusOnMount is false', done => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} shouldFocusOnMount={true} />);
    new Promise(resolve => {
      let focusedItem;
      for (let i = 0; i < 20; i++) {
        focusedItem = document.querySelector('.testkey1')!.firstChild;
        if (focusedItem === document.activeElement) {
          break;
        }
      }
      expect(document.activeElement).not.toEqual(focusedItem);
      done();
      resolve();
    }).catch(done);
  });

  it('Hover correctly focuses the second element', done => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2',
        className: 'testkey2'
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    new Promise<any>(resolve => {
      let focusedItem;
      for (let i = 0; i < 20; i++) {
        focusedItem = document.querySelector('.testkey2')!.firstChild;

        if (focusedItem) {
          const focusedItemElement = focusedItem as HTMLElement;
          const eventObject = document.createEvent('Events');
          eventObject.initEvent('mouseenter', true, false);
          focusedItemElement.dispatchEvent(eventObject);
        }
        if (focusedItem === document.activeElement) {
          break;
        }
      }
      expect(document.activeElement).toEqual(focusedItem);
      done();
      resolve();
    }).catch(done());
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
      <ContextualMenu
        items={[
          {
            name: 'TestText 0',
            key: 'TestKey0'
          }
        ]}
        calloutProps={{ className: 'foo' }}
      />
    );

    const callout = document.querySelector('.ms-Callout') as HTMLElement;
    expect(callout).toBeDefined();
    expect(callout.classList.contains('ms-ContextualMenu-Callout')).toBeTruthy();
    expect(callout.classList.contains('foo')).toBeTruthy();
  });

  it('Contextual Menu submenu has chrevron icon even if submenu has no items', () => {
    const menuWithEmptySubMenu: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: []
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={menuWithEmptySubMenu} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    expect(menuItem.querySelector('.ms-ContextualMenu-submenuIcon')).not.toEqual(null);
  });

  it('Contextual Menu submenu calls onMenuOpened on click even if submenu has no items', () => {
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

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={menuWithEmptySubMenu} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(menuItem);

    expect(subMenuOpened).toEqual(true);
  });

  it('calls the custom child renderer when the contextualMenuItemAs prop is provided', () => {
    const items: IContextualMenuItem[] = [
      {
        name: 'TestText 1',
        key: 'TestKey1'
      },
      {
        name: 'TestText 2',
        key: 'TestKey2'
      }
    ];
    const customRenderer = jest.fn(() => null);

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} contextualMenuItemAs={customRenderer} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);

    expect(customRenderer).toHaveBeenCalledTimes(2);
  });

  describe('canAnyMenuItemsCheck', () => {
    it('returns false when there are no checkable menu items', () => {
      const items: IContextualMenuItem[] = [
        { name: 'Item 1', key: 'Item 1' },
        { name: 'Item 2', key: 'Item 2' },
        { name: 'Item 3', key: 'Item 3' }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(false);
    });

    it('returns true when there is at least one checkable menu item', () => {
      const items: IContextualMenuItem[] = [
        { name: 'Item 1', key: 'Item 1' },
        { name: 'Item 2', key: 'Item 2', canCheck: true },
        { name: 'Item 3', key: 'Item 3' }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(true);
    });

    it('returns true when there is a menu section with an item that can check', () => {
      const items: IContextualMenuItem[] = [
        {
          name: 'Item 1',
          key: 'Item 1'
        },
        {
          name: 'Item 2',
          key: 'Item 2'
        },
        {
          name: 'Item 3',
          key: 'Item 3',
          sectionProps: {
            key: 'Section1',
            items: [{ name: 'Item 1', key: 'Item 1' }, { name: 'Item 2', key: 'Item 2', canCheck: true }, { name: 'Item 3', key: 'Item 3' }]
          }
        }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(true);
    });
  });

  describe('IContextualMenuRenderItem function tests', () => {
    const contextualItem = createRef<IContextualMenuRenderItem>();
    let menuDismissed: boolean;
    const onDismiss = (ev?: any, dismissAll?: boolean) => {
      menuDismissed = true;
    };

    describe('for a button element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            name: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            subMenuProps: {
              items: [
                {
                  name: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  name: 'Test3',
                  key: 'Test3',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ];
        ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu onDismiss={onDismiss} items={menu} />);
      });

      it('openSubMenu will open the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.value!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.value!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });

    describe('for a split button element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            name: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            split: true,
            subMenuProps: {
              items: [
                {
                  name: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  name: 'Test3',
                  key: 'Test3',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ];
        ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu onDismiss={onDismiss} items={menu} />);
      });

      it('openSubMenu will open the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.value!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.value!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });

    describe('for an anchor element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            name: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            href: '#test',
            subMenuProps: {
              items: [
                {
                  name: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  name: 'Test3',
                  key: 'Test3',
                  className: 'SubMenuClass'
                }
              ]
            }
          }
        ];
        ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu onDismiss={onDismiss} items={menu} />);
      });

      it('openSubMenu will open the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.value!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.value!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.value!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });
  });
});

describe('getItemClassNames', () => {
  // This test exists to validate that getItemClassNames signature has not changed
  // to avoid breaking internal partners relying on this private API.
  // See: https://github.com/OfficeDev/office-ui-fabric-react/pull/6738
  it('accepts an argument list of style props values', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });
    const isDisabled = false;
    const isExpanded = false;
    const isChecked = false;
    const isAnchorLink = false;
    const isKnownIcon = true;
    const dividerClassName = 'dividerFoo';
    const itemClassName = 'foo';
    const iconClassName = 'iconFoo';

    const itemClassNames = getItemClassNames(
      NoClassNamesTheme,
      isDisabled,
      isExpanded,
      isChecked,
      isAnchorLink,
      isKnownIcon,
      itemClassName,
      dividerClassName,
      iconClassName
    );

    expect(itemClassNames).toBeDefined();
  });

  it('applies custom classNames to style slots', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });
    const isDisabled = false;
    const isExpanded = false;
    const isChecked = false;
    const isAnchorLink = false;
    const isKnownIcon = true;
    const dividerClassName = 'dividerFoo';
    const itemClassName = 'foo';
    const iconClassName = 'iconFoo';

    const itemClassNames = getItemClassNames(
      NoClassNamesTheme,
      isDisabled,
      isExpanded,
      isChecked,
      isAnchorLink,
      isKnownIcon,
      itemClassName,
      dividerClassName,
      iconClassName
    );

    expect(itemClassNames.item).toContain('foo');
    expect(itemClassNames.divider).toContain('dividerFoo');
    expect(itemClassNames.icon).toContain('iconFoo');
  });
});
