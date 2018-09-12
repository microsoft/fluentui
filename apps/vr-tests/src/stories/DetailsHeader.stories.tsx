
/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IColumn, DetailsListLayoutMode, ColumnActionsMode, Selection, SelectionMode, IClassNames, classNamesFunction } from 'office-ui-fabric-react';
import { IDetailsColumnStyles, IDetailsColumnStyleProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.types'
import { DetailsHeader } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader'
import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.types';
import { DetailsColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn'
import { IDragDropHelper } from "c:/Git/office-ui-fabric-react/packages/office-ui-fabric-react/src/utilities/dragdrop/index"

const _items: {}[] = [];
const _selection = new Selection();
let _classNames: IClassNames<IDetailsColumnStyles>;
const getClassNames = classNamesFunction<IDetailsHeaderStyleProps, IDetailsHeaderStyles>();

// const _onDragStart = (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void => {

//   if (itemIndex) {
//     this._updateHeaderDragInfo(itemIndex);
//     this._root.current.classList.add(classNames.borderWhileDragging);
//   }
// }

// const updateDragInfo = (props: { itemIndex: number }, event?: MouseEvent) => {

//     this._draggedColumnIndex = this.props.selectionMode !== SelectionMode.none ? itemIndex - 2 : itemIndex - 1;
//     onColumnDragStart(true);

// }

// _classNames = getClassNames(styles);


let _dragDropHelper: IDragDropHelper;

const columns: IColumn[] = [
  { key: 'a', name: 'a', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true },
  {
    key: 'b',
    name: 'b',
    fieldName: 'b',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    isSorted: true,
    sortAscendingAriaLabel: 'Sorted up.',
    sortDescendingAriaLabel: 'Sorted down.',
    ariaLabel: 'Click to sort.'
  },
  {
    key: 'c',
    name: 'c',
    fieldName: 'c',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.'
  },
  {
    key: 'd',
    name: 'd',
    fieldName: 'd',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.'
  },
  {
    key: 'e',
    name: 'e',
    fieldName: 'e',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.'
  },
  {
    key: 'f',
    name: 'f',
    fieldName: 'f',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.'
  }
];


_selection.setItems(_items);


const _columnReorderProps = {
  frozenColumnCountFromStart: 1,
  frozenColumnCountFromEnd: 1,
  handleColumnReorder: this._dummyFunction
};



storiesOf('DetailsHeader', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('[aria-colindex=2]')
        .snapshot('hoverFrozen', { cropTo: '.testWrapper' })
        .hover('[aria-colindex=3]')
        .snapshot('hoverDraggable', { cropTo: '.testWrapper' })
        .mouseDown('[aria-colindex=2]')
        .end()}
    >
      {story()}
    </Screener>
  ))

  .add('Root', () => (
    <DetailsHeader
      selection={_selection}
      selectionMode={SelectionMode.multiple}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      columns={columns}
      columnReorderProps={_columnReorderProps}
    />
  ))

  .add('DragStart', () => (
    <DetailsColumn
      column={columns[3]}
      key={columns[3].key}
      columnIndex={3}
      dragDropHelper={_dragDropHelper}
      isDraggable={true}
      isDropped={false}
    />
  ))
  .add('DragEnd', () => (
    <DetailsColumn
      column={columns[3]}
      key={columns[3].key}
      columnIndex={3}
      isDraggable={true}
      isDropped={true}
    />
  ))


