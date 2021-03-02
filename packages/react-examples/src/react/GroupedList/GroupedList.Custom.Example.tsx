import * as React from 'react';
import { GroupedList, IGroup, IGroupHeaderProps, IGroupFooterProps } from '@fluentui/react/lib/GroupedList';
import { Link } from '@fluentui/react/lib/Link';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';
import { getTheme, mergeStyleSets, IRawStyle } from '@fluentui/react/lib/Styling';

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

const onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
  if (props) {
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };
    return (
      <div className={classNames.header}>
        This is a custom header for {props.group!.name}
        &nbsp; (
        <Link
          // eslint-disable-next-line react/jsx-no-bind
          onClick={toggleCollapse}
        >
          {props.group!.isCollapsed ? 'Expand' : 'Collapse'}
        </Link>
        )
      </div>
    );
  }

  return null;
};

const onRenderCell = (nestingDepth?: number, item?: IExampleItem, itemIndex?: number): React.ReactNode => {
  return item ? (
    <div role="row" data-selection-index={itemIndex}>
      <span role="cell" className={classNames.name}>
        {item.name}
      </span>
    </div>
  ) : null;
};

const onRenderFooter = (props?: IGroupFooterProps): JSX.Element | null => {
  return props ? <div className={classNames.footer}>This is a custom footer for {props.group!.name}</div> : null;
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
