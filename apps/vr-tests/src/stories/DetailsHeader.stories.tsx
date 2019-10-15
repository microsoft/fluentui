/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  IColumn,
  DetailsListLayoutMode,
  ColumnActionsMode,
  Selection,
  SelectionMode
} from 'office-ui-fabric-react';
import { DetailsHeader } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader';

const _items: {}[] = [];
const _selection = new Selection();
// script to simulate drag so that drop hint is rendered
const dndScript = require('!raw-loader!../../dndSim.js') as string;

const columns: IColumn[] = [
  {
    key: 'a',
    name: 'a',
    fieldName: 'a',
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
    isResizable: true
  },
  {
    key: 'b',
    name: 'b',
    fieldName: 'b',
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
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
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
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
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
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
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
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
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
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
        .snapshot('default', { cropTo: '.ms-DetailsHeader' })
        .hover('[aria-colindex=2]')
        .snapshot('hoverFrozenFirst', { cropTo: '.ms-DetailsHeader' })
        .hover('[aria-colindex=3]')
        .snapshot('hoverDraggable', { cropTo: '.ms-DetailsHeader' })
        .hover('[aria-colindex=7]')
        .snapshot('hoverFrozenLast', { cropTo: '.ms-DetailsHeader' })
        .hover('[aria-colindex=3]')
        .executeScript(dndScript)
        // simulate a drag on column 'b' to render the border
        .cssAnimations(false)
        .executeScript(`DndSimulator.simulate('[draggable="true"]', '[aria-colindex="5"]', false)`)
        .snapshot('borderWhileDragging')
        // do a dragover on 'd' to render the drop hint
        .hover('[aria-colindex=5]')
        .cssAnimations(true)
        .executeScript(`DndSimulator.simulate('[draggable="true"]', '[aria-colindex="5"]', true)`)
        .snapshot('dropHint')
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
  ));
