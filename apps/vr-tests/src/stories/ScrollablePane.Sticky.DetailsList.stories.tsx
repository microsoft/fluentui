/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
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
import {
  ScrollablePane,
  ScrollbarVisibility,
  IScrollablePaneProps
} from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: {
    height: '860px',
    position: 'relative'
  },
  filter: {
    padding: '0 32px 20px 32px',
    maxWidth: 300
  },
  header: {
    margin: 0,
    padding: '0 32px'
  },
  row: {
    display: 'inline-block'
  },
  list: {
    padding: '0 32px'
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
export interface IScrollablePaneDetailsListExampleProps {
  scrollablePaneProps: IScrollablePaneProps;
  itemCount: number;
  numberOfColumns: number;
}
export class ScrollablePaneDetailsListExample extends React.Component<
  IScrollablePaneDetailsListExampleProps,
  IScrollablePaneDetailsListExampleState
> {
  private _selection: Selection;
  private _allItems: IScrollablePaneDetailsListExampleItem[];
  private _columns: IColumn[];

  constructor(props: IScrollablePaneDetailsListExampleProps) {
    super(props);

    this._selection = new Selection();

    this._allItems = [];
    const { numberOfColumns, itemCount } = this.props;
    let rowData = '';
    for (let i = 0; i < itemCount; i++) {
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
    for (let i = 1; i <= numberOfColumns; i++) {
      this._columns.push({
        key: 'column' + i,
        name: 'Test ' + i,
        fieldName: 'test' + i,
        minWidth: 150,
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
      <div
        style={{
          height: '860px',
          position: 'relative',
          maxHeight: 'inherit',
          width: '900px'
        }}
      >
        <Fabric>
          <div className={classNames.wrapper}>
            <ScrollablePane
              style={{ maxWidth: '900px', border: '1px solid #edebe9' }}
              {...this.props.scrollablePaneProps}
            >
              <Sticky
                stickyPosition={StickyPositionType.Header}
                order={1}
                stickyBackgroundColor={stickyBackgroundColor}
              >
                <TextField
                  className={classNames.filter}
                  label="Filter by name:"
                  onChange={this._onFilterChange}
                />
              </Sticky>
              <Sticky
                stickyPosition={StickyPositionType.Header}
                order={2}
                stickyBackgroundColor={stickyBackgroundColor}
              >
                <h1 className={classNames.header}>Item list</h1>
              </Sticky>
              <div className={classNames.list}>
                <MarqueeSelection selection={this._selection}>
                  <DetailsList
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
        </Fabric>
      </div>
    );
  }

  private _onFilterChange = (ev: React.FormEvent<HTMLElement>, text: string) => {
    this.setState({
      items: text
        ? this._allItems.filter((item: IScrollablePaneDetailsListExampleItem) =>
            hasText(item, text)
          )
        : this._allItems
    });
  };
}

function _onItemInvoked(item: IScrollablePaneDetailsListExampleItem): void {
  alert('Item invoked: ' + item.test1);
}

function onRenderDetailsHeader(
  props: IDetailsHeaderProps,
  defaultRender?: IRenderFunction<IDetailsHeaderProps>
): JSX.Element {
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
        onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => (
          <TooltipHost {...tooltipHostProps} />
        )
      })}
    </Sticky>
  );
}

function onRenderDetailsFooter(
  props: IDetailsFooterProps,
  defaultRender?: IRenderFunction<IDetailsFooterProps>
): JSX.Element {
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
  return `${item.test1}|${item.test2}|${item.test3}`.indexOf(text) > -1;
}
const getElement = "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0]";
const cropTo = { cropTo: '.testWrapper' };
const scrollablePaneProps: IScrollablePaneProps = {
  scrollbarVisibility: ScrollbarVisibility.always,
  stickyFooterContainerBehavior: 'always',
  stickyHeaderContainerBehavior: 'onScroll',
  optimizeForPerformace: true
};
const scrollablePaneProps1: IScrollablePaneProps = {
  ...scrollablePaneProps,
  stickyHeaderContainerBehavior: 'always'
};

storiesOf('ScrollablePane-Sticky Details List', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', cropTo)
        .executeScript(`${getElement}.scrollLeft=99999`)
        .snapshot(
          'scroll horizontally to see if header and footer are aligned for zero vertical scroll',
          cropTo
        )
        .executeScript(`${getElement}.scrollTop=50`)
        .snapshot(
          'scroll down so that header becomes sticky when horizontal scroll is non-zero',
          cropTo
        )
        .executeScript(`${getElement}.scrollLeft=0`)
        .executeScript(`${getElement}.scrollTop=2`)
        .snapshot('scroll down by a small amount so that the first row is still visible', cropTo)
        .executeScript(`${getElement}.scrollLeft=50`)
        .snapshot(
          'scroll horizontally to see if header and footer are aligned for non-zero scroll',
          cropTo
        )
        .executeScript(`${getElement}.scrollTop=100`)
        .executeScript(`${getElement}.scrollLeft=99999`)
        .snapshot(
          'scroll horizontally to see if header and footer are aligned for non-zero scroll (1)',
          cropTo
        )
        .executeScript(`${getElement}.scrollLeft=0`)
        .snapshot('scroll horizontally to see if header and footer are aligned', cropTo)
        .executeScript(`${getElement}.scrollTop=999999`)
        .executeScript(`${getElement}.scrollLeft=50`)
        .snapshot(
          'scroll horizontally to see if header and footer are aligned for non-zero scroll (2)',
          cropTo
        )
        .executeScript(`${getElement}.scrollLeft=0`)
        .snapshot('scroll down to the bottom', cropTo)
        .executeScript(`${getElement}.scrollTop=0`)
        .snapshot('scroll up to the top', cropTo)
        .executeScript(`${getElement}.scrollLeft=99999`)
        .snapshot('scroll left', cropTo)
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('ScrollablePane Details List with sticky header & footer (1)', () => (
    <ScrollablePaneDetailsListExample
      itemCount={200}
      numberOfColumns={3}
      scrollablePaneProps={scrollablePaneProps}
    />
  ))
  .addStory('ScrollablePane Details List with sticky header & footer (2)', () => (
    <ScrollablePaneDetailsListExample
      itemCount={200}
      numberOfColumns={6}
      scrollablePaneProps={scrollablePaneProps}
    />
  ))
  .addStory('ScrollablePane Details List with sticky header & footer (3)', () => (
    <ScrollablePaneDetailsListExample
      itemCount={200}
      numberOfColumns={6}
      scrollablePaneProps={scrollablePaneProps1}
    />
  ));
