import * as React from 'react';

import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  IColumn,
  IGroup,
  SelectionMode
} from 'office-ui-fabric-react/lib/DetailsList';

import { ITheme } from 'office-ui-fabric-react/lib/Styling';

import { SemanticColorSlots } from '../../../../packages/office-ui-fabric-react/lib';

export interface ISemanticSlotsDetailsListProps {
  noneSlots: SemanticColorSlots[];
  neutralSlots: SemanticColorSlots[];
  softSlots: SemanticColorSlots[];
  strongSlots: SemanticColorSlots[];
  theme: ITheme | undefined;
}

interface ISemanticSlotsDetailsList {
  key: string;
  noneSlot: SemanticColorSlots;
  neutralSlot: SemanticColorSlots;
  softSlot: SemanticColorSlots;
  strongSlot: SemanticColorSlots;
}

export const SemanticSlotsDetailsList: React.StatelessComponent<ISemanticSlotsDetailsListProps> = (
  props: ISemanticSlotsDetailsListProps
) => {
  let bodyIndex = 5;
  let linkIndex = 10;
  let buttonIndex = 15;
  let inputIndex = 20;
  let listIndex = 25;
  let menuIndex = 30;

  let items: ISemanticSlotsDetailsList[] = [];
  let groups: IGroup[] = [];
  let columns: IColumn[] = [];
  const newTheme = props.theme;

  // const onRenderRow = (detailsRowProps: IDetailsRowProps | undefined): JSX.Element => {
  // };

  for (let i = 0; i < props.noneSlots.length; i++) {
    items.push({
      key: i.toString(),
      noneSlot: props.noneSlots[i],
      neutralSlot: props.neutralSlots[i],
      softSlot: props.softSlots[i],
      strongSlot: props.strongSlots[i]
    });
  }

  // CONFUSED: can I parse through FOUR DIFFERENT lists, one for each column?

  groups = [
    { key: 'Body', name: 'body', startIndex: 0, count: bodyIndex },

    {
      key: 'Links',
      name: 'links',
      startIndex: bodyIndex + 1,
      count: linkIndex
    },

    {
      key: 'Button',
      name: 'buttons',
      startIndex: linkIndex + 1,
      count: buttonIndex
    },

    {
      key: 'Inputs',
      name: 'inputs',
      startIndex: buttonIndex + 1,
      count: inputIndex
    },

    {
      key: 'Lists',
      name: 'lists',
      startIndex: inputIndex + 1,
      count: listIndex
    },

    {
      key: 'Menus',
      name: 'menus',
      startIndex: listIndex + 1,
      count: menuIndex // TODO: change to length of each column's list .length
    }
  ];

  columns = [
    { key: 'None', name: 'none', fieldName: 'none', minWidth: 100, maxWidth: 200, isResizable: true },

    { key: 'Neutral', name: 'netural', fieldName: 'neutral', minWidth: 100, maxWidth: 200, isResizable: true },

    { key: 'Soft', name: 'soft', fieldName: 'soft', minWidth: 100, maxWidth: 200, isResizable: true },

    { key: 'Strong', name: 'strong', fieldName: 'strong', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  return (
    <div>
      <DetailsList
        items={items}
        groups={groups}
        columns={columns}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        selectionMode={SelectionMode.none}
        // onRenderRow={onRenderRow}
        groupProps={{
          showEmptyGroups: true
        }}
      />
    </div>
  );
};
