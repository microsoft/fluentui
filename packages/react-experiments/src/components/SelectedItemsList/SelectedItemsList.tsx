import * as React from 'react';

import { ISelectedItemsList, ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';

const _SelectedItemsList = <TItem extends BaseSelectedItem>(
  props: ISelectedItemsListProps<TItem>,
  ref: React.Ref<ISelectedItemsList<TItem>>,
) => {
  const { dragDropEvents, dragDropHelper, selectedItems, defaultSelectedItems, replaceItem } = props;
  const [items, setItems] = React.useState(selectedItems || defaultSelectedItems || []);

  const renderedItems = React.useMemo(() => items, [items]);
  const didMountRef = React.useRef(false);
  const hiddenInput = React.useRef<any>();

  React.useEffect(() => {
    // block first call of the hook and forward each consecutive one
    // We do this so that if defaultSelectedItems are set, they don't get overwritten
    if (didMountRef.current) {
      setItems(selectedItems || []);
    } else {
      didMountRef.current = true;
    }
  }, [selectedItems]);

  const removeItems = (itemsToRemove: TItem[]): void => {
    // Intentionally not using .filter here as we want to only remove a specific
    // item in case of duplicates of same item.
    const updatedItems: TItem[] = [...items];
    itemsToRemove.forEach(item => {
      const index: number = updatedItems.indexOf(item);
      updatedItems.splice(index, 1);
    });
    setItems(updatedItems);
    props.onItemsRemoved?.(itemsToRemove);
  };

  const _replaceItem = React.useCallback(
    (newItem: TItem | TItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TItem[] = [...items];
        newItems.splice(index, 1, ...newItemsArray);
        setItems(newItems);
        replaceItem?.(newItem, index);
      }
    },
    [items, replaceItem],
  );

  const onRemoveItemCallbacks = React.useMemo(
    () =>
      // create callbacks ahead of time with memo.
      // (hooks have to be called in the same order)
      items.map((item: TItem) => () => removeItems([item])),
    // TODO: consider whether dependency on removeItems should be added
    // (removeItems would likely need to be wrapped in useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  const _onFocus = (ev: React.FocusEvent<HTMLDivElement>) => {
    // If we have an input, set focus to it so we can pick up the copy keyboard command
    hiddenInput.current?.focus();
  };

  const SelectedItem = props.onRenderItem;
  return (
    <>
      {items.length > 0 && (
        <div role={'list'} onFocus={_onFocus}>
          <input
            // Add a zero zero size input. This is to pick up the copy command when we have
            // keyboard focus in the list
            // Focus is set to the input when the list gets focus via the _onFocus function
            className={'ms-SelectedItemsList-copyInput'}
            ref={hiddenInput}
            style={{ height: '0px', width: '0px', border: 'none', outline: 'none' }}
            data-is-focusable={false}
          />
          {SelectedItem &&
            renderedItems.map((item: TItem, index: number) => (
              <SelectedItem
                item={item}
                index={index}
                // To keep react from complaining for duplicate elements with the same key
                // we will append the index to the key so that we have unique key for each item
                key={item.key !== undefined ? item.key + '_' + index : index}
                selected={props.focusedItemIndices?.includes(index)}
                removeButtonAriaLabel={props.removeButtonAriaLabel}
                onRemoveItem={onRemoveItemCallbacks[index]}
                onItemChange={_replaceItem}
                dragDropEvents={dragDropEvents}
                dragDropHelper={dragDropHelper}
              />
            ))}
        </div>
      )}
    </>
  );
};

// Typescript only respects unifying a generic type with a generic const _function_ of the same name for function types.
// In order to satisfy the type checker, here we lie about the type of the const so that it is still a generic function.
export type SelectedItemsList<TItem extends BaseSelectedItem> = React.Component<ISelectedItemsListProps<TItem>>;
export const SelectedItemsList = React.forwardRef(_SelectedItemsList) as typeof _SelectedItemsList;
