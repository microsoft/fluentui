import * as React from 'react';

import { IControlledSelectedItemsList, IControlledSelectedItemListProps, BaseSelectedItem } from './SelectedItemsList.types';
import { copyToClipboard } from '../../utilities/copyToClipboard';
import { useSelectionIndices } from '../../utilities/useSelectionIndices';

/**
 * An externally-managed selected item list.
 */
export const ControlledSelectedItemsList = <TItem extends BaseSelectedItem>(props: IControlledSelectedItemListProps<TItem>) => {
  const selection = React.useMemo(() => props.selection, [props.selection]);
  const selectedIndices = useSelectionIndices(selection);
  // Synchronize the selection against the items in the selection
  React.useEffect(() => {
    selection &&
      selection.setItems(
        props.selectedItems,
        false // shouldClear
      );
  });

  const onRemoveItemCallbacks = React.useMemo(
    () =>
      // create callbacks ahead of time with memo.
      // (hooks have to be called in the same order)
      props.selectedItems.map((item: TItem) =>
        // do not generate callbacks for items that cannot be removed
        !props.canRemoveItem || props.canRemoveItem(item) ? () => props.onItemsRemoved([item]) : undefined
      ),
    [props.selectedItems, props.canRemoveItem, props.onItemsRemoved]
  );

  // only used in the imperative handle
  const copyItemsInSelectionToClipboard = React.useCallback((): void => {
    if (props.getItemCopyText && selectedIndices.length > 0) {
      const itemsInSelection = selectedIndices.map(itemIndex => props.selectedItems[itemIndex]);
      const copyText = props.getItemCopyText(itemsInSelection);
      copyToClipboard(copyText);
    }
  }, [props.selectedItems, props.getItemCopyText, selectedIndices]);

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
