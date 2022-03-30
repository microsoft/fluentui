import * as React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandBar } from './CommandBar';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '../../Utilities';
import type { IContextualMenuItem } from '../../ContextualMenu';

describe('CommandBar', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders commands correctly', () => {
    const { container } = render(
      <CommandBar
        items={[
          { key: '1', text: 'asdf' },
          { key: '2', text: 'asdf' },
        ]}
        className={'TestClassName'}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders empty farItems correctly', () => {
    const { container } = render(
      <CommandBar
        items={[
          { key: '1', text: 'asdf' },
          { key: '2', text: 'asdf' },
        ]}
        farItems={[]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: CommandBar,
    displayName: 'CommandBar',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });

  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const { getByRole } = render(
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
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );

    const menuItem = getByRole('menuitem', { hidden: true });
    userEvent.click(menuItem);
    expect(getByRole('menu')).toBeTruthy();
  });

  it('passes event and item to button onClick callbacks', () => {
    let testValue: IContextualMenuItem | undefined;

    const itemData: IContextualMenuItem = {
      text: 'TestText 1',
      key: 'TestKey1',
      className: 'MenuItem',
      data: {
        foo: 'bar',
      },
      onClick: (ev, item) => {
        testValue = item;
      },
    };

    const { getByRole } = render(<CommandBar items={[itemData]} />);

    const menuItem = getByRole('menuitem', { hidden: true });
    userEvent.click(menuItem);
    expect(testValue).toEqual(itemData);
  });

  it('keeps menu open after update if item is still present', () => {
    const items = [
      {
        text: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: {
          items: [
            {
              text: 'SubmenuText 1',
              key: 'SubmenuKey1',
              className: 'SubMenuClass',
            },
          ],
        },
      },
    ];
    const { getByRole, rerender } = render(<CommandBar items={items} />);

    const menuItem = getByRole('menuitem', { hidden: true });
    userEvent.click(menuItem);

    // Make sure the menu is open before the re-render
    expect(getByRole('menu')).toBeTruthy();

    // Update the props, and re-render
    items.push({
      text: 'Test Key 2',
      key: 'TestKey2',
      subMenuProps: { items: [{ text: 'SubmenuText 2', key: 'SubmenuKey2', className: 'SubmenuClass' }] },
    });
    rerender(<CommandBar items={items} />);

    // Make sure the menu is still open after the re-render
    expect(getByRole('menu')).toBeTruthy();
  });

  it('closes menu after update if item is not longer present', () => {
    const { getByRole, queryByRole, rerender } = render(
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
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );

    const menuItem = getByRole('menuitem', { hidden: true });
    userEvent.click(menuItem);

    // Make sure the menu is open before the re-render
    expect(getByRole('menu')).toBeTruthy();

    // Update the props, and re-render
    rerender(<CommandBar items={[]} />);

    // Make sure the menu is still open after the re-render
    expect(queryByRole('menu')).toBeNull();
  });

  it('passes overflowButton menuProps to the menu, and prepend menuProps.items to top of overflow', () => {
    const items = [
      {
        name: 'Text1',
        key: 'Key1',
      },
    ];

    const overFlowItems = [
      {
        name: 'Text2',
        key: 'Key2',
      },
    ];

    const { getByRole, getAllByRole } = render(
      <CommandBar
        overflowButtonProps={{
          menuProps: {
            items: [{ name: 'Text3', key: 'Key3' }],
            className: 'customMenuClass',
          },
        }}
        overflowItems={overFlowItems}
        items={items}
      />,
    );

    const overflowMenuButton = getAllByRole('menuitem', { hidden: true })[1];
    userEvent.click(overflowMenuButton);

    const overfowItems = within(getByRole('menu')).getAllByRole('menuitem');

    expect(overfowItems).toHaveLength(2);
    expect(overfowItems[0].textContent).toEqual('Text3');
    expect(overfowItems[1].textContent).toEqual('Text2');
    expect(getByRole('menu').querySelectorAll('.customMenuClass')!.length).toEqual(1);
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

    const { getByRole, rerender } = render(<CommandBar items={items('SubMenuClass')} />);

    const menuItem = getByRole('menuitem', { hidden: true });

    userEvent.click(menuItem);

    // Make sure the menu is open before the re-render
    expect(getByRole('menu')).toBeTruthy();

    // Update the props, and re-render
    rerender(<CommandBar items={items('SubMenuClassUpdate')} />);

    // Make sure the menu is still open after the re-render
    expect(getByRole('menu').querySelector('.SubMenuClassUpdate')).toBeTruthy();
  });
});
