
/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IColumn, DetailsListLayoutMode, ColumnActionsMode, Selection, SelectionMode } from 'office-ui-fabric-react';
import { DetailsHeader } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader'


const _items: {}[] = [];
const _selection = new Selection();

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
        .snapshot('mouseDownFrozen', { cropTo: '.testWrapper' })
        .mouseDown('[aria-colindex=3]')
        .snapshot('mouseDownDraggable', { cropTo: '.testWrapper' })
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