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
import { IThemeRules } from '../../../../packages/office-ui-fabric-react/lib';
import { SemanticColorSlots } from '../../../../packages/office-ui-fabric-react/lib';

export interface ISemanticSlotsDetailsListProps {
  slotNames: string[];
  noneSlots: SemanticColorSlots[];
  neutralSlots: SemanticColorSlots[];
  softSlots: SemanticColorSlots[];
  strongSlots: SemanticColorSlots[];
  theme: ITheme | undefined;
  themeRules?: IThemeRules;
}

interface ISemanticSlotsDetailsList {
  key: string;
  slotName: string;
  noneSlot: SemanticColorSlots;
  neutralSlot: SemanticColorSlots;
  softSlot: SemanticColorSlots;
  strongSlot: SemanticColorSlots;
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
  const newTheme = props.theme;

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
    { key: 'slotname', name: 'Slot name', fieldName: 'slot name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'none', name: 'None', fieldName: 'none', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'neutral', name: 'Netural', fieldName: 'neutral', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'soft', name: 'Soft', fieldName: 'soft', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'strong', name: 'Strong', fieldName: 'strong', minWidth: 100, maxWidth: 200, isResizable: true }
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
