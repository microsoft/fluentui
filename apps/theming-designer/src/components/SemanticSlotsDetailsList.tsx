import * as React from 'react';

import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  IColumn,
  IGroup,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';

export interface ISemanticSlotsDetailsListProps {
  slotNames: string[];
  noneSlots: React.ReactElement[];
  neutralSlots: React.ReactElement[];
  softSlots: React.ReactElement[];
  strongSlots: React.ReactElement[];
}

interface ISemanticSlotsDetailsList {
  key: string;
  slotName: string;
  noneSlot: React.ReactElement;
  neutralSlot: React.ReactElement;
  softSlot: React.ReactElement;
  strongSlot: React.ReactElement;
}

export const SemanticSlotsDetailsList: React.FunctionComponent<ISemanticSlotsDetailsListProps> = (
  props: ISemanticSlotsDetailsListProps,
) => {
  let countDefaults = 17;
  let countLinks = 4;
  let countButtons = 23;
  let countInputs = 18;
  let countLists = 7;
  let countMenus = 8;

  let items: ISemanticSlotsDetailsList[] = [];
  let groups: IGroup[] = [];
  let columns: IColumn[] = [];

  const onRenderRow = (detailsRowProps: IDetailsRowProps | undefined): React.ReactElement => {
    if (detailsRowProps) {
      const rowStyles: Partial<IDetailsRowStyles> = {
        root: {
          selectors: {
            ':hover': {
              background: 'transparent',
            },
          },
        },
      };
      return <DetailsRow {...detailsRowProps!} styles={rowStyles} />;
    } else {
      return <div />;
    }
  };

  for (let i = 0; i < props.slotNames.length; i++) {
    items.push({
      key: i.toString(),
      slotName: props.slotNames[i],
      noneSlot: props.noneSlots[i],
      neutralSlot: props.neutralSlots[i],
      softSlot: props.softSlots[i],
      strongSlot: props.strongSlots[i],
    });
  }

  groups = [
    { key: 'defaults', name: 'Defaults', startIndex: 0, count: countDefaults, isCollapsed: false },

    {
      key: 'Links',
      name: 'Links',
      startIndex: countDefaults,
      count: countLinks,
      isCollapsed: true,
    },

    {
      key: 'button',
      name: 'Buttons',
      startIndex: countDefaults + countLinks,
      count: countButtons,
      isCollapsed: true,
    },

    {
      key: 'inputs',
      name: 'Inputs',
      startIndex: countDefaults + countLinks + countButtons,
      count: countInputs,
      isCollapsed: true,
    },

    {
      key: 'lists',
      name: 'Lists',
      startIndex: countDefaults + countLinks + countButtons + countInputs,
      count: countLists,
      isCollapsed: true,
    },

    {
      key: 'menus',
      name: 'Menus',
      startIndex: countDefaults + countLinks + countButtons + countInputs + countLists,
      count: countMenus,
      isCollapsed: true,
    },
  ];

  columns = [
    { key: 'slotName', name: 'Slot name', fieldName: 'slotName', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'noneSlot', name: 'None', fieldName: 'noneSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'neutralSlot', name: 'Netural', fieldName: 'neutralSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'softSlot', name: 'Soft', fieldName: 'softSlot', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'strongSlot', name: 'Strong', fieldName: 'strongSlot', minWidth: 100, maxWidth: 200, isResizable: true },
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
        // eslint-disable-next-line react/jsx-no-bind
        onRenderRow={onRenderRow}
        groupProps={{
          showEmptyGroups: true,
        }}
      />
    </div>
  );
};
