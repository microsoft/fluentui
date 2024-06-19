import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import {
  DetailsHeader,
  DetailsList,
  IGroup,
  IGroupDividerProps,
  IDetailsListProps,
  IDetailsGroupRenderProps,
  SelectionMode,
  CheckboxVisibility,
} from '@fluentui/react/lib/DetailsList';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const ROW_HEIGHT: number = 42; // from DEFAULT_ROW_HEIGHTS in DetailsRow.styles.ts
const GROUP_HEADER_AND_FOOTER_SPACING: number = 8;
const GROUP_HEADER_AND_FOOTER_BORDER_WIDTH: number = 1;
const GROUP_HEADER_HEIGHT: number = 95;
const GROUP_FOOTER_HEIGHT: number = GROUP_HEADER_AND_FOOTER_SPACING * 4 + GROUP_HEADER_AND_FOOTER_BORDER_WIDTH * 2;

const theme = getTheme();
const classNames = mergeStyleSets({
  headerAndFooter: {
    borderTop: `${GROUP_HEADER_AND_FOOTER_BORDER_WIDTH}px solid ${theme.palette.neutralQuaternary}`,
    borderBottom: `${GROUP_HEADER_AND_FOOTER_BORDER_WIDTH}px solid ${theme.palette.neutralQuaternary}`,
    padding: GROUP_HEADER_AND_FOOTER_SPACING,
    margin: `${GROUP_HEADER_AND_FOOTER_SPACING}px 0`,
    background: theme.palette.neutralLighterAlt,
    // Overlay the sizer bars
    position: 'relative',
    zIndex: 100,
  },
  headerTitle: [
    theme.fonts.xLarge,
    {
      padding: '4px 0',
    },
  ],
  headerLinkSet: {
    margin: '4px -8px',
  },
  headerLink: {
    margin: '0 8px',
  },
});

const ITEMS_PER_GROUP = 20;
const GROUP_COUNT = 20;

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
const dropdownOptions = [
  { key: 'onHover', text: 'CheckboxVisibility.onHover' },
  { key: 'always', text: 'CheckboxVisibility.always' },
  { key: 'hidden', text: 'CheckboxVisibility.hidden' },
];

export class DetailsListCustomGroupHeadersExample extends React.Component<{}, { selectedItem: IDropdownOption }> {
  private _items: IExampleItem[];
  private _groups: IGroup[];

  constructor(props: {}) {
    super(props);

    this._items = createListItems(500);
    this._groups = createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
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
            onRenderFooter: this._onRenderGroupFooter,
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
      const { ariaColSpan = 1, ariaRowIndex } = props;
      // the custom group header row doesn't include the selection cell or expand/collapse column, so we need to add 2
      const finalColSpan = ariaColSpan + 2;
      return (
        <div
          className={classNames.headerAndFooter}
          role="row"
          aria-rowindex={ariaRowIndex}
          aria-expanded={!props.group!.isCollapsed}
        >
          <div role="gridcell" aria-colspan={finalColSpan}>
            <div className={classNames.headerTitle}>{`Custom header for ${props.group!.name}`}</div>
            <div className={classNames.headerLinkSet}>
              {props.selectionMode !== SelectionMode.none ? (
                <Link className={classNames.headerLink} onClick={this._onToggleSelectGroup(props)}>
                  {props.selected ? 'Remove selection' : 'Select group'}
                </Link>
              ) : null}
              <Link className={classNames.headerLink} onClick={this._onToggleCollapse(props)}>
                {props.group!.isCollapsed ? 'Expand group' : 'Collapse group'}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  private _onRenderGroupFooter: IDetailsGroupRenderProps['onRenderFooter'] = props => {
    if (props) {
      const { ariaColSpan = 1, ariaRowIndex } = props;
      return (
        <div className={classNames.headerAndFooter} role="row" aria-rowindex={ariaRowIndex}>
          <em role="gridcell" aria-colspan={ariaColSpan + 2}>{`Custom footer for ${props.group!.name}`}</em>
        </div>
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

  private _onToggleSelectGroup(props: IGroupDividerProps): () => void {
    return () => {
      props.onToggleSelectGroup!(props.group!);
    };
  }

  private _onToggleCollapse(props: IGroupDividerProps): () => void {
    return () => {
      props!.onToggleCollapse!(props!.group!);
    };
  }
}
