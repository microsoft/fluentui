import * as React from 'react';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

import { ISelectedItemsList, ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';
import { copyToClipboard } from './utils/copyToClipboard';

const useSelectedIndeces = (inputSelection: Selection | undefined): [Selection, number[]] => {
  const selection: Selection = React.useMemo(
    () =>
      inputSelection
        ? inputSelection
        : new Selection({
            onSelectionChanged: () => {
              // selectedIndeces depends on selection, which has to be initialized
              // with the setSelectedIndeces callback. Capture it in a closure.
              //
              // tslint:disable-next-line:no-use-before-declare
              setSelectedIndeces(selection.getSelectedIndices());
            }
          }),
    [inputSelection]
  );

  const [selectedIndices, setSelectedIndeces] = React.useState(selection.getSelectedIndices());
  return [selection, selectedIndices];
};

const _SelectedItemsList = <TItem extends BaseSelectedItem>(
  props: ISelectedItemsListProps<TItem>,
  ref: React.Ref<ISelectedItemsList<TItem>>
) => {
  const [items, updateItems] = React.useState(props.selectedItems || props.defaultSelectedItems || []);
  const renderedItems = React.useMemo(() => props.selectedItems || items, [items, props.selectedItems]);

  // Selection which initializes at the beginning of the component and
  // only updates if seleciton becomes set in props (e.g. compoennt transitions from
  // being controlled to uncontrolled)
  const [selection, selectedIndices] = useSelectedIndeces(props.selection);
  const itemsInSelection = React.useMemo(() => selectedIndices.filter(i => i > 0 && i < items.length).map(i => items[i]), [
    items,
    selectedIndices
  ]);

  React.useEffect(() => {
    selection.setItems(items);
  });

  const removeItems = React.useCallback(
    (itemsToRemove: TItem[]): void => {
      updateItems(items.filter(item => itemsToRemove.indexOf(item) === -1));
    },
    [items]
  );

  const replaceItem = React.useCallback(
    (newItem: TItem | TItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TItem[] = [...items];
        newItems.splice(index, 1, ...newItemsArray);
        updateItems(newItems);
      }
    },
    [updateItems, items]
  );

  const copyItemsInSelection = React.useCallback((): void => {
    if (props.getItemCopyText && selectedIndices.length > 0) {
      const copyText = props.getItemCopyText(itemsInSelection);
      copyToClipboard(copyText);
    }
  }, [itemsInSelection, selectedIndices]);

  // Callbacks only used in the imperitive handle

  const addItems = React.useCallback(
    (newItems: TItem[]) => {
      updateItems(items.concat(newItems));
    },
    [items]
  );

  const unselectAll = React.useCallback(() => {
    selection.setAllSelected(false);
  }, [items]);

  // For usage as a controlled component with a ref
  React.useImperativeHandle(
    ref,
    (): ISelectedItemsList<TItem> => ({
      items,
      itemsInSelection,
      addItems,
      unselectAll,
      removeItems
    }),
    [items, addItems]
  );

  const onRemoveItemCallbacks = React.useMemo(
    () =>
      // create callbacks ahead of time with memo.
      // (hooks have to be called in the same order)
      items.map((item: TItem) => () => removeItems([item])),
    [items]
  );

  const SelectedItem = props.onRenderItem;
  return (
    <>
      {renderedItems.map((item: TItem, index: number) => (
        <SelectedItem
          item={item}
          index={index}
          key={item.key !== undefined ? item.key : index}
          selected={selectedIndices.indexOf(index) !== -1}
          removeButtonAriaLabel={props.removeButtonAriaLabel}
          onRemoveItem={onRemoveItemCallbacks[index]}
          onItemChange={replaceItem}
          onCopyItem={copyItemsInSelection}
        />
      ))}
    </>
  );
};

// Typescript only respects unifying a generic type with a generic const _function_ of the same name for function types.
// In order to satisfy the type checker, here we lie about the type of the const so that it is still a generic function.
export type SelectedItemsList<TItem extends BaseSelectedItem> = React.Component<ISelectedItemsListProps<TItem>>;
export const SelectedItemsList = React.forwardRef(_SelectedItemsList) as (typeof _SelectedItemsList);
