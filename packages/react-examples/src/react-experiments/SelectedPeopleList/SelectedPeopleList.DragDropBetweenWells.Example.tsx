import * as React from 'react';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IPersona, IPersonaProps } from '@fluentui/react/lib/Persona';
import { people } from '@fluentui/example-data';
import { SelectedPeopleList } from '@fluentui/react-experiments/lib/SelectedItemsList';
import { DragDropHelper } from '@fluentui/react/lib/DragDrop';
import { getTheme } from '@fluentui/react/lib/Styling';
import { mergeStyles } from '@fluentui/merge-styles';
import { IDragDropEvents, Selection } from '@fluentui/react';

const SelectedPeopleListBasicDragDropExample = <T extends {}>(): JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<IPersona[]>([people[40]]);

  const selection = new Selection();
  const dragDropHelper = new DragDropHelper({
    selection: selection,
    minimumPixelsForDrag: 5,
  });

  const theme = getTheme();
  const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  });

  const _insertBeforeItem = (item: T, itemToInsert: IPersona): void => {
    const draggedItems = [itemToInsert];
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
    if (event?.dataTransfer) {
      event.preventDefault();
      const data = event.dataTransfer.items;
      for (let i = 0; i < data.length; i++) {
        if (data[i].kind === 'string' && data[i].type === 'persona') {
          data[i].getAsString((dropText: string) => {
            people.forEach(suggestionItem => {
              if (suggestionItem.text === dropText) {
                _insertBeforeItem(item, suggestionItem);
              }
            });
          });
        }
      }
    }
  };

  const _onDragStart = (item?: any, itemIndex?: number, tempSelectedItems?: any[], event?: DragEvent): void => {
    if (event) {
      const dataList = event?.dataTransfer?.items;
      const personaText = (item as IPersonaProps).text;
      dataList?.add(personaText || '', 'persona');
    }
  };

  const _onDragEnd = (item?: any, event?: DragEvent): void => {
    if (event) {
      const dataList = event?.dataTransfer?.items;
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
