import * as React from 'react';
import { ContextualMenu, DirectionalHint } from '@fluentui/react/lib/ContextualMenu';
import type { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import type { ItemCanDispatchTrigger } from './ItemTrigger.types';

/**
 * Parameters to the EditingItem higher-order component
 */
export type ItemWithContextMenuProps<T> = {
  itemComponent: ItemCanDispatchTrigger<T>;
  menuItems: (item: T, onTrigger?: () => void) => IContextualMenuItem[];
};

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const ItemWithContextMenu = <T extends any>(
  itemWithContextMenuProps: ItemWithContextMenuProps<T>,
): ItemCanDispatchTrigger<T> => {
  return React.memo(selectedItemProps => {
    const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
    const openContextMenu = React.useCallback(() => {
      setIsContextMenuOpen(true);
    }, [setIsContextMenuOpen]);
    const closeContextMenu = React.useCallback(
      e => {
        e.preventDefault();
        setIsContextMenuOpen(false);
      },
      [setIsContextMenuOpen],
    );
    const menuItems = React.useMemo(
      () => itemWithContextMenuProps.menuItems(selectedItemProps.item, selectedItemProps.onTrigger),
      // TODO: evaluate whether anything should be changed here based on warning:
      //   "React Hook React.useMemo has an unnecessary dependency: 'itemWithContextMenuProps.menuItems'.
      //   Either exclude it or remove the dependency array. Outer scope values like
      //   'itemWithContextMenuProps.menuItems' aren't valid dependencies because mutating them
      //   doesn't re-render the component."
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [selectedItemProps.item, selectedItemProps.onTrigger, itemWithContextMenuProps.menuItems],
    );

    const containerRef = React.useRef<HTMLElement>(null);
    const ItemComponent = itemWithContextMenuProps.itemComponent;

    return (
      <span ref={containerRef}>
        <ItemComponent {...selectedItemProps} onTrigger={openContextMenu} />
        {isContextMenuOpen ? (
          <ContextualMenu
            items={menuItems}
            shouldFocusOnMount={true}
            target={containerRef.current}
            onDismiss={closeContextMenu}
            directionalHint={DirectionalHint.bottomLeftEdge}
          />
        ) : null}
      </span>
    );
  });
};
