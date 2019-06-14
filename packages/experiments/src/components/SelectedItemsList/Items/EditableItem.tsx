import * as React from 'react';
import { ISelectedItemProps } from '../SelectedItemsList.types';
import { ItemCanDispatchTrigger, Item } from './ItemTrigger.types';

export type EditingItemComponentProps<T> = {
  item: T;
  onEditingComplete: (oldItem: T, newItem: T) => void;
  onDismiss?: () => void;
};

/**
 * Parameters to the EditingItem higher-order component
 */
export type EditableItemProps<T> = {
  itemComponent: ItemCanDispatchTrigger<T>;
  editingItemComponent: React.ComponentType<EditingItemComponentProps<T>>;
};

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const EditableItem = <T extends any>(editableItemProps: EditableItemProps<T>): Item<T> => {
  return React.memo((selectedItemProps: ISelectedItemProps<T>) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const setEditingTrue = React.useCallback(() => {
      setIsEditing(true);
    }, [setIsEditing]);
    const setEditingFalse = React.useCallback(() => {
      setIsEditing(false);
    }, [setIsEditing]);
    const onItemEdited = React.useCallback(
      (_oldItem: T, newItem: T) => {
        selectedItemProps.onItemChange && selectedItemProps.onItemChange(newItem, selectedItemProps.index);
        setIsEditing(false);
      },
      [selectedItemProps.onItemChange]
    );

    const ItemComponent = editableItemProps.itemComponent;
    const EditingItemComponent = editableItemProps.editingItemComponent;

    return isEditing ? (
      <EditingItemComponent item={selectedItemProps.item} onEditingComplete={onItemEdited} onDismiss={setEditingFalse} />
    ) : (
      <ItemComponent {...selectedItemProps} onTrigger={setEditingTrue} />
    );
  });
};
