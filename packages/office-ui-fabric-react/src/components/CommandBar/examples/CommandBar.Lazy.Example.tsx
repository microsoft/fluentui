import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useConstCallback } from '@uifabric/react-hooks';

export const CommandBarLazyExample: React.FunctionComponent = () => {
  const [menuItems, setMenuItems] = React.useState<ICommandBarItemProps[] | undefined>(undefined);

  const timeoutRef = React.useRef<number | null>();

  const onMenuDismissed = useConstCallback(() => {
    setMenuItems(undefined);
  });

  const loadItems = useConstCallback(() => {
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

    timeoutRef.current = (setTimeout(() => {
      setMenuItems(newMenuItems);
    }, 2000) as unknown) as number;
  });

  const items = React.useMemo((): ICommandBarItemProps[] => {
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
          onMenuDismissed: onMenuDismissed,
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
