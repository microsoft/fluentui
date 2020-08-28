import * as React from 'react';

import { ISelectedItemsList, ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';

const _SelectedItemsList = <TItem extends BaseSelectedItem>(
  props: ISelectedItemsListProps<TItem>,
  ref: React.Ref<ISelectedItemsList<TItem>>,
) => {
  const { dragDropEvents, dragDropHelper, selectedItems, defaultSelectedItems } = props;
  const [items, setItems] = React.useState(selectedItems || defaultSelectedItems || []);

  const renderedItems = React.useMemo(() => items, [items]);
  const didMountRef = React.useRef(false);

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

  const replaceItem = React.useCallback(
    (newItem: TItem | TItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TItem[] = [...items];
        newItems.splice(index, 1, ...newItemsArray);
        setItems(newItems);
      }
    },
    [items],
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

  const SelectedItem = props.onRenderItem;
  return (
    <>
      {items.length > 0 && (
        <div role={'list'}>
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
                onItemChange={replaceItem}
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
