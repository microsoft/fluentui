import * as React from 'react';
import { act, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandBar } from './CommandBar';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '../../Utilities';
import type { IContextualMenuItem } from '../../ContextualMenu';
import type { ICommandBar, ICommandBarItemProps } from './CommandBar.types';

describe('CommandBar', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
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
    jest.useFakeTimers();

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
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const menuItem = getByRole('menuitem');
    userEvent.click(menuItem);
    expect(getByRole('menu')).toBeTruthy();
  });

  it('passes event and item to button onClick callbacks', () => {
    jest.useFakeTimers();

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

    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const menuItem = getByRole('menuitem');
    userEvent.click(menuItem);
    expect(testValue).toEqual(itemData);
  });

  it('keeps menu open after update if item is still present', () => {
    jest.useFakeTimers();

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

    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const menuItem = getByRole('menuitem');
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

    act(() => {
      jest.runAllTimers();
    });

    // Make sure the menu is still open after the re-render
    expect(getByRole('menu')).toBeTruthy();
  });

  it('closes menu after update if item is no longer present', () => {
    jest.useFakeTimers();

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

    const { getByRole, queryByRole, rerender } = render(<CommandBar items={items} />);

    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const menuItem = getByRole('menuitem');
    userEvent.click(menuItem);

    // Make sure the menu is open before the re-render
    expect(getByRole('menu')).toBeTruthy();

    // Update the props, and re-render
    rerender(<CommandBar items={[]} />);

    act(() => {
      jest.runAllTimers();
    });

    // Make sure the menu is still open after the re-render
    expect(queryByRole('menu')).toBeNull();
  });

  it('passes overflowButton menuProps to the menu, and prepend menuProps.items to top of overflow', () => {
    jest.useFakeTimers();

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

    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const overflowMenuButton = getAllByRole('menuitem')[1];
    userEvent.click(overflowMenuButton);

    const overfowItems = within(getByRole('menu')).getAllByRole('menuitem');

    expect(overfowItems).toHaveLength(2);
    expect(overfowItems[0].textContent).toEqual('Text3');
    expect(overfowItems[1].textContent).toEqual('Text2');
    expect(getByRole('menu').querySelectorAll('.customMenuClass')!.length).toEqual(1);
  });

  it('updates menu after update if item is still present', () => {
    jest.useFakeTimers();

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

    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const menuItem = getByRole('menuitem');

    userEvent.click(menuItem);

    // Make sure the menu is open before the re-render
    expect(getByRole('menu')).toBeTruthy();

    // Update the props, and re-render
    rerender(<CommandBar items={items('SubMenuClassUpdate')} />);

    act(() => {
      jest.runAllTimers();
    });

    // Make sure the menu is still open after the re-render
    expect(getByRole('menu').querySelector('.SubMenuClassUpdate')).toBeTruthy();
  });

  it('keeps focus() working after remeasure()', () => {
    jest.useFakeTimers();
    // jsdom has no layout, so focus() takes every element for hidden unless it has an offsetParent.
    const offsetParent = jest
      .spyOn(HTMLElement.prototype, 'offsetParent', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return this.parentElement;
      });
    // A measurement pass ends in a render that schedules the next pass, and focus() moves the focus in the
    // next frame, so run the timers until none are left.
    const runAllTimers = () => {
      for (let pass = 0; pass < 20 && jest.getTimerCount() > 0; pass++) {
        act(() => {
          jest.runAllTimers();
        });
      }
    };

    try {
      const commandBar = React.createRef<ICommandBar>();
      const { getAllByRole } = render(
        <CommandBar
          componentRef={commandBar}
          items={[
            { key: '1', text: 'First' },
            { key: '2', text: 'Second' },
          ]}
        />,
      );
      runAllTimers();

      act(() => {
        commandBar.current!.focus();
      });
      runAllTimers();
      expect(document.activeElement).toBe(getAllByRole('menuitem')[0]);
      act(() => {
        (document.activeElement as HTMLElement).blur();
      });
      expect(document.activeElement).toBe(document.body);

      // remeasure() renders a hidden copy of the items to measure them, and removes it again.
      act(() => {
        commandBar.current!.remeasure();
      });
      runAllTimers();

      act(() => {
        commandBar.current!.focus();
      });
      runAllTimers();
      expect(document.activeElement).toBe(getAllByRole('menuitem')[0]);
    } finally {
      offsetParent.mockRestore();
    }
  });

  describe('remeasure() and items that come back from the overflow menu', () => {
    // jsdom has no layout, so the tests set the width of one button and of the bar.
    let buttonWidth: number;
    let barWidth: number;
    const commandBar = React.createRef<ICommandBar>();
    let items: ICommandBarItemProps[];
    let onDataGrown: jest.Mock;
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    const runAllTimers = () => {
      for (let pass = 0; pass < 20 && jest.getTimerCount() > 0; pass++) {
        act(() => {
          jest.runAllTimers();
        });
      }
      expect(jest.getTimerCount()).toBe(0);
    };
    const remeasure = () => {
      act(() => {
        commandBar.current!.remeasure();
      });
      runAllTimers();
    };

    beforeEach(() => {
      jest.useFakeTimers();
      buttonWidth = 100;
      barWidth = 250;
      Element.prototype.getBoundingClientRect = function (this: HTMLElement): DOMRect {
        let width = 0;
        if (this.style.position === 'fixed' && this.style.visibility === 'hidden') {
          // The div that the ResizeGroup renders the items into to measure them.
          width = this.querySelectorAll('button').length * buttonWidth;
        } else if (this.firstElementChild?.lastElementChild?.getAttribute('data-automation-id') === 'visibleContent') {
          // The root of the ResizeGroup.
          width = barWidth;
        }
        return { width, height: 0, top: 0, right: width, bottom: 0, left: 0, x: 0, y: 0 } as DOMRect;
      };

      items = [
        { key: '1', text: 'First' },
        { key: '2', text: 'Second' },
        { key: '3', text: 'Third' },
      ];
      onDataGrown = jest.fn();
      render(<CommandBar componentRef={commandBar} items={items} onDataGrown={onDataGrown} />);
      runAllTimers();
      // Three buttons do not fit in 250px, and neither do two buttons and the overflow button.
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, true, true]);
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('updates the items when the bar has more room', () => {
      barWidth = 400;
      remeasure();

      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, false, false]);
      expect(onDataGrown.mock.calls.map(([item]) => item.key)).toEqual(['2', '3']);
    });

    it('updates the items when the items have become smaller', () => {
      buttonWidth = 50;
      remeasure();

      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, false, false]);
      expect(onDataGrown.mock.calls.map(([item]) => item.key)).toEqual(['2', '3']);
    });
  });
});
