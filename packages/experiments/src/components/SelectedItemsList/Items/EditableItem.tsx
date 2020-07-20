import * as React from 'react';
import { ISelectedItemProps } from '../SelectedItemsList.types';
import { ItemCanDispatchTrigger, Item } from './ItemTrigger.types';
import { useBoolean } from '@uifabric/react-hooks';

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
    const { onItemChange, index } = selectedItemProps;
    const [isEditing, { setTrue: setEditingTrue, setFalse: setEditingFalse }] = useBoolean(false);

    const onItemEdited = React.useCallback(
      (_oldItem: T, newItem: T) => {
        onItemChange && onItemChange(newItem, index);
        setEditingFalse();
      },
      [onItemChange, index, setEditingFalse],
    );

    const ItemComponent = editableItemProps.itemComponent;
    const EditingItemComponent = editableItemProps.editingItemComponent;

    return isEditing ? (
      <EditingItemComponent
        item={selectedItemProps.item}
        onEditingComplete={onItemEdited}
        onDismiss={setEditingFalse}
      />
    ) : (
      <ItemComponent {...selectedItemProps} onTrigger={setEditingTrue} />
    );
  });
};
