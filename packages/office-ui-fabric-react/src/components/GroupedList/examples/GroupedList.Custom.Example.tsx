import * as React from 'react';
import { GroupedList, IGroup, IGroupHeaderProps, IGroupFooterProps } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';
import { getTheme, mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const headerAndFooterStyles: IRawStyle = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16,
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
    paddingLeft: 32,
  },
});

const onRenderHeader = (props: IGroupHeaderProps): JSX.Element => {
  const toggleCollapse = (): void => {
    props.onToggleCollapse!(props.group!);
  };
  return (
    <div className={classNames.header}>
      This is a custom header for {props.group!.name}
      &nbsp; (<Link onClick={toggleCollapse}>{props.group!.isCollapsed ? 'Expand' : 'Collapse'}</Link>)
    </div>
  );
};

const onRenderCell = (nestingDepth: number, item: IExampleItem, itemIndex: number): JSX.Element => {
  return (
    <div role="row" data-selection-index={itemIndex}>
      <span role="cell" className={classNames.name}>
        {item.name}
      </span>
    </div>
  );
};

const onRenderFooter = (props: IGroupFooterProps): JSX.Element => {
  return <div className={classNames.footer}>This is a custom footer for {props.group!.name}</div>;
};

const groupedListProps = {
  onRenderHeader,
  onRenderFooter,
};
const items: IExampleItem[] = createListItems(20);
const groups: IGroup[] = createGroups(4, 0, 0, 5);

export const GroupedListCustomExample: React.FunctionComponent = () => (
  <GroupedList items={items} onRenderCell={onRenderCell} groupProps={groupedListProps} groups={groups} />
);
