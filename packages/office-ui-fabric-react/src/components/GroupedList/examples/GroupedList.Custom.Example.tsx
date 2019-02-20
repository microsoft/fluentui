// @codepen

import * as React from 'react';
import { GroupedList, IGroup, IGroupHeaderProps, IGroupFooterProps } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { createListItems, createGroups, IExampleItem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { getTheme, mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const headerAndFooterStyles: IRawStyle = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16
};
const classNames = mergeStyleSets({
  header: [headerAndFooterStyles, theme.fonts.xLarge],
  footer: [headerAndFooterStyles, theme.fonts.large],
  name: {
    display: 'inline-block',
    overflow: 'hidden',
    height: 24,
    cursor: 'default',
    padding: 8,
    boxSizing: 'border-box',
    verticalAlign: 'top',
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: 32
  }
});

export class GroupedListCustomExample extends React.Component {
  private _items: IExampleItem[] = createListItems(20);
  private _groups: IGroup[] = createGroups(4, 0, 0, 5);

  public render(): JSX.Element {
    return (
      <GroupedList
        items={this._items}
        onRenderCell={this._onRenderCell}
        groupProps={{
          onRenderHeader: this._onRenderHeader,
          onRenderFooter: this._onRenderFooter
        }}
        groups={this._groups}
      />
    );
  }

  private _onRenderCell(nestingDepth: number, item: IExampleItem, itemIndex: number): JSX.Element {
    return (
      <div data-selection-index={itemIndex}>
        <span className={classNames.name}>{item.name}</span>
      </div>
    );
  }

  private _onRenderHeader(props: IGroupHeaderProps): JSX.Element {
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };

    return (
      <div className={classNames.header}>
        This is a custom header for {props.group!.name}
        &nbsp; (<Link onClick={toggleCollapse}>{props.group!.isCollapsed ? 'Expand' : 'Collapse'}</Link>)
      </div>
    );
  }

  private _onRenderFooter(props: IGroupFooterProps): JSX.Element {
    return <div className={classNames.footer}>This is a custom footer for {props.group!.name}</div>;
  }
}
