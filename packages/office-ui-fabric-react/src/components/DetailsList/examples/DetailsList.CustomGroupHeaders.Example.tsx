import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsHeader, DetailsList, IDetailsHeaderProps, IGroup, IGroupDividerProps } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

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
    zIndex: 100
  },
  headerTitle: [
    theme.fonts.xLarge,
    {
      padding: '4px 0'
    }
  ],
  headerLinkSet: {
    margin: '4px -8px'
  },
  headerLink: {
    margin: '0 8px'
  }
});

const ITEMS_PER_GROUP = 20;
const GROUP_COUNT = 20;

export class DetailsListCustomGroupHeadersExample extends React.Component<{}, {}> {
  private _items: IExampleItem[];
  private _groups: IGroup[];

  constructor(props: {}) {
    super(props);

    this._items = createListItems(500);
    this._groups = createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
  }

  public render(): JSX.Element {
    return (
      <DetailsList
        items={this._items}
        groups={this._groups}
        groupProps={{
          onRenderHeader: this._onRenderGroupHeader,
          onRenderFooter: this._onRenderGroupFooter
        }}
        getGroupHeight={this._getGroupHeight}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
        onRenderDetailsHeader={this._onRenderDetailsHeader}
      />
    );
  }

  private _onRenderDetailsHeader(props: IDetailsHeaderProps) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Toggle selection'} />;
  }

  private _onRenderGroupHeader = (props: IGroupDividerProps): JSX.Element => {
    return (
      <div className={classNames.headerAndFooter}>
        <div className={classNames.headerTitle}>{`Custom header for ${props.group!.name}`}</div>
        <div className={classNames.headerLinkSet}>
          <Link className={classNames.headerLink} onClick={this._onToggleSelectGroup(props)}>
            {props.isSelected ? 'Remove selection' : 'Select group'}
          </Link>
          <Link className={classNames.headerLink} onClick={this._onToggleCollapse(props)}>
            {props.group!.isCollapsed ? 'Expand group' : 'Collapse group'}
          </Link>
        </div>
      </div>
    );
  };

  private _onRenderGroupFooter = (props: IGroupDividerProps): JSX.Element => {
    return (
      <div className={classNames.headerAndFooter}>
        <em>{`Custom footer for ${props.group!.name}`}</em>
      </div>
    );
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
