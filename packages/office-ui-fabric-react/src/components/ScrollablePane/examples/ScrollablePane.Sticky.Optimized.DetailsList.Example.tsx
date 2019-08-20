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
import { SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { mergeStyleSets, getTheme } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: {
    height: '860px',
    position: 'relative'
  },
  list: {
    padding: '0 32px'
  },
  detailsListRows: {
    selectors: {
      '.ms-DetailsRow': {
        animation: 'none'
      }
    }
  },
  filter: {
    maxWidth: 300,
    padding: '0 32px 20px 32px'
  },
  header: {
    margin: 0,
    padding: '0 32px'
  },
  row: {
    display: 'inline-block'
  },
  stickyDetailsHeader: {
    padding: '0 32px'
  },
  stickyDetailsFooter: {
    padding: '0 32px'
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

export class ScrollablePaneStickyOptimizedDetailsList extends React.Component<{}, IScrollablePaneDetailsListExampleState> {
  private _selection: Selection;
  private _allItems: IScrollablePaneDetailsListExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();

    this._allItems = [];
    let rowData = '';
    for (let i = 0; i < 200; i++) {
      rowData = 'row ' + (i + 1).toString() + ', column ';
      this._allItems.push({
        key: i,
        test1: rowData + '1',
        test2: rowData + '2',
        test3: rowData + '3',
        test4: rowData + '4',
        test5: rowData + '5',
        test6: rowData + '6'
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
    const stickyBackgroundColor = getTheme().palette.white;
    return (
      <div className={classNames.wrapper}>
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.always}
          stickyHeaderContainerBehavior={'onScroll'}
          stickyFooterContainerBehavior={'always'}
          optimizeForPerformance={true}
        >
          <Sticky stickyPosition={StickyPositionType.Header} order={1} stickyBackgroundColor={stickyBackgroundColor}>
            <TextField className={classNames.filter} label="Filter by name:" onChange={this._onFilterChange} />
          </Sticky>
          <Sticky stickyPosition={StickyPositionType.Header} order={2} stickyBackgroundColor={stickyBackgroundColor}>
            <h1 className={classNames.header}>Item list</h1>
          </Sticky>
          <div className={classNames.list}>
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                className={classNames.detailsListRows}
                items={items}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
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
          </div>
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
    <Sticky
      stickyPosition={StickyPositionType.Header}
      isScrollSynced={true}
      order={3}
      stickyBackgroundColor={getTheme().palette.white}
      stickyClassName={classNames.stickyDetailsHeader}
    >
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => <TooltipHost {...tooltipHostProps} />
      })}
    </Sticky>
  );
}

function onRenderDetailsFooter(props: IDetailsFooterProps, defaultRender?: IRenderFunction<IDetailsFooterProps>): JSX.Element {
  return (
    <Sticky
      stickyPosition={StickyPositionType.Footer}
      isScrollSynced={true}
      order={1}
      stickyBackgroundColor={getTheme().palette.white}
      stickyClassName={classNames.stickyDetailsFooter}
    >
      <div className={classNames.row}>
        <DetailsRow
          className={classNames.detailsListRows}
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
