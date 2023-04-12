import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  IColumn,
  DetailsListLayoutMode,
  ColumnActionsMode,
  Selection,
  SelectionMode,
} from '@fluentui/react';
import { DetailsHeader } from '@fluentui/react/lib/DetailsList';

const _items: {}[] = [];
const _selection = new Selection();
// script to simulate drag so that drop hint is rendered
// eslint-disable-next-line import/no-webpack-loader-syntax
const dndScript = require('!raw-loader?esModule=false!../../dndSim.js') as string;

const columns: IColumn[] = [
  {
    key: 'a',
    name: 'a',
    fieldName: 'a',
    minWidth: 100,
    maxWidth: 200,
    calculatedWidth: 100,
    isResizable: true,
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
    ariaLabel: 'Click to sort.',
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
    ariaLabel: 'Click to sort, filter, or group.',
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
    ariaLabel: 'Click to sort, filter, or group.',
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
    ariaLabel: 'Click to sort, filter, or group.',
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
    ariaLabel: 'Click to sort, filter, or group.',
  },
];

_selection.setItems(_items);

const _columnReorderProps = {
  frozenColumnCountFromStart: 1,
  frozenColumnCountFromEnd: 1,
};

storiesOf('DetailsHeader', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-DetailsHeader' })
        .hover('[data-item-key=a]')
        .snapshot('hoverFrozenFirst', { cropTo: '.ms-DetailsHeader' })
        .hover('[data-item-key=b]')
        .snapshot('hoverDraggable', { cropTo: '.ms-DetailsHeader' })
        .hover('[data-item-key=f]')
        .snapshot('hoverFrozenLast', { cropTo: '.ms-DetailsHeader' })
        .hover('[data-item-key=b]')
        .executeScript(dndScript)
        // simulate a drag on column 'b' to render the border
        .cssAnimations(false)
        .executeScript(`DndSimulator.simulate('[draggable="true"]', '[data-item-key="d"]', false)`)
        .snapshot('borderWhileDragging')
        // do a dragover on 'd' to render the drop hint
        .hover('[data-item-key=d]')
        .cssAnimations(true)
        .executeScript(`DndSimulator.simulate('[draggable="true"]', '[data-item-key="d"]', true)`)
        .snapshot('dropHint')
        .end()}
    >
      {story()}
    </StoryWright>
  ))

  .addStory('Root', () => (
    <DetailsHeader
      selection={_selection}
      selectionMode={SelectionMode.multiple}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      columns={columns}
      columnReorderProps={_columnReorderProps}
    />
  ));
