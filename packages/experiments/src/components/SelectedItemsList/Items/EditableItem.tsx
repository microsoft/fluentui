import * as React from 'react';
import { ISelectedItemProps } from '../SelectedItemsList.types';
import { EditingItem, EditingItemFloatingPickerProps } from './EditingItem';
import { ItemCanDispatchTrigger, Item } from './ItemTrigger.types';

/**
 * Parameters to the EditingItem higher-order component
 */
export type EditableItemProps<T> = {
  itemComponent: ItemCanDispatchTrigger<T>;
  onRenderFloatingPicker: React.ComponentType<EditingItemFloatingPickerProps<T>>;
  getEditingItemText: (item: T) => string;
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

    return isEditing ? (
      <EditingItem
        item={selectedItemProps.item}
        onRenderFloatingPicker={editableItemProps.onRenderFloatingPicker}
        onEditingComplete={onItemEdited}
        getEditingItemText={editableItemProps.getEditingItemText}
        onSuggestionsHidden={setEditingFalse}
      />
    ) : (
      <ItemComponent {...selectedItemProps} onTrigger={setEditingTrue} />
    );
  });
};
