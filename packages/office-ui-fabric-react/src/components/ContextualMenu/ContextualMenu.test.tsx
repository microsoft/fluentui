import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes } from '../../Utilities';
import { FocusZoneDirection } from '../../FocusZone';
import * as renderer from 'react-test-renderer';
// Have to import this separately for mock purposes
import * as Utilities from '../../Utilities';

import { IContextualMenuProps, IContextualMenuStyles, IContextualMenu } from './ContextualMenu.types';
import { ContextualMenu } from './ContextualMenu';
import { canAnyMenuItemsCheck } from './ContextualMenu.base';
import { IContextualMenuItem, ContextualMenuItemType } from './ContextualMenu.types';
import { IContextualMenuRenderItem, IContextualMenuItemStyles } from './ContextualMenuItem.types';
import { DefaultButton, IButton } from 'office-ui-fabric-react/lib/Button';

describe('ContextualMenu', () => {
  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  /**
   * Needed to make initial focus work: mock focusFirstChild to mark all child elements as visible,
   * then call the real version.
   */
  function mockFocusFirstChild() {
    const realFocusFirstChild = Utilities.focusFirstChild;
    jest.spyOn(Utilities, 'focusFirstChild').mockImplementation((rootElement: HTMLElement) => {
      function markAllVisible(element: Element) {
        (element as any).isVisible = true;
        if (element.children.length) {
          for (let i = 0; i < element.children.length; i++) {
            markAllVisible(element.children[i]);
          }
        }
      }
      markAllVisible(rootElement);
      return realFocusFirstChild(rootElement);
    });
  }

  it('allows setting aria-label per ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [{ text: 'Later Today', key: 'Today', secondaryText: '7:00 PM', ariaLabel: 'foo' }];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItemButtonEl = document.querySelector('.ms-ContextualMenu-link') as HTMLButtonElement;
    const ariaLabel = menuItemButtonEl.getAttribute('aria-label');

    expect(ariaLabel).toBe('foo');
  });

  // By default, do not set aria-label with value set to item text only.
  // This is to ensure that screen-readers read both primary and (optional) secondary text,
  // unless aria-label set explicitly. See https://github.com/OfficeDev/office-ui-fabric-react/pull/6670.
  it('by default aria-label is undefined per ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [{ text: 'Later Today', key: 'Today', secondaryText: '7:00 PM' }];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItemButtonEl = document.querySelector('.ms-ContextualMenu-link') as HTMLButtonElement;
    const hasAriaLabel = menuItemButtonEl.hasAttribute('aria-label');

    expect(hasAriaLabel).toBe(false);
  });

  it('renders secondary text if provided per ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [{ text: 'Later Today', key: 'Today', secondaryText: 'foo' }];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItemPrimaryText = document.querySelector('.ms-ContextualMenu-itemText') as HTMLSpanElement;
    const menuItemSecondaryText = document.querySelector('.ms-ContextualMenu-secondaryText') as HTMLSpanElement;

    expect(menuItemPrimaryText.textContent).toBe('Later Today');
    expect(menuItemSecondaryText.textContent).toBe('foo');
  });

  it('does not have a scrollbar due to an overflowing icon', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1', canCheck: true, isChecked: true },
      { text: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
      { text: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
      { text: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuList = document.querySelector('.ms-ContextualMenu-list') as HTMLUListElement;

    expect(menuList.scrollHeight).toBeLessThanOrEqual(menuList.offsetHeight);
  });

  it('closes on left arrow if it is a submenu', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} isSubMenu={true} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.left });

    expect(onDismissSpy).toHaveBeenCalled();
  });

  it('menu closes on alt only', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.alt });
    ReactTestUtils.Simulate.keyUp(menuList, { which: KeyCodes.alt });

    expect(onDismissSpy).toHaveBeenCalled();
  });

  it('menu closes on alt + up arrow', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.up, altKey: true });

    expect(onDismissSpy).toHaveBeenCalled();
  });

  it('menu closes on alt + up arrow', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.escape });

    expect(onDismissSpy).toHaveBeenCalled();
  });

  it('menu does not close on alt + other key', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} onDismiss={onDismissSpy} />);

    const menuList = document.querySelector('ul.ms-ContextualMenu-list') as HTMLUListElement;
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.alt });
    ReactTestUtils.Simulate.keyDown(menuList, { which: KeyCodes.a, altKey: true });
    ReactTestUtils.Simulate.keyUp(menuList, { which: KeyCodes.a, altKey: true });
    ReactTestUtils.Simulate.keyUp(menuList, { which: KeyCodes.alt });

    expect(onDismissSpy).toHaveBeenCalledTimes(0);
  });

  it('does not close on left arrow if it is a submenu with horizontal arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

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

    expect(onDismissSpy).toHaveBeenCalledTimes(0);
  });

  it('does not close on left arrow if it is a submenu with bidirectional arrowDirection', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1' },
      { text: 'TestText 2', key: 'TestKey2' },
      { text: 'TestText 3', key: 'TestKey3' },
      { text: 'TestText 4', key: 'TestKey4' }
    ];

    const onDismissSpy = jest.fn();

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

    expect(onDismissSpy).toHaveBeenCalledTimes(0);
  });

  it('opens a submenu item on right arrow', () => {
    const items: IContextualMenuItem[] = [
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
    ];
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('opens a submenu item on click', () => {
    const items: IContextualMenuItem[] = [
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;

    ReactTestUtils.Simulate.click(menuItem);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('opens a submenu item on alt+Down', () => {
    const items: IContextualMenuItem[] = [
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.down, altKey: true });

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('closes a submenu item on alt+up', () => {
    const items: IContextualMenuItem[] = [
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);
    let menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(2);
    ReactTestUtils.Simulate.keyDown(menuList[1], { which: KeyCodes.up, altKey: true });
    menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(1);

    expect(document.querySelector('.SubMenuClass')).toBeNull();
  });

  it('closes a submenu item on esc', () => {
    const items: IContextualMenuItem[] = [
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);
    let menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(2);
    ReactTestUtils.Simulate.keyDown(menuList[1], { which: KeyCodes.escape });
    menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(1);

    expect(document.querySelector('.SubMenuClass')).toBeNull();
  });

  it('closes all menus on alt only', () => {
    let menuDismissed = false;
    let dismissedAll = false;
    const onDismiss = (ev?: any, dismissAll?: boolean) => {
      menuDismissed = true;
      dismissedAll = !!dismissAll;
    };
    const items: IContextualMenuItem[] = [
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
          ],
          onDismiss: onDismiss
        }
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);
    const menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(2);
    ReactTestUtils.Simulate.keyDown(menuList[1], { which: KeyCodes.alt });
    ReactTestUtils.Simulate.keyUp(menuList[1], { which: KeyCodes.alt });
    expect(menuDismissed).toBeTruthy();
    expect(dismissedAll).toBeTruthy();
  });

  it('does not close any menus item alt + other key', () => {
    const items: IContextualMenuItem[] = [
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);
    let menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(2);
    ReactTestUtils.Simulate.keyDown(menuList[1], { which: KeyCodes.alt });
    ReactTestUtils.Simulate.keyDown(menuList[1], { which: KeyCodes.a, altKey: true });
    ReactTestUtils.Simulate.keyUp(menuList[1], { which: KeyCodes.a, altKey: true });
    ReactTestUtils.Simulate.keyUp(menuList[1], { which: KeyCodes.alt });
    menuList = document.querySelectorAll('ul.ms-ContextualMenu-list');
    expect(menuList.length).toEqual(2);

    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });

  it('opens a splitbutton submenu item on touch start', () => {
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        split: true,
        onClick: () => {
          alert('test');
        },
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
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItem = document.getElementsByTagName('button')[0] as HTMLButtonElement;

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
        text: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          id: submenuId,
          items: [
            {
              text: 'SubmenuText 1',
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

  it('can focus on disabled items', () => {
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1'
      },
      {
        text: 'TestText 2',
        key: 'TestKey2',
        disabled: true
      },
      {
        text: 'TestText 3',
        key: 'TestKey3',
        isDisabled: true
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const menuItems = document.querySelectorAll('button.ms-ContextualMenu-link') as NodeListOf<HTMLButtonElement>;
    expect(menuItems.length).toEqual(3);

    menuItems[0].focus();
    expect(document.activeElement!.textContent).toEqual('TestText 1');
    expect(document.activeElement!.className.split(' ')).not.toContain('is-disabled');

    menuItems[1].focus();
    expect(document.activeElement!.textContent).toEqual('TestText 2');
    expect(document.activeElement!.className.split(' ')).toContain('is-disabled');

    menuItems[2].focus();
    expect(document.activeElement!.textContent).toEqual('TestText 3');
    expect(document.activeElement!.className.split(' ')).toContain('is-disabled');
  });

  it('cannot click on disabled items', () => {
    const itemsClicked = [false, false, false];
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        onClick: () => (itemsClicked[0] = true)
      },
      {
        text: 'TestText 2',
        key: 'TestKey2',
        disabled: true,
        onClick: () => {
          itemsClicked[1] = true;
          fail('Disabled item should not be clickable');
        }
      },
      {
        text: 'TestText 3',
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
        text: 'TestText 1',
        key: 'TestKey1',
        itemType: ContextualMenuItemType.Header
      },
      {
        text: 'TestText 2',
        key: 'TestKey3'
      },
      {
        text: 'TestText 3',
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
        text: 'TestText 1',
        key: 'TestKey1',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          key: 'Section1',
          topDivider: true,
          bottomDivider: true,
          items: [
            {
              text: 'TestText 2',
              key: 'TestKey2'
            },
            {
              text: 'TestText 3',
              key: 'TestKey3'
            }
          ]
        }
      },
      {
        text: 'TestText 4',
        key: 'TestKey4',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          key: 'Section1',
          items: [
            {
              text: 'TestText 5',
              key: 'TestKey5'
            },
            {
              text: 'TestText 6',
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
          text: 'TestText 1',
          key: 'TestKey1',
          href: testUrl
        },
        {
          text: 'TestText 2',
          key: 'TestKey2',
          href: testUrl,
          target: '_blank'
        },
        {
          text: 'TestText 3',
          key: 'TestKey3',
          href: testUrl,
          target: '_blank',
          rel: 'test'
        },
        {
          text: 'TestText 4',
          key: 'TestKey4',
          href: testUrl,
          target: '_self'
        },
        {
          text: 'TestText 5',
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

      it('when the target is _blank and no rel is specified, defaults a rel to prevent clickjacking', () => {
        expect(linkBlankTarget.getAttribute('rel')).toEqual('nofollow noopener noreferrer');
      });

      it('when the target is _blank and rel is specified, uses the specified rel', () => {
        expect(linkBlankTargetAndRel.getAttribute('rel')).toEqual('test');
      });
    });

    describe('with rel passed', () => {
      it('should add the specified rel', () => {
        expect(linkNoTargetAndRel.getAttribute('rel')).toEqual('test');
      });
    });
  });

  it('does not render a list if no items are given', () => {
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={[]} />);
    const menuList = document.querySelector('.ms-ContextualMenu-list');

    expect(menuList).toBeNull();
  });

  it('correctly focuses the first element', () => {
    jest.useFakeTimers();
    mockFocusFirstChild();
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        text: 'TestText 2',
        key: 'TestKey2'
      }
    ];

    ReactTestUtils.renderIntoDocument(<ContextualMenu items={items} />);
    jest.runAllTimers();

    const focusedItem = document.querySelector('.testkey1')!.firstChild;
    expect(document.activeElement).toEqual(focusedItem);
  });

  it('will not focus the first element when shouldFocusOnMount is false', () => {
    jest.useFakeTimers();
    mockFocusFirstChild();
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        text: 'TestText 2',
        key: 'TestKey2'
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} shouldFocusOnMount={true} />);
    jest.runAllTimers();

    const focusedItem = document.querySelector('.testkey1')!.firstChild;
    expect(document.activeElement).toEqual(focusedItem);
  });

  it('Correctly focuses the second element on hover', () => {
    jest.useFakeTimers();
    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        className: 'testkey1'
      },
      {
        text: 'TestText 2',
        key: 'TestKey2',
        className: 'testkey2'
      }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    jest.runAllTimers();

    const itemToFocus = document.querySelector('.testkey2')!.firstChild as HTMLElement;
    ReactTestUtils.Simulate.mouseMove(itemToFocus);
    ReactTestUtils.Simulate.mouseEnter(itemToFocus);
    jest.runAllTimers();
    expect(document.activeElement).toEqual(itemToFocus);
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
      <ContextualMenu
        items={[
          {
            text: 'TestText 0',
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
        text: 'TestText 1',
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
        text: 'TestText 1',
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
        text: 'TestText 1',
        key: 'TestKey1'
      },
      {
        text: 'TestText 2',
        key: 'TestKey2'
      }
    ];
    const customRenderer = jest.fn(() => null);

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} contextualMenuItemAs={customRenderer} />);

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuItem);

    expect(customRenderer).toHaveBeenCalledTimes(2);
  });

  describe('ContextualMenu snapshot', () => {
    it('ContextualMenu should be present in DOM when hidden (snapshot)', () => {
      // Mock createPortal to capture its component hierarchy in snapshot output.
      const ReactDOM = require('react-dom');
      const createPortal = ReactDOM.createPortal;
      ReactDOM.createPortal = jest.fn(element => {
        return element;
      });
      const buttonRef = React.createRef<IButton>();
      const component = renderer.create(
        <DefaultButton
          persistMenu={true}
          componentRef={buttonRef}
          menuProps={{
            items: [
              {
                text: 'Test1',
                key: 'Test1',
                subMenuProps: {
                  items: [
                    {
                      text: 'Test2',
                      key: 'Test2',
                      className: 'SubMenuClass'
                    }
                  ]
                }
              }
            ],
            hidden: false
          }}
        />
      );
      buttonRef.current!.openMenu();
      buttonRef.current!.dismissMenu();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      ReactDOM.createPortal = createPortal;
    });
  });

  describe('ContextualMenu with hidden prop tests', () => {
    const contextualItem = React.createRef<IContextualMenuRenderItem>();
    const contextualMenu = React.createRef<IContextualMenu>();
    const button = React.createRef<IButton>();
    const menu: IContextualMenuItem[] = [
      {
        text: 'Test1',
        key: 'Test1',
        componentRef: contextualItem,
        subMenuProps: {
          items: [
            {
              text: 'Test2',
              key: 'Test2',
              className: 'SubMenuClass'
            },
            {
              text: 'Test3',
              key: 'Test3',
              className: 'SubMenuClass'
            }
          ]
        }
      }
    ];

    beforeEach(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
        <DefaultButton
          persistMenu={true}
          componentRef={button}
          menuProps={{
            items: menu,
            hidden: false,
            componentRef: contextualMenu
          }}
        />
      );
    });

    it('ContextualMenu should be present in DOM when hidden', () => {
      button.current!.openMenu();
      button.current!.dismissMenu();
      expect(document.querySelector('.ms-ContextualMenu-Callout')).not.toEqual(null);
    });

    it('Submenu should not be shown when ContextualMenu is hidden', () => {
      // 1. Open parent menu
      button.current!.openMenu();
      expect(document.querySelector('.ms-ContextualMenu-Callout')).not.toEqual(null);

      // 2. Open sub menu
      contextualItem.current!.openSubMenu();
      expect(document.querySelector('.SubMenuClass')).not.toEqual(null);

      // 3. Dismiss parent menu - sub menu should disappear from DOM.
      // Submenus are not persisted using the hidden prop as of now
      button.current!.dismissMenu();
      expect(document.querySelector('.SubMenuClass')).toEqual(null);
    });

    it('Submenu should not be shown by default when ContextualMenu is shown', () => {
      // 1. Open parent menu
      button.current!.openMenu();
      expect(document.querySelector('.ms-ContextualMenu-Callout')).not.toEqual(null);

      // 2. Open sub menu
      contextualItem.current!.openSubMenu();
      expect(document.querySelector('.SubMenuClass')).not.toEqual(null);

      // 3. Dismiss parent menu - sub menu should disappear from DOM.
      button.current!.dismissMenu();
      expect(document.querySelector('.SubMenuClass')).toEqual(null);

      // 4. Reopen parent menu - sub menu should not be present by default
      button.current!.openMenu();
      expect(document.querySelector('.SubMenuClass')).toEqual(null);
    });
  });

  describe('canAnyMenuItemsCheck', () => {
    it('returns false when there are no checkable menu items', () => {
      const items: IContextualMenuItem[] = [
        { text: 'Item 1', key: 'Item 1' },
        { text: 'Item 2', key: 'Item 2' },
        { text: 'Item 3', key: 'Item 3' }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(false);
    });

    it('returns true when there is at least one checkable menu item', () => {
      const items: IContextualMenuItem[] = [
        { text: 'Item 1', key: 'Item 1' },
        { text: 'Item 2', key: 'Item 2', canCheck: true },
        { text: 'Item 3', key: 'Item 3' }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(true);
    });

    it('returns true when there is a menu section with an item that can check', () => {
      const items: IContextualMenuItem[] = [
        {
          text: 'Item 1',
          key: 'Item 1'
        },
        {
          text: 'Item 2',
          key: 'Item 2'
        },
        {
          text: 'Item 3',
          key: 'Item 3',
          sectionProps: {
            key: 'Section1',
            items: [{ text: 'Item 1', key: 'Item 1' }, { text: 'Item 2', key: 'Item 2', canCheck: true }, { text: 'Item 3', key: 'Item 3' }]
          }
        }
      ];

      expect(canAnyMenuItemsCheck(items)).toEqual(true);
    });
  });

  describe('IContextualMenuRenderItem function tests', () => {
    const contextualItem = React.createRef<IContextualMenuRenderItem>();
    let menuDismissed: boolean;
    const onDismiss = (ev?: any, dismissAll?: boolean) => {
      menuDismissed = true;
    };

    describe('for a button element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            text: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            subMenuProps: {
              items: [
                {
                  text: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  text: 'Test3',
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
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.current!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.current!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });

    describe('for a split button element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            text: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            split: true,
            subMenuProps: {
              items: [
                {
                  text: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  text: 'Test3',
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
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.current!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.current!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });

    describe('for an anchor element', () => {
      beforeEach(() => {
        menuDismissed = false;
        const menu: IContextualMenuItem[] = [
          {
            text: 'Test1',
            key: 'Test1',
            componentRef: contextualItem,
            href: '#test',
            subMenuProps: {
              items: [
                {
                  text: 'Test2',
                  key: 'Test2',
                  className: 'SubMenuClass'
                },
                {
                  text: 'Test3',
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
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
      });

      it('dismissSubMenu will close the item`s submenu if present', () => {
        contextualItem.current!.openSubMenu();
        expect(document.querySelector('.SubMenuClass')).not.toEqual(null);
        contextualItem.current!.dismissSubMenu();
        expect(document.querySelector('.SubMenuClass')).toEqual(null);
      });

      it('dismissMenu will close the item`s menu', () => {
        contextualItem.current!.dismissMenu();
        expect(menuDismissed).toEqual(true);
      });
    });
  });

  it('applies styles prop for menu if provided', () => {
    const items: IContextualMenuItem[] = [
      { text: 'TestText 1', key: 'TestKey1', canCheck: true, isChecked: true },
      { text: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
      { text: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
      { text: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true }
    ];

    const getCustomStyles = (): IContextualMenuStyles => {
      return {
        container: 'containerFoo',
        root: 'rootFoo',
        list: 'listFoo',
        header: 'headerFoo',
        title: 'titleFoo',
        subComponentStyles: { callout: { root: ['calloutFoo'] }, menuItem: { root: ['itemFoo'] } }
      };
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} styles={getCustomStyles} />);

    const container = document.querySelector('.containerFoo') as HTMLElement;
    const rootEl = document.querySelector('.rootFoo') as HTMLElement;
    const list = document.querySelector('.listFoo') as HTMLElement;
    const header = document.querySelector('.ms-ContextualMenu-header') as HTMLElement;
    const title = document.querySelector('.ms-ContextualMenu-title') as HTMLElement;

    expect(container).toBeDefined();
    expect(rootEl).toBeDefined();
    expect(list).toBeDefined();
    expect(header).toBeDefined();
    expect(title).toBeDefined();
  });

  it('applies styles per ContextualMenuItem if provided', () => {
    const getCustomItemStyles = (): Partial<IContextualMenuItemStyles> => {
      return {
        linkContent: 'linkContentFoo'
      };
    };

    const items: IContextualMenuItem[] = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        canCheck: true,
        isChecked: true,
        itemProps: { styles: getCustomItemStyles }
      },
      { text: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
      { text: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
      { text: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true }
    ];

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);

    const customLinkContentEls = document.querySelectorAll('.linkContentFoo') as NodeListOf<HTMLElement>;

    expect(customLinkContentEls.length).toBe(1);
  });
});
