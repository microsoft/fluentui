import * as React from 'react';
import {
  DetailsHeader,
  DetailsList,
  DetailsRow,
  IGroup,
  IDetailsListProps,
  IDetailsGroupRenderProps,
  CheckboxVisibility,
  buildColumns,
  IColumn,
  IDetailsRowStyles,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
import { HighContrastSelector } from '@fluentui/style-utilities';
import { GroupHeader, IGroupHeaderProps } from '@fluentui/react/lib/GroupedList';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const ROW_HEIGHT: number = 42; // from DEFAULT_ROW_HEIGHTS in DetailsRow.styles.ts
const GROUP_HEADER_AND_FOOTER_SPACING: number = 8;
const GROUP_HEADER_AND_FOOTER_BORDER_WIDTH: number = 1;
const GROUP_HEADER_HEIGHT: number = 95;
const GROUP_FOOTER_HEIGHT: number = GROUP_HEADER_AND_FOOTER_SPACING * 4 + GROUP_HEADER_AND_FOOTER_BORDER_WIDTH * 2;

const detailsRowStyles: Partial<IDetailsRowStyles> = {
  root: {
    background: 'transparent',
    borderBottom: 'none',
    selectors: {
      [HighContrastSelector]: {
        // forcedColorAdjust: 'none',
        background: 'transparent',
        // borderBottomColor: 'transparent',
      },
    },
  },
};

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
const dropdownOptions = [
  { key: 'onHover', text: 'CheckboxVisibility.onHover' },
  { key: 'always', text: 'CheckboxVisibility.always' },
  { key: 'hidden', text: 'CheckboxVisibility.hidden' },
];

interface ICumulativeExampleItem {
  name: string;
  count: number;
}

export class DetailsListCumulativeGroupHeadersExample extends React.Component<{}, { selectedItem: IDropdownOption }> {
  private _items: ICumulativeExampleItem[];
  private _groups: IGroup[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._items = [
      { name: 'Item 1', count: 1 },
      { name: 'Item 2', count: 2 },
      { name: 'Item 3', count: 3 },
      { name: 'Item 4', count: 4 },
      { name: 'Item 5', count: 5 },
      { name: 'Item 6', count: 6 },
    ];
    this._groups = [
      {
        name: 'First Group',
        key: 'first-group',
        startIndex: 0,
        count: 3,
      },
      {
        name: 'Second Group',
        key: 'second-group',
        startIndex: 3,
        count: 3,
      },
    ];
    this._columns = buildColumns(this._items);
    this.state = { selectedItem: dropdownOptions[0] };
  }

  public render(): JSX.Element {
    return (
      <>
        <Dropdown
          label="Checkbox visibility"
          selectedKey={this.state.selectedItem.key}
          onChange={this._onChange}
          options={dropdownOptions}
          styles={dropdownStyles}
        />
        <DetailsList
          items={this._items}
          groups={this._groups}
          groupProps={{
            onRenderHeader: this._onRenderGroupHeader,
            headerProps: {
              onRenderTitle: this._onRenderGroupHeaderTitle,
            },
          }}
          getGroupHeight={this._getGroupHeight}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          checkboxVisibility={CheckboxVisibility[this.state.selectedItem.key as keyof typeof CheckboxVisibility]}
        />
      </>
    );
  }

  private _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
    this.setState({ selectedItem: item });
  };

  private _onRenderDetailsHeader: IDetailsListProps['onRenderDetailsHeader'] = props => {
    if (props) {
      return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Toggle selection'} />;
    }
    return null;
  };

  private _onRenderGroupHeader: IDetailsGroupRenderProps['onRenderHeader'] = props => {
    if (props) {
      // This retrieves the measured column width
      this._columns = props.columns!;
      return <GroupHeader {...props} />;
    }

    return null;
  };

  private _getSumFromGroup = (group: IGroup): number => {
    const { startIndex, count } = group;

    let sum = 0;
    for (let i = startIndex; i < startIndex + count; i++) {
      sum += this._items[i].count;
    }

    return sum;
  };

  private _onRenderGroupHeaderTitle: IGroupHeaderProps['onRenderTitle'] = props => {
    if (props) {
      const item = {
        ...props.group,
        count: this._getSumFromGroup(props.group!),
      };

      console.log('props', props);

      return (
        <DetailsRow
          {...props}
          styles={detailsRowStyles}
          groupNestingDepth={props.groupLevel! - 1}
          columns={this._columns}
          item={item}
          itemIndex={-1}
          checkboxVisibility={CheckboxVisibility.hidden}
        />
      );
    }

    return null;
  };

  private _getGroupTotalRowHeight = (group: IGroup): number => {
    return group.isCollapsed ? 0 : ROW_HEIGHT * group.count;
  };

  private _getGroupHeight = (group: IGroup, _groupIndex: number): number => {
    return GROUP_HEADER_HEIGHT + GROUP_FOOTER_HEIGHT + this._getGroupTotalRowHeight(group);
  };
}
