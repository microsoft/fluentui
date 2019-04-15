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
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Test 1',
    fieldName: 'test1',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Test 2',
    fieldName: 'test2',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
  {
    key: 'column3',
    name: 'Test 3',
    fieldName: 'test3',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
  {
    key: 'column4',
    name: 'Test 4',
    fieldName: 'test4',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
  {
    key: 'column5',
    name: 'Test 5',
    fieldName: 'test5',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
  {
    key: 'column6',
    name: 'Test 6',
    fieldName: 'test6',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  }
];

interface IItem {
  key: number;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
}

export class ScrollablePaneStickyBreadcrumbExample extends React.Component<{}, {}> {
  private _selection: Selection;
  private _items: IItem[];

  constructor(props: {}) {
    super(props);

    this._items = [];
    for (let i = 0; i < 100; i++) {
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

    this._selection = new Selection();
  }

  public render(): JSX.Element {
    const breadcrumbStyle = {
      root: [
        {
          margin: '0 0 0 0'
        }
      ]
    };

    return (
      <div
        style={{
          height: '80vh',
          position: 'relative',
          maxHeight: 'inherit',
          width: '900px'
        }}
      >
        <Fabric>
          <ScrollablePane
            scrollbarVisibility={ScrollbarVisibility.auto}
            style={{ maxWidth: '900px', border: '1px solid #edebe9' }}
          >
            <Sticky
              stickyPosition={StickyPositionType.Header}
              stickyBackgroundColor={getTheme().palette.white}
            >
              <Breadcrumb
                styles={breadcrumbStyle}
                items={[
                  { text: 'Files', key: 'Files' },
                  { text: 'This is folder 1', key: 'f1' },
                  { text: 'This is folder 2', key: 'f2' },
                  { text: 'This is folder 3', key: 'f3', isCurrentItem: true }
                ]}
                ariaLabel={'breadcrumb-test'}
              />
            </Sticky>
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                items={this._items}
                columns={_columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                constrainMode={ConstrainMode.unconstrained}
                onRenderDetailsHeader={onRenderDetailsHeader}
                onRenderDetailsFooter={onRenderDetailsFooter}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                onItemInvoked={item => alert(`Item invoked: ${item.name}`)}
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
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
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
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true}>
      <div style={{ display: 'inline-block' }}>
        <DetailsRow
          columns={props.columns}
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
          selection={props.selection}
          selectionMode={(props.selection && props.selection.mode) || SelectionMode.none}
          viewport={props.viewport}
        />
      </div>
    </Sticky>
  );
}

const getElement = "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0]";
const cropTo = { cropTo: '.testWrapper' };

storiesOf('Sticky breadcrumb and sticky details list header', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', cropTo)
        .executeScript(`${getElement}.scrollTop = 5`)
        .snapshot(
          'scroll down by a small amount so that the first row is still visible and the header becomes sticky',
          cropTo
        )
        .executeScript(`${getElement}.scrollTop = 99999`)
        .snapshot('scroll down to the bottom', cropTo)
        .executeScript(`${getElement}.scrollTop = 0`)
        .snapshot('scroll up to the top', cropTo)
        .executeScript(`${getElement}.scrollLeft = 40`)
        .snapshot('scroll right', cropTo)
        .executeScript(`${getElement}.scrollTop = 99999`)
        .snapshot('scroll down when horizontal scroll is non-zero', cropTo)
        .executeScript(`${getElement}.scrollTop = 0`)
        .snapshot('scroll back to the top when horizontal scroll is non-zero', cropTo)
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('ScrollablePane Sticky Breadcrumb Details List', () => (
    <ScrollablePaneStickyBreadcrumbExample />
  ));
