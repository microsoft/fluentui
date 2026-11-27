import * as React from 'react';
import { act, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandBar } from './CommandBar';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '../../Utilities';
import type { IButtonProps } from '../../Button';
import type { IContextualMenuItem } from '../../ContextualMenu';
import type { ICommandBar, ICommandBarItemProps, ICommandBarProps } from './CommandBar.types';

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

  describe('remeasure() and the items in the overflow menu', () => {
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
    // What a buttonAs component gets: the props of the button, with the flag of the item among them.
    type IRenderedButtonProps = IButtonProps & Pick<ICommandBarItemProps, 'renderedInOverflow'>;
    const renderBar = (barItems: ICommandBarItemProps[], props: Partial<ICommandBarProps> = {}) => {
      items = barItems;
      onDataGrown = jest.fn();
      render(<CommandBar componentRef={commandBar} items={items} onDataGrown={onDataGrown} {...props} />);
      runAllTimers();
    };
    const renderDefaultButtons = () => {
      renderBar([
        { key: '1', text: 'First' },
        { key: '2', text: 'Second' },
        { key: '3', text: 'Third' },
      ]);
      // Three buttons do not fit in 250px, and neither do two buttons and the overflow button.
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, true, true]);
    };

    beforeEach(() => {
      jest.useFakeTimers();
      buttonWidth = 100;
      barWidth = 250;
      Element.prototype.getBoundingClientRect = function (this: HTMLElement): DOMRect {
        let width = 0;
        if (this.style.position === 'fixed' && this.style.visibility === 'hidden') {
          // The div that the ResizeGroup renders the items into to measure them. A button can say how wide it
          // is, and every other button has the same width.
          this.querySelectorAll('button').forEach(button => {
            width += Number(button.getAttribute('data-width') ?? buttonWidth);
          });
        } else if (this.firstElementChild?.lastElementChild?.getAttribute('data-automation-id') === 'visibleContent') {
          // The root of the ResizeGroup.
          width = barWidth;
        }
        return { width, height: 0, top: 0, right: width, bottom: 0, left: 0, x: 0, y: 0 } as DOMRect;
      };
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('updates the items when the bar has more room', () => {
      renderDefaultButtons();
      barWidth = 400;
      remeasure();

      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, false, false]);
      expect(onDataGrown.mock.calls.map(([item]) => item.key)).toEqual(['2', '3']);
    });

    it('updates the items when the items have become smaller', () => {
      renderDefaultButtons();
      buttonWidth = 50;
      remeasure();

      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, false, false]);
      expect(onDataGrown.mock.calls.map(([item]) => item.key)).toEqual(['2', '3']);
    });

    it('leaves the items alone when nothing has changed and a render function reads renderedInOverflow', () => {
      // Each item says how wide it is: 100px in the bar, and half of that in the overflow menu. The overflow
      // button is 20px wide.
      buttonWidth = 20;
      const onRender = (item: ICommandBarItemProps) => (
        <button data-width={item.renderedInOverflow ? 50 : 100}>{item.text}</button>
      );
      renderBar(['First', 'Second', 'Third'].map(text => ({ key: text, text, onRender })));
      // Three items do not fit in 250px. Two items and the overflow button do.
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);

      remeasure();

      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);
      expect(onDataGrown).not.toHaveBeenCalled();
    });

    it('keeps the items where they are when a render function reads which items the bar has moved', () => {
      // The same items, but each one looks up in a set whether it is in the overflow menu. The application
      // keeps that set up to date in onDataReduced and onDataGrown.
      buttonWidth = 20;
      const inMenu = new Set<string>();
      const onRender = (item: ICommandBarItemProps) => (
        <button data-width={inMenu.has(item.key) ? 50 : 100}>{item.text}</button>
      );
      const onDataReduced = (item: ICommandBarItemProps) => {
        inMenu.add(item.key);
      };
      const onDataGrownToBar = jest.fn((item: ICommandBarItemProps) => {
        inMenu.delete(item.key);
      });
      renderBar(
        ['First', 'Second', 'Third'].map(text => ({ key: text, text, onRender })),
        { onDataReduced, onDataGrown: onDataGrownToBar },
      );
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);

      // The check renders all three items in the bar while the third one is in the menu, so it measures 250px
      // and not the 300px of the first pass. The new fit measures every step itself and ends where it started.
      remeasure();
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);
      expect(onDataGrownToBar.mock.calls.map(([item]) => item.key)).toEqual(['Third']);

      // A second call takes the same measurement as the first one, and nothing is fit again.
      remeasure();
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);
      expect(onDataGrownToBar).toHaveBeenCalledTimes(1);
    });

    it('keeps the items where they are when the application renders the bar again from its callbacks', () => {
      // The items of the test before, but the application keeps the set of items in the overflow menu in its
      // state. Each change renders the bar again, and the bar gives its ResizeGroup a new data object with the
      // same cacheKey.
      buttonWidth = 20;
      let inMenu = new Set<string>();
      const onRender = (item: ICommandBarItemProps) => (
        <button data-width={inMenu.has(item.key) ? 50 : 100}>{item.text}</button>
      );
      const barItems: ICommandBarItemProps[] = ['First', 'Second', 'Third'].map(text => ({
        key: text,
        text,
        onRender,
      }));
      const onDataGrownToBar = jest.fn();
      const App = () => {
        const [menuKeys, setMenuKeys] = React.useState(() => new Set<string>());
        inMenu = menuKeys;
        const handleDataReduced = (item: ICommandBarItemProps) =>
          setMenuKeys(keys => (keys.has(item.key) ? keys : new Set(keys).add(item.key)));
        const handleDataGrown = (item: ICommandBarItemProps) => {
          onDataGrownToBar(item);
          setMenuKeys(keys => {
            if (!keys.has(item.key)) {
              return keys;
            }
            const next = new Set(keys);
            next.delete(item.key);
            return next;
          });
        };
        return (
          <CommandBar
            componentRef={commandBar}
            items={barItems}
            onDataReduced={handleDataReduced}
            onDataGrown={handleDataGrown}
          />
        );
      };
      render(<App />);
      runAllTimers();
      expect(barItems.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);

      remeasure();
      expect(barItems.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);
      const callsOfTheFirstCall = onDataGrownToBar.mock.calls.length;

      // A second call takes the same measurement as the first one, and nothing is fit again.
      remeasure();
      expect(barItems.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);
      expect(onDataGrownToBar).toHaveBeenCalledTimes(callsOfTheFirstCall);
    });

    it('renders an item in the bar with the flag off and gives its click handler the item itself', () => {
      buttonWidth = 20;
      const onClick = jest.fn();
      const rendered: IRenderedButtonProps[] = [];
      const buttonAs = (props: IRenderedButtonProps) => {
        rendered.push(props);
        return <button data-width={100}>{props.text}</button>;
      };
      renderBar(
        ['First', 'Second', 'Third'].map(text => ({ key: text, text, onClick })),
        { buttonAs },
      );
      expect(items.map(item => item.renderedInOverflow)).toEqual([undefined, undefined, true]);

      rendered.length = 0;
      remeasure();

      // The check renders the third item in the bar to measure it, while the flag on the item still says that
      // it is in the overflow menu.
      const thirdButtons = rendered.filter(props => props.text === 'Third');
      expect(thirdButtons.map(props => props.renderedInOverflow)).toEqual([false]);
      expect(items[2].renderedInOverflow).toBe(true);

      thirdButtons[0].onClick!({} as React.MouseEvent<HTMLButtonElement>);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][1]).toBe(items[2]);
    });
  });
});
