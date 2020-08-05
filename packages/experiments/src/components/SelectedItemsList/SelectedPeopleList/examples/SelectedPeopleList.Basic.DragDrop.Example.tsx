import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersona } from 'office-ui-fabric-react/lib/Persona';
import { people } from '@uifabric/example-data';
import { SelectedPeopleList } from '@uifabric/experiments/lib/SelectedItemsList';
import { useSelectedItems } from '../../../UnifiedPicker/hooks/useSelectedItems';
import { DragDropHelper } from 'office-ui-fabric-react/lib/utilities/dragdrop/DragDropHelper';
import { getTheme, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IDragDropEvents, Selection } from 'office-ui-fabric-react';

export const SelectedPeopleListBasicDragDropExample = <T extends {}>(): JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const [addMultipleKey, setAddMultipleKey] = React.useState(50);
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersona[]>([people[40]]);

  const selection = new Selection();
  const [draggedItem, setDraggedItem] = React.useState<IPersona>();
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const dragDropHelper = new DragDropHelper({
    selection: selection,
    minimumPixelsForDrag: 5,
  });

  const { selectedItems, unselectAll, getSelectedItems } = useSelectedItems(selection, currentSelectedItems);

  const theme = getTheme();
  const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  });

  const _insertBeforeItem = (item: T): void => {
    const draggedItems = selection.isIndexSelected(draggedIndex) ? (getSelectedItems() as T[]) : [draggedItem!];
    const insertIndex = selectedItems.indexOf(item);
    const items = selectedItems.filter(itm => draggedItems.indexOf(itm) === -1);
    items.splice(insertIndex, 0, ...draggedItems);

    setCurrentSelectedItems(items);
    unselectAll();
  };

  const _onDragEnter = (item?: any, event?: DragEvent): string => {
    // return string is the css classes that will be added to the entering element.
    return dragEnterClass;
  };

  const _onDrop = (item?: any, event?: DragEvent): void => {
    if (draggedItem) {
      _insertBeforeItem(item);
    }
  };

  const _onDragStart = (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void => {
    setDraggedItem(item);
    setDraggedIndex(itemIndex!);
  };

  const _onDragEnd = (item?: any, event?: DragEvent): void => {
    setDraggedItem(undefined);
    setDraggedIndex(-1);
  };

  const dragDropEvents: IDragDropEvents = {
    canDrop: () => true,
    canDrag: () => true,
    onDragEnter: _onDragEnter,
    onDragLeave: () => undefined,
    onDrop: _onDrop,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
  };

  const _onAddItemButtonClicked = (): void => {
    setCurrentSelectedItems([...currentSelectedItems, people[index]]);
    setIndex(index + 1);
  };

  const _addMoreItems = (): void => {
    const moreItems = people.map(obj => {
      return { ...obj, key: setAddMultipleKey(addMultipleKey + 1) };
    });
    setCurrentSelectedItems([...currentSelectedItems, ...moreItems]);
  };

  const _onItemsRemoved = (items: IPersona[]): void => {
    const currentSelectedItemsCopy = [...currentSelectedItems];
    items.forEach(item => {
      const indexToRemove = currentSelectedItemsCopy.indexOf(item);
      currentSelectedItemsCopy.splice(indexToRemove, 1);
      setCurrentSelectedItems([...currentSelectedItemsCopy]);
    });
  };

  return (
    <div className={'ms-BasePicker-text'}>
      <PrimaryButton text="Add another item" onClick={_onAddItemButtonClicked} />
      <PrimaryButton text="Add multiple items" onClick={_addMoreItems} />
      <SelectedPeopleList
        key={'normal'}
        removeButtonAriaLabel={'Remove'}
        selectedItems={currentSelectedItems}
        onItemsRemoved={_onItemsRemoved}
        dragDropHelper={dragDropHelper}
        dragDropEvents={dragDropEvents}
      />
    </div>
  );
};
