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
import { SemanticColorSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';

export interface ISemanticSlotsDetailsListProps {
  slotNames: string[];
  noneSlots: JSX.Element[];
  neutralSlots: JSX.Element[];
  softSlots: JSX.Element[];
  strongSlots: JSX.Element[];
}

interface ISemanticSlotsDetailsList {
  key: string;
  slotName: string;
  noneSlot: JSX.Element;
  neutralSlot: JSX.Element;
  softSlot: JSX.Element;
  strongSlot: JSX.Element;
}

export const SemanticSlotsDetailsList: React.StatelessComponent<ISemanticSlotsDetailsListProps> = (
  props: ISemanticSlotsDetailsListProps
) => {
  let bodyIndex = 13;
  let linkIndex = 17;
  let buttonIndex = 42;
  let inputIndex = 56;
  let listIndex = 63;
  let menuIndex = 71;

  let items: ISemanticSlotsDetailsList[] = [];
  let groups: IGroup[] = [];
  let columns: IColumn[] = [];

  // const onRenderRow = (detailsRowProps: IDetailsRowProps | undefined): JSX.Element => {
  // };

  for (let i = 0; i < props.slotNames.length; i++) {
    items.push({
      key: i.toString(),
      slotName: props.slotNames[i],
      noneSlot: props.noneSlots[i],
      neutralSlot: props.neutralSlots[i],
      softSlot: props.softSlots[i],
      strongSlot: props.strongSlots[i]
    });
  }

  console.log(items);

  // CONFUSED: can I parse through FOUR DIFFERENT lists, one for each column?
  groups = [
    { key: 'defaults', name: 'Defaults', startIndex: 0, count: bodyIndex, isCollapsed: false },

    {
      key: 'Links',
      name: 'Links',
      startIndex: bodyIndex,
      count: linkIndex,
      isCollapsed: true
    },

    {
      key: 'button',
      name: 'Buttons',
      startIndex: linkIndex,
      count: buttonIndex,
      isCollapsed: true
    },

    {
      key: 'inputs',
      name: 'Inputs',
      startIndex: buttonIndex,
      count: inputIndex,
      isCollapsed: true
    },

    {
      key: 'lists',
      name: 'Lists',
      startIndex: inputIndex,
      count: listIndex,
      isCollapsed: true
    },

    {
      key: 'menus',
      name: 'Menus',
      startIndex: listIndex,
      count: menuIndex, // TODO: change to length of each column's list .length
      isCollapsed: true
    }
  ];

  columns = [
    { key: 'slotName', name: 'Slot name', fieldName: 'slotName', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'noneSlot', name: 'None', fieldName: 'noneSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'neutralSlot', name: 'Netural', fieldName: 'neutralSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'softSlot', name: 'Soft', fieldName: 'softSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'strongSlot', name: 'Strong', fieldName: 'strongSlot', minWidth: 100, maxWidth: 200, isResizable: true }
    // TODO: INVERSES
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
