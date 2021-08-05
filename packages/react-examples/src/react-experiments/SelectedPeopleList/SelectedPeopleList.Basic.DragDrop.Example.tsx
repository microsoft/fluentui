import * as React from 'react';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IPersona } from '@fluentui/react/lib/Persona';
import { people } from '@fluentui/example-data';
import { SelectedPeopleList } from '@fluentui/react-experiments/lib/SelectedItemsList';
import { DragDropHelper } from '@fluentui/react/lib/DragDrop';
import { getTheme } from '@fluentui/react/lib/Styling';
import { mergeStyles } from '@fluentui/merge-styles';
import { IDragDropEvents, Selection } from '@fluentui/react';

export const SelectedPeopleListBasicDragDropExample = <T extends {}>(): JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersona[]>([people[40]]);

  const selection = new Selection();
  const [draggedItem, setDraggedItem] = React.useState<IPersona>();
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const dragDropHelper = new DragDropHelper({
    selection: selection,
    minimumPixelsForDrag: 5,
  });

  const theme = getTheme();
  const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  });

  const _insertBeforeItem = (item: T): void => {
    const draggedItems = selection.isIndexSelected(draggedIndex) ? (selection.getSelection() as T[]) : [draggedItem!];
    const insertIndex = currentSelectedItems.indexOf(item);
    const items = currentSelectedItems.filter(current => draggedItems.indexOf(current) === -1);
    items.splice(insertIndex, 0, ...draggedItems);

    setCurrentSelectedItems(items);
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

  const _onDragStart = (item?: any, itemIndex?: number, tempSelectedItems?: any[], event?: MouseEvent): void => {
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

  const _onAddItemButtonClicked = React.useCallback(() => {
    setCurrentSelectedItems([...currentSelectedItems, people[index]]);
    setIndex(index + 1);
  }, [currentSelectedItems, index]);

  const _onItemsRemoved = React.useCallback(
    (items: IPersona[]) => {
      const currentSelectedItemsCopy = [...currentSelectedItems];
      items.forEach(item => {
        const indexToRemove = currentSelectedItemsCopy.indexOf(item);
        currentSelectedItemsCopy.splice(indexToRemove, 1);
        setCurrentSelectedItems([...currentSelectedItemsCopy]);
      });
    },
    [currentSelectedItems],
  );

  return (
    <div className={'ms-BasePicker-text'}>
      <PrimaryButton text="Add another item" onClick={_onAddItemButtonClicked} />
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
