import * as React from 'react';
import { Selection, SELECTION_CHANGE } from 'office-ui-fabric-react/lib/Selection';

import {
  ISelectedItemsList,
  IControlledSelectedItemsList,
  IControlledSelectedItemListProps,
  IUncontrolledSelectedItemListProps,
  ISelectedItemsListProps,
  BaseSelectedItem
} from './SelectedItemsList.types';
import { copyToClipboard } from '../../utilities/copyToClipboard';
import { EventGroup } from '@uifabric/utilities/lib/EventGroup';

/**
 * Uses selection indeces as its own thing
 * @param selection the selection to get the indeces of as state.
 */
const useSelectionIndeces = (selection: Selection): number[] => {
  const [selectedIndices, setSelectedIndeces] = React.useState(selection.getSelectedIndices());

  React.useEffect(() => {
    const eventGroup = new EventGroup(null);
    eventGroup.on(selection, SELECTION_CHANGE, () => {
      setSelectedIndeces(selection.getSelectedIndices());
    });

    // Update state in effect only if the old selected indeces and the new
    // selected indeces don't match (e.g. we were fed a new selection)
    if (selection.getSelectedIndices() !== selectedIndices) {
      setSelectedIndeces(selection.getSelectedIndices());
    }

    // cleanup
    return () => {
      eventGroup.dispose();
    };
  }, [selection]);

  return selectedIndices;
};

/**
 * An externally-managed selected item list.
 */
export const ControlledSelectedItemsList = <TItem extends BaseSelectedItem>(props: IControlledSelectedItemListProps<TItem>) => {
  const selectedIndices = useSelectionIndeces(props.selection);
  // Synchronize the selection against the items in the selection
  React.useEffect(() => {
    props.selection.setItems(props.selectedItems);
  });

  const onRemoveItemCallbacks = React.useMemo(
    () =>
      // create callbacks ahead of time with memo.
      // (hooks have to be called in the same order)
      props.selectedItems.map((item: TItem) =>
        // do not generate callbacks for items that cannot be removed
        !props.canRemoveItem || props.canRemoveItem(item) ? () => props.onItemsRemoved([item]) : undefined
      ),
    [props.selectedItems]
  );

  // only used in the imperitive handle
  const copyItemsInSelectionToClipboard = React.useCallback((): void => {
    if (props.getItemCopyText && selectedIndices.length > 0) {
      const itemsInSelection = selectedIndices.map(itemIndex => props.selectedItems[itemIndex]);
      const copyText = props.getItemCopyText(itemsInSelection);
      copyToClipboard(copyText);
    }
  }, [props.selectedItems, selectedIndices]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      copyItemsInSelectionToClipboard
    }),
    [copyItemsInSelectionToClipboard]
  );

  const SelectedItem = props.onRenderItem;
  return (
    <>
      {props.selectedItems.map((item: TItem, index: number) => (
        <SelectedItem
          item={item}
          index={index}
          key={item.key !== undefined ? item.key : index}
          selected={selectedIndices.indexOf(index) !== -1}
          removeButtonAriaLabel={props.removeButtonAriaLabel}
          onRemoveItem={onRemoveItemCallbacks[index]}
          onItemChange={props.onItemChange}
        />
      ))}
    </>
  );
};
export type ControlledSelectedItemsList<TItem extends BaseSelectedItem> = (
  props: IControlledSelectedItemListProps<TItem> & React.RefAttributes<IControlledSelectedItemsList>
) => React.ReactElement;
(ControlledSelectedItemsList as any).displayName = 'ControlledSelectedItemsList';

export const useSelectedItemListState = <TSelectedItem extends any>(defaultSelectedItems: TSelectedItem[] | undefined) => {
  const [selectedItems, setSelectedItems] = React.useState(defaultSelectedItems || []);

  const removeSelectedItems = React.useCallback(
    (removedItems: TSelectedItem[]) => {
      // Update internal state if it is tracked at all
      const nextSelectedItems = selectedItems.filter(i => removedItems.indexOf(i) === -1);
      if (nextSelectedItems.length !== selectedItems.length - removedItems.length) {
        console.error('removeSelectedItems called on some item not in the current state');
      }
      setSelectedItems(nextSelectedItems);
    },
    [selectedItems]
  );

  const replaceSelectedItem = React.useCallback(
    (newItem: TSelectedItem | TSelectedItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TSelectedItem[] = [...selectedItems];
        newItems.splice(index, 1, ...newItemsArray);
        setSelectedItems(newItems);
      }
    },
    [setSelectedItems, selectedItems]
  );

  const appendSelectedItems = React.useCallback(
    (itemsToAppend: TSelectedItem[]) => {
      setSelectedItems(selectedItems.concat(itemsToAppend));
    },
    [selectedItems]
  );

  return {
    selectedItems,
    setSelectedItems,
    removeSelectedItems,
    replaceSelectedItem,
    appendSelectedItems
  };
};

/**
 * A self-managed selected item list.
 */
const UncontrolledSelectedItemsList = <TItem extends BaseSelectedItem>(props: IUncontrolledSelectedItemListProps<TItem>) => {
  const selection = React.useMemo(() => props.selection || new Selection(), [props.selection]);
  const selectedIndices = useSelectionIndeces(selection);

  const { selectedItems, removeSelectedItems, replaceSelectedItem, appendSelectedItems } = useSelectedItemListState(
    props.defaultSelectedItems
  );

  // Selection which initializes at the beginning of the component and
  // only updates if seleciton becomes set in props (e.g. compoennt transitions from
  // being controlled to uncontrolled)
  const itemsInSelection = React.useMemo(() => selectedIndices.filter(i => i > 0 && i < selectedItems.length).map(i => selectedItems[i]), [
    selectedItems,
    selectedIndices
  ]);

  const unselectAll = React.useCallback(() => {
    selection.setAllSelected(false);
  }, [selectedItems]);

  const controlledRef = React.useRef<IControlledSelectedItemsList>(null);
  const copyItemsInSelectionToClipboard = React.useCallback(() => {
    controlledRef.current && controlledRef.current.copyItemsInSelectionToClipboard();
  }, [controlledRef]);

  // For usage as a controlled component with a ref
  React.useImperativeHandle(
    props.componentRef,
    (): ISelectedItemsList<TItem> => ({
      items: selectedItems,
      addItems: appendSelectedItems,
      removeItems: removeSelectedItems,
      itemsInSelection,
      unselectAll,
      copyItemsInSelectionToClipboard
    }),
    [selectedItems, itemsInSelection, appendSelectedItems, unselectAll, removeSelectedItems, copyItemsInSelectionToClipboard]
  );

  return (
    <ControlledSelectedItemsList<TItem>
      componentRef={controlledRef}
      // passthrough props
      getItemCopyText={props.getItemCopyText}
      onRenderItem={props.onRenderItem}
      removeButtonAriaLabel={props.removeButtonAriaLabel}
      canRemoveItem={props.canRemoveItem}
      // props that are internal to the uncontrolled component
      selection={selection}
      selectedItems={selectedItems}
      onItemsRemoved={removeSelectedItems}
      onItemChange={replaceSelectedItem}
    />
  );
};
export type UncontrolledSelectedItemsList<TItem extends BaseSelectedItem> = (
  props: IUncontrolledSelectedItemListProps<TItem>
) => React.ReactElement;
(UncontrolledSelectedItemsList as any).displayName = 'UncontrolledSelectedItemsList';

const isControlledSelectedItemList = <T extends BaseSelectedItem>(
  props: IControlledSelectedItemListProps<T> | IUncontrolledSelectedItemListProps<T>
): props is IControlledSelectedItemListProps<T> => (props as any).selectedItems !== undefined;

export const SelectedItemsList = <TItem extends BaseSelectedItem>(props: ISelectedItemsListProps<TItem>) => {
  if (isControlledSelectedItemList<TItem>(props)) {
    return <ControlledSelectedItemsList<TItem> {...props} />;
  } else {
    return <UncontrolledSelectedItemsList<TItem> {...props} />;
  }
};
export type SelectedItemsList<TItem extends BaseSelectedItem> = ControlledSelectedItemsList<TItem> | UncontrolledSelectedItemsList<TItem>;
