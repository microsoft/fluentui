import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

export const CommandBarLazyExample: React.FunctionComponent = () => {
  const [menuItems, setMenuItems] = React.useState<ICommandBarItemProps[] | undefined>(undefined);

  const timeoutRef = React.useRef<number | null>();

  const items = React.useMemo((): ICommandBarItemProps[] => {
    const loadItems = () => {
      const itemCount = Math.floor(Math.random() * 5) + 1;

      const newMenuItems: ICommandBarItemProps[] = [];

      for (let i = 0; i < itemCount; i++) {
        newMenuItems.push({
          key: `sub-item-${i}`,
          name: `Item ${i}`,
        });
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setMenuItems(newMenuItems);
      }, 2000) as unknown as number;
    };

    return [
      {
        key: 'a',
        name: 'Test',
      },
      {
        key: 'menu',
        name: 'Lazy-loaded menu',
        subMenuProps: {
          items: menuItems
            ? [
                ...menuItems,
                {
                  key: 'divider',
                  name: '-',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'permanent',
                  name: 'Permanent option',
                },
              ]
            : [],
          onMenuOpened: loadItems,
          onMenuDismissed: () => setMenuItems(undefined),
        },
      },
    ];
  }, [menuItems]);

  return (
    <div>
      <CommandBar items={items} />
    </div>
  );
};
