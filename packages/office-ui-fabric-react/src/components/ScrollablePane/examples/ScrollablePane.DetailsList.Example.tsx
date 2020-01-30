import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsHeaderProps,
  Selection,
  IColumn,
  ConstrainMode,
  IDetailsFooterProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost, ITooltipHostProps } from 'office-ui-fabric-react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative'
  },
  filter: {
    paddingBottom: 20,
    maxWidth: 300
  },
  header: {
    margin: 0
  },
  row: {
    display: 'inline-block'
  }
});

const _footerItem: IScrollablePaneDetailsListExampleItem = {
  key: 'footer',
  test1: 'Footer 1',
  test2: 'Footer 2',
  test3: 'Footer 3',
  test4: 'Footer 4',
  test5: 'Footer 5',
  test6: 'Footer 6'
};

export interface IScrollablePaneDetailsListExampleItem {
  key: number | string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

export interface IScrollablePaneDetailsListExampleState {
  items: IScrollablePaneDetailsListExampleItem[];
}

export class ScrollablePaneDetailsListExample extends React.Component<{}, IScrollablePaneDetailsListExampleState> {
  private _selection: Selection;
  private _allItems: IScrollablePaneDetailsListExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();

    this._allItems = [];
    for (let i = 0; i < 200; i++) {
      this._allItems.push({
        key: i,
        test1: _lorem(4),
        test2: _lorem(4),
        test3: _lorem(4),
        test4: _lorem(4),
        test5: _lorem(4),
        test6: _lorem(4)
      });
    }

    this._columns = [];
    for (let i = 1; i < 7; i++) {
      this._columns.push({
        key: 'column' + i,
        name: 'Test ' + i,
        fieldName: 'test' + i,
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      });
    }

    this.state = {
      items: this._allItems
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div className={classNames.wrapper}>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <Sticky stickyPosition={StickyPositionType.Header}>
            <TextField className={classNames.filter} label="Filter by name:" onChange={this._onFilterChange} />
          </Sticky>
          <Sticky stickyPosition={StickyPositionType.Header}>
            <h1 className={classNames.header}>Item list</h1>
          </Sticky>
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              columns={this._columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.fixedColumns}
              constrainMode={ConstrainMode.unconstrained}
              onRenderDetailsHeader={onRenderDetailsHeader}
              onRenderDetailsFooter={onRenderDetailsFooter}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              onItemInvoked={_onItemInvoked}
            />
          </MarqueeSelection>
        </ScrollablePane>
      </div>
    );
  }

  private _onFilterChange = (ev: React.FormEvent<HTMLElement>, text: string) => {
    this.setState({
      items: text ? this._allItems.filter((item: IScrollablePaneDetailsListExampleItem) => hasText(item, text)) : this._allItems
    });
  };
}

function _onItemInvoked(item: IScrollablePaneDetailsListExampleItem): void {
  alert('Item invoked: ' + item.test1);
}

function onRenderDetailsHeader(props: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => <TooltipHost {...tooltipHostProps} />
      })}
    </Sticky>
  );
}

function onRenderDetailsFooter(props: IDetailsFooterProps, defaultRender?: IRenderFunction<IDetailsFooterProps>): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true}>
      <div className={classNames.row}>
        <DetailsRow
          columns={props.columns}
          item={_footerItem}
          itemIndex={-1}
          selection={props.selection}
          selectionMode={(props.selection && props.selection.mode) || SelectionMode.none}
          viewport={props.viewport}
        />
      </div>
    </Sticky>
  );
}

function hasText(item: IScrollablePaneDetailsListExampleItem, text: string): boolean {
  return `${item.test1}|${item.test2}|${item.test3}|${item.test4}|${item.test5}|${item.test6}`.indexOf(text) > -1;
}

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
function _lorem(wordCount: number): string {
  const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}
