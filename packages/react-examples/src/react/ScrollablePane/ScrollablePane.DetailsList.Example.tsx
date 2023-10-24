import * as React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsListStyles,
  IDetailsHeaderProps,
  ConstrainMode,
  IDetailsFooterProps,
  DetailsRow,
} from '@fluentui/react/lib/DetailsList';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IDetailsColumnRenderTooltipProps } from '@fluentui/react/lib/DetailsList';

export interface IScrollablePaneDetailsListExampleItem {
  key: number | string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

const gridStyles: Partial<IDetailsListStyles> = {
  root: {
    overflowX: 'scroll',
    selectors: {
      '& [role=grid]': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: '60vh',
      },
    },
  },
  headerWrapper: {
    flex: '0 0 auto',
  },
  contentWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
};

const classNames = mergeStyleSets({
  header: {
    margin: 0,
  },
  row: {
    flex: '0 0 auto',
  },
  focusZone: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  selectionZone: {
    height: '100%',
    overflow: 'hidden',
  },
});

const footerItem: IScrollablePaneDetailsListExampleItem = {
  key: 'footer',
  test1: 'Footer 1',
  test2: 'Footer 2',
  test3: 'Footer 3',
  test4: 'Footer 4',
  test5: 'Footer 5',
  test6: 'Footer 6',
};

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
const lorem = (wordCount: number): string => {
  const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
};
const allItems = Array.from({ length: 200 }).map((item, index) => ({
  key: index,
  test1: lorem(4),
  test2: lorem(4),
  test3: lorem(4),
  test4: lorem(4),
  test5: lorem(4),
  test6: lorem(4),
}));
const columns = Array.from({ length: 6 }).map((item, index) => ({
  key: 'column' + (index + 1),
  name: 'Test ' + (index + 1),
  fieldName: 'test' + (index + 1),
  minWidth: 100,
  maxWidth: 200,
  isResizable: true,
}));
const onItemInvoked = (item: IScrollablePaneDetailsListExampleItem): void => {
  alert('Item invoked: ' + item.test1);
};
const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
  if (!props) {
    return null;
  }
  const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = tooltipHostProps => (
    <TooltipHost {...tooltipHostProps} />
  );
  return defaultRender!({
    ...props,
    onRenderColumnHeaderTooltip,
  });
};
const onRenderDetailsFooter: IRenderFunction<IDetailsFooterProps> = (props, defaultRender) => {
  if (!props) {
    return null;
  }
  return (
    <div className={classNames.row}>
      <DetailsRow
        columns={props.columns}
        item={footerItem}
        itemIndex={-1}
        selection={props.selection}
        selectionMode={(props.selection && props.selection.mode) || SelectionMode.none}
        rowWidth={props.rowWidth}
      />
    </div>
  );
};

export const ScrollablePaneDetailsListExample: React.FunctionComponent = () => {
  const focusZoneProps = {
    className: classNames.focusZone,
    'data-is-scrollable': 'true',
  } as React.HTMLAttributes<HTMLElement>;

  return (
    <div>
      <h1 className={classNames.header}>Item list</h1>
      <DetailsList
        items={allItems}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderDetailsFooter={onRenderDetailsFooter}
        selectionPreservedOnEmptyClick
        styles={gridStyles}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onItemInvoked={onItemInvoked}
        focusZoneProps={focusZoneProps}
        selectionZoneProps={{
          className: classNames.selectionZone,
        }}
      />
    </div>
  );
};
