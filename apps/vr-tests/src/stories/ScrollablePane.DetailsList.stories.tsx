/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
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
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';


const classNames = mergeStyleSets({
  stickyListTitle: {
    paddingTop: '100px'
  },
  detailsListContent: {
    padding: '0 32px'
  }
});

interface IItem {
  key: number;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

class ScrollablePaneDetailsListStory extends React.Component<{}, {}> {
  private _selection: Selection;
  private readonly _items: IItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._items = [];

    for (let i = 0; i < 200; i++) {
      this._items.push({
        key: i,
        test1: i === 0 ? lorem(7) : lorem(2),
        test2: lorem(2),
        test3: lorem(2),
        test4: lorem(2),
        test5: lorem(2),
        test6: lorem(2)
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

    this._selection = new Selection();
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          height: '80vh',
          position: 'relative',
          maxHeight: 'inherit',
          width: '800px'
        }}
      >
        <Fabric>
          <ScrollablePane
            scrollbarVisibility={ScrollbarVisibility.auto}
            style={{ maxWidth: '800px', border: '1px solid #edebe9' }}
          >
            {/* providing backgroundColor as no parent element for the test has this property defined */}
            <Sticky
              stickyPosition={StickyPositionType.Header}
              stickyBackgroundColor={getTheme().palette.white}
              stickyClassName={classNames.stickyListTitle}
            >
              <h1 style={{ margin: '0px' }}>Item List</h1>
            </Sticky>
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                className={classNames.detailsListContent}
                items={this._items}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                constrainMode={ConstrainMode.unconstrained}
                onRenderDetailsHeader={onRenderDetailsHeader}
                onRenderDetailsFooter={onRenderDetailsFooter}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
              />
            </MarqueeSelection>
          </ScrollablePane>
        </Fabric>
      </div>
    );
  }
}

function onRenderDetailsHeader(
  props: IDetailsHeaderProps,
  defaultRender?: IRenderFunction<IDetailsHeaderProps>
): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true} stickyClassName={classNames.detailsListContent}>
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => (
          <TooltipHost {...tooltipHostProps} />
        )
      })}
    </Sticky>
  );
}

function onRenderDetailsFooter(props: IDetailsFooterProps): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true} stickyClassName={classNames.detailsListContent}>
      <div style={{ display: 'inline-block' }}>
        <DetailsRow
          {...props}
          item={{
            key: 'footer',
            test1: 'Total 1',
            test2: 'Total 2',
            test3: 'Total 3',
            test4: 'Total 4',
            test5: 'Total 5',
            test6: 'Total 6'
          }}
          itemIndex={-1}
          selectionMode={(props.selection && props.selection.mode) || SelectionMode.none}
        />
      </div>
    </Sticky>
  );
}

storiesOf('ScrollablePane Details List', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 2"
        )
        .snapshot('scroll down by a small amount so that the first row is still visible', {
          cropTo: '.testWrapper'
        })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 99999"
        )
        .snapshot('scroll down to the bottom', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollLeft = document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollWidth"
        )
        .snapshot('scroll horizontally till the last column of detailsList when header & footer are sticky', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollLeft = 0"
        )
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 0"
        )
        .snapshot('scroll up to the top', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollLeft = document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollWidth"
        )
        .snapshot('scroll horizontally till the last column of detailsList when only footer is sticky', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('ScrollablePane Details List with sticky header & footer', () => (
    <ScrollablePaneDetailsListStory />
  ));
