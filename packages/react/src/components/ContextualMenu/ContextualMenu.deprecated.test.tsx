import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { KeyCodes, setWarningCallback } from '../../Utilities';
import { ContextualMenu } from './ContextualMenu';
import { ContextualMenuItemType } from './ContextualMenu.types';
import { mount } from 'enzyme';
import { getItemClassNames } from './ContextualMenu.classNames';
import { createTheme } from '../../Styling';
import type { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.types';
import type { IMenuItemClassNames } from './ContextualMenu.classNames';

let customClassNames: () => IMenuItemClassNames;

describe('ContextualMenu', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
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
        linkContentMenu: 'linkContentMenuFoo',
        screenReaderText: 'screenReaderText',
      };
    };
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
  });

  it('includes the classNames on ContextualMenuItem(s)', () => {
    const items: IContextualMenuItem[] = [
      { text: 'Header', key: 'Header', itemType: ContextualMenuItemType.Header },
      { name: 'Test 1', key: 'Test1' },
    ];

    const getClassNames = () => {
      return {
        container: 'containerFoo',
        root: 'rootFoo',
        list: 'listFoo',
        header: 'headerFoo',
        title: 'titleFoo',
        subComponentStyles: { callout: { root: ['calloutFoo'] }, menuItem: { root: ['itemFoo'] } },
      };
    };

    ReactTestUtils.renderIntoDocument<IContextualMenuProps>(
      <ContextualMenu items={items} getMenuClassNames={getClassNames} title="Menu!" />,
    );

    const container = document.querySelector('.containerFoo') as HTMLElement;
    const rootEl = document.querySelector('.rootFoo') as HTMLElement;
    const list = document.querySelector('.listFoo') as HTMLElement;
    const header = document.querySelector('.headerFoo') as HTMLElement;
    const title = document.querySelector('.titleFoo') as HTMLElement;

    expect(container).toBeTruthy();
    expect(rootEl).toBeTruthy();
    expect(list).toBeTruthy();
    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
  });

  it('applies in-line style property if present on ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [{ name: 'Test 1', key: 'Test1', style: { background: 'red' } }];

    const wrapper = mount(<ContextualMenu items={items} />);

    expect(wrapper.find('[background="red"]'));
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
              text: 'Share',
            },
          ],
        },
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

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
        getItemClassNames: customClassNames,
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const checkmarkIconEl = document.querySelector('.checkmarkIconFoo') as HTMLElement;

    expect(checkmarkIconEl.classList.contains('checkmarkIconFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for menu items with icons', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        iconProps: {
          iconName: 'Clock',
        },
        text: 'Later Today',
        secondaryText: '7:00 PM',
        getItemClassNames: customClassNames,
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const iconEl = document.querySelector('.iconFoo') as HTMLElement;

    expect(iconEl.classList.contains('iconFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for divider menu items', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        text: 'Later Today',
      },
      {
        key: 'divider_1',
        itemType: ContextualMenuItemType.Divider,
        getItemClassNames: customClassNames,
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const dividerEl = document.querySelector('.dividerFoo') as HTMLElement;

    expect(dividerEl.classList.contains('dividerFoo')).toBeTruthy();
  });

  it('applies getItemClassNames for menu items with secondary text', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'Later Today',
        iconProps: {
          iconName: 'Clock',
        },
        text: 'Later Today',
        secondaryText: '7:00 PM',
        getItemClassNames: customClassNames,
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const secondaryTextEl = document.querySelector('.secondaryTextFoo') as HTMLElement;

    expect(secondaryTextEl.classList.contains('secondaryTextFoo')).toBeTruthy();
  });

  it('applies getItemClassNames property if present on ContextualMenuItem', () => {
    const items: IContextualMenuItem[] = [
      {
        key: 'newItem',
        text: 'New',
        onClick: () => console.log('New clicked'),
        getItemClassNames: customClassNames,
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const itemEl = document.querySelector('.itemFoo') as HTMLElement;
    const rootEl = document.querySelector('.rootFoo') as HTMLElement;
    const linkContentEl = document.querySelector('.linkFoo') as HTMLElement;
    const labelEl = document.querySelector('.labelFoo') as HTMLElement;

    expect(itemEl.classList.contains('itemFoo')).toBeTruthy();
    expect(rootEl.classList.contains('rootFoo')).toBeTruthy();
    expect(linkContentEl.classList.contains('linkFoo')).toBeTruthy();
    expect(labelEl.classList.contains('labelFoo')).toBeTruthy();
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
            className: 'SubMenuClass',
          },
        ],
      },
    ];

    ReactTestUtils.act(() => {
      ReactTestUtils.renderIntoDocument<IContextualMenuProps>(<ContextualMenu items={items} />);
    });

    const menuItem = document.querySelector('button.ms-ContextualMenu-link') as HTMLButtonElement;
    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(menuItem, { which: KeyCodes.right });
    });

    expect(document.querySelector('.SubMenuClass')).toBeTruthy();
  });
});

describe('getItemClassNames', () => {
  // This test exists to validate that getItemClassNames signature has not changed
  // to avoid breaking internal partners relying on this private API.
  // See: https://github.com/microsoft/fluentui/pull/6738
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
      iconClassName,
    );

    expect(itemClassNames).toBeTruthy();
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
      iconClassName,
    );

    expect(itemClassNames.item).toContain('foo');
    expect(itemClassNames.divider).toContain('dividerFoo');
    expect(itemClassNames.icon).toContain('iconFoo');
  });
});
