import * as React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersona, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { people } from '@uifabric/example-data';
import { SelectedPeopleList } from '@uifabric/experiments/lib/SelectedItemsList';
import { DragDropHelper } from 'office-ui-fabric-react/lib/utilities/dragdrop/DragDropHelper';
import { getTheme, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IDragDropEvents, Selection } from 'office-ui-fabric-react';

const SelectedPeopleListBasicDragDropExample = <T extends {}>(): JSX.Element => {
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
    } else if (event?.dataTransfer) {
      event.preventDefault();
      var data = event.dataTransfer.items;
      for (var i = 0; i < data.length; i++) {
        if (data[i].kind == 'string') {
          data[i].getAsString(function(s) {
            console.log('... Drop: ' + s);
          });
        }
      }
    }
  };

  const _onDragStart = (item?: any, itemIndex?: number, tempSelectedItems?: any[], event?: DragEvent): void => {
    setDraggedItem(item);
    setDraggedIndex(itemIndex!);

    if (event) {
      var dataList = event?.dataTransfer?.items;
      var str = (draggedItem as IPersonaProps).text;
      dataList?.add(str || '', 'text/plain');
    }
  };

  const _onDragEnd = (item?: any, event?: DragEvent): void => {
    setDraggedItem(undefined);
    setDraggedIndex(-1);
    if (event) {
      var dataList = event?.dataTransfer?.items;
      // Clear any remaining drag data
      dataList?.clear();
    }
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

export const SelectedPeopleListDragDropBetweenWellsExample = (): JSX.Element => {
  return (
    <>
      To: <SelectedPeopleListBasicDragDropExample />
      CC: <SelectedPeopleListBasicDragDropExample />
    </>
  );
};
