import * as React from 'react';
import type { ISelectedItemProps } from '../SelectedItemsList.types';
import type { ItemCanDispatchTrigger, Item } from './ItemTrigger.types';

export type EditingItemComponentProps<T> = {
  item: T;
  onEditingComplete: (oldItem: T, newItem: T) => void;
  onDismiss?: () => void;
  createGenericItem?: (input: string) => T;
};

/**
 * Parameters to the EditingItem higher-order component
 */
export type EditableItemProps<T> = {
  /**
   * Component to render when item is in normal state
   */
  itemComponent: ItemCanDispatchTrigger<T>;

  /**
   * Component to render when item is in editing state
   */
  editingItemComponent: React.ComponentType<EditingItemComponentProps<T>>;

  /**
   * Returns editing state (boolean) of the item
   */
  getIsEditing: (item: T, index: number) => boolean;

  /**
   * Callback when editing should be started. The controlling component should ensure
   * the item is marked as being edited
   */
  onEditingStarted: (item: T, index: number) => void;

  /**
   * Callback when editing is finished. The controlling component should ensure
   * the item is marked as being not edited
   */
  onEditingCompleted: (item: T, index: number) => void;

  /**
   * Callback when editing is cancelled/dismissed
   */
  onEditingDismissed?: (item: T, index: number) => void;

  /**
   * Callback for a click on the normal state item component
   */
  onClick?: (ev: React.MouseEvent<HTMLElement>, item: T, index: number) => void;
};

// `extends unknown` to trick the parser into parsing as a type decl instead of a jsx tag
export const EditableItem = <T extends unknown>(editableItemProps: EditableItemProps<T>): Item<T> => {
  return React.memo((selectedItemProps: ISelectedItemProps<T>) => {
    const { getIsEditing, onEditingStarted, onEditingCompleted, onEditingDismissed, onClick } = editableItemProps;
    const { onItemChange, item, index } = selectedItemProps;

    const isEditing = getIsEditing(item, index);
    const ItemComponent = editableItemProps.itemComponent;
    const EditingItemComponent = editableItemProps.editingItemComponent;

    const onTrigger = React.useCallback(() => onEditingStarted(item, index), [index, item, onEditingStarted]);

    const onEditingComplete = React.useCallback(
      (_oldItem: T, newItem: T) => {
        onItemChange?.(newItem, index);
        onEditingCompleted(item, index);
      },
      [index, item, onEditingCompleted, onItemChange],
    );

    const onDismiss = React.useCallback(() => {
      onEditingDismissed?.(item, index);
    }, [index, item, onEditingDismissed]);

    const onItemClicked = React.useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        onClick?.(ev, item, index);
      },
      [index, item, onClick],
    );

    return isEditing ? (
      <EditingItemComponent
        item={selectedItemProps.item}
        onEditingComplete={onEditingComplete}
        onDismiss={onDismiss}
        createGenericItem={selectedItemProps.createGenericItem}
      />
    ) : (
      <ItemComponent {...selectedItemProps} onTrigger={onTrigger} onClick={onItemClicked} />
    );
  });
};
