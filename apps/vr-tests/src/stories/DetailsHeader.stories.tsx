
/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { IColumn, DetailsListLayoutMode, ColumnActionsMode, Selection, SelectionMode, IClassNames, classNamesFunction } from 'office-ui-fabric-react';
import { IDetailsColumnStyles, IDetailsColumnStyleProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.types'
import { DetailsHeader } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader'
import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.types';
import { DetailsColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn';
import * as fs from 'fs-extra';


const _items: {}[] = [];
const _selection = new Selection();
const dndScript = fs.readFileSync('../../dndSim.js', 'utf8');


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
        .snapshot('hoverFrozenFirst', { cropTo: '.testWrapper' })
        .hover('[aria-colindex=3]')
        .snapshot('hoverDraggable', { cropTo: '.testWrapper' })
        .hover('[aria-colindex=7]')
        .snapshot('hoverFrozenLast', { cropTo: '.testWrapper' })
        .executeScript(dndScript)
        .executeScript('DndSimulator.simulate(\'[draggable="true"]\', \'[aria-colindex="5"]\')')
        .snapshot('Drop Hint', { cropTo: '.testWrapper' })

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

// storiesOf('DetailsHeader', module)
//   .addDecorator(FabricDecorator)
//   .addDecorator(story => (
//     <Screener
//       steps={new Screener.Steps()
//         .snapshot('default1', { cropTo: '.testWrapper' })
//         .snapshot('default2', { cropTo: '.testWrapper' })
//         .snapshot('default3', { cropTo: '.testWrapper' })
//         .hover('[aria-colindex=3]')
//         .snapshot('hover', { cropTo: '.testWrapper' })
//         .end()}
//     >
//       {story()}
//     </Screener>
//   ))

//   .add('DragEnd', () => (
//     <div>
//       <DetailsColumn
//         column={columns[3]}
//         key={columns[3].key}
//         columnIndex={3}
//         isDraggable={true}
//       />
//       <DetailsColumn
//         column={columns[4]}
//         key={columns[4].key}
//         columnIndex={4}
//         isDraggable={true}
//       />
//       <DetailsColumn
//         column={columns[5]}
//         key={columns[5].key}
//         columnIndex={5}
//         isDraggable={true}
//       />
//     </div>
//   ))


