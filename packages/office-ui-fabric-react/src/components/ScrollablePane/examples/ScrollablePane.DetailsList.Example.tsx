import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsHeaderProps,
  Selection,
  ConstrainMode,
  IDetailsFooterProps,
  DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IDetailsColumnRenderTooltipProps } from 'office-ui-fabric-react/lib/DetailsList';

export interface IScrollablePaneDetailsListExampleItem {
  key: number | string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
    backgroundColor: 'white',
  },
  filter: {
    backgroundColor: 'white',
    paddingBottom: 20,
    maxWidth: 300,
  },
  header: {
    margin: 0,
    backgroundColor: 'white',
  },
  row: {
    display: 'inline-block',
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
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip,
      })}
    </Sticky>
  );
};
const onRenderDetailsFooter: IRenderFunction<IDetailsFooterProps> = (props, defaultRender) => {
  if (!props) {
    return null;
  }
  return (
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true}>
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
    </Sticky>
  );
};
const hasText = (item: IScrollablePaneDetailsListExampleItem, text: string): boolean => {
  return `${item.test1}|${item.test2}|${item.test3}|${item.test4}|${item.test5}|${item.test6}`.indexOf(text) > -1;
};

export const ScrollablePaneDetailsListExample: React.FunctionComponent = () => {
  const [items, setItems] = React.useState(allItems);
  const [selection] = React.useState<Selection>(() => {
    const s = new Selection();
    s.setItems(items, true);
    return s;
  });
  const onFilterChange = (ev: React.FormEvent<HTMLElement>, text: string) => {
    setItems(text ? allItems.filter((item: IScrollablePaneDetailsListExampleItem) => hasText(item, text)) : allItems);
  };
  return (
    <div className={classNames.wrapper}>
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <Sticky stickyPosition={StickyPositionType.Header}>
          <TextField className={classNames.filter} label="Filter by name:" onChange={onFilterChange} />
        </Sticky>
        <Sticky stickyPosition={StickyPositionType.Header}>
          <h1 className={classNames.header}>Item list</h1>
        </Sticky>
        <MarqueeSelection selection={selection}>
          <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            constrainMode={ConstrainMode.unconstrained}
            onRenderDetailsHeader={onRenderDetailsHeader}
            onRenderDetailsFooter={onRenderDetailsFooter}
            selection={selection}
            selectionPreservedOnEmptyClick
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={onItemInvoked}
          />
        </MarqueeSelection>
      </ScrollablePane>
    </div>
  );
};
