import * as React from 'react';
import { keytipMap } from '@fluentui/react-examples/lib/react/Keytip/KeytipSetup';
import { IOverflowSetItemProps, OverflowSet, IOverflowSetStyles } from '@fluentui/react/lib/OverflowSet';
import { CommandBarButton, DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';

const overflowSetStyles: Partial<IOverflowSetStyles> = { root: { marginBottom: 28 } };
const commandBarButtonStyles: Partial<IButtonStyles> = { root: { padding: '10px' } };

const initialItems = [
  {
    key: 'item1',
    name: 'Link 1',
    onClick: () => {
      return;
    },
    keytipProps: keytipMap.OverflowButton1,
  },
  {
    key: 'item2',
    name: 'Link 2',
    onClick: () => {
      return;
    },
    keytipProps: keytipMap.OverflowButton2,
  },
  {
    key: 'item3',
    name: 'Link 3',
    onClick: () => {
      return;
    },
    keytipProps: keytipMap.OverflowButton3,
  },
];

const initialOverflowItems = [
  {
    key: 'item5',
    name: 'Overflow Link 1',
    keytipProps: {
      ...keytipMap.OverflowButton5,
      onExecute: (el: HTMLElement | null) => {
        if (el) {
          el.focus();
          el.click();
        } else {
          console.log('first overflow item');
        }
      },
    },
    onClick: () => {
      console.log('first overflow item');
    },
  },
  {
    key: 'item6',
    name: 'Overflow Link 2',
    keytipProps: {
      ...keytipMap.OverflowButton6,
      onExecute: (el: HTMLElement | null) => {
        if (el) {
          el.focus();
          el.click();
        } else {
          console.log('second overflow item');
        }
      },
    },
    onClick: () => {
      console.log('second overflow item');
    },
    subMenuProps: {
      items: [
        {
          key: 'overflowSubMenu1',
          name: 'Overflow Submenu Item 1',
          keytipProps: keytipMap.OverflowSubMenuButton1,
        },
        {
          key: 'overflowSubMenu2',
          name: 'Overflow Submenu Item 2',
        },
      ],
    },
  },
];

export const KeytipsOverflowExample: React.FunctionComponent = () => {
  const [items, setItems] = React.useState(initialItems);
  const [overflowItems, setOverflowItems] = React.useState<typeof initialItems>(initialOverflowItems);

  const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => (
    <CommandBarButton role="menuitem" {...item} styles={commandBarButtonStyles} menuProps={item.subMenuProps}>
      {item.name}
    </CommandBarButton>
  );

  const onRenderOverflowButton = (newOverflowItems: any[]): JSX.Element => {
    return (
      <CommandBarButton
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: newOverflowItems, shouldFocusOnMount: false }}
        keytipProps={keytipMap.OverflowButton4}
      />
    );
  };

  const onToggleOverflowItems = React.useCallback(() => {
    if (overflowItems.length) {
      setItems(items.concat(overflowItems));
      setOverflowItems([]);
    } else {
      setOverflowItems(items.slice(-2));
      setItems(items.slice(0, -2));
    }
  }, [items, overflowItems]);

  return (
    <div>
      <p>
        Keytips in an overflow will have a special behavior. When a keytip goes into the overflow button menu, it will
        also register a 'persisted' keytip that can be accessed from the top level as a shortcut. A shortcut to a normal
        button item will trigger that button. A shortcut to a menu button item will open the overflow button menu and
        then open that item's menu as well. In this example triggering 'T' and 'Y' will show off this functionality (see
        console messages).
      </p>
      <OverflowSet
        role="menubar"
        styles={overflowSetStyles}
        items={items}
        overflowItems={overflowItems}
        keytipSequences={keytipMap.OverflowButton4.keySequences}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderOverflowButton={onRenderOverflowButton}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderItem={onRenderItem}
      />

      <p>When an item is moved out of the overflow well, it behaves as a normal keytip.</p>
      <DefaultButton text={'Move overflow items'} onClick={onToggleOverflowItems} />
    </div>
  );
};
