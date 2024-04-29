import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsHeaderProps,
  Selection,
  IColumn,
  ConstrainMode,
  IDetailsFooterProps,
  DetailsRow,
} from '@fluentui/react/lib/DetailsList';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { TooltipHost, ITooltipHostProps } from '@fluentui/react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { Fabric } from '@fluentui/react/lib/Fabric';
import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';

const stickyListTitleClass = mergeStyles({
  paddingTop: '100px',
});

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Test 1',
    fieldName: 'test1',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Test 2',
    fieldName: 'test2',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column3',
    name: 'Test 3',
    fieldName: 'test3',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column4',
    name: 'Test 4',
    fieldName: 'test4',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column5',
    name: 'Test 5',
    fieldName: 'test5',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column6',
    name: 'Test 6',
    fieldName: 'test6',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
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

class ScrollablePaneDetailsListStory extends React.Component<{}, {}> {
  private _selection: Selection;
  private readonly _items: IItem[];

  constructor(props: {}) {
    super(props);

    this._items = [];
    let rowData = '';
    for (let i = 0; i < 200; i++) {
      rowData = 'row ' + (i + 1).toString() + ', column ';
      this._items.push({
        key: i,
        test1: rowData + '1',
        test2: rowData + '2',
        test3: rowData + '3',
        test4: rowData + '4',
        test5: rowData + '5',
        test6: rowData + '6',
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
          width: '500px',
        }}
      >
        <Fabric>
          <ScrollablePane
            scrollbarVisibility={ScrollbarVisibility.auto}
            style={{ maxWidth: '500px', border: '1px solid #edebe9' }}
          >
            {/* providing backgroundColor as no parent element for the test has this property defined */}
            <Sticky
              stickyPosition={StickyPositionType.Header}
              stickyBackgroundColor={getTheme().palette.white}
              stickyClassName={stickyListTitleClass}
            >
              <h1 style={{ margin: '0px' }}>Item List</h1>
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
  defaultRender?: IRenderFunction<IDetailsHeaderProps>,
): JSX.Element {
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => (
          <TooltipHost {...tooltipHostProps} />
        ),
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
            test6: 'Total 6',
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

storiesOf('ScrollablePane Details List', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 2",
        )
        .snapshot('scroll down by a small amount so that the first row is still visible', {
          cropTo: '.testWrapper',
        })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 99999",
        )
        .snapshot('scroll down to the bottom', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0].scrollTop = 0",
        )
        .snapshot('scroll up to the top', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('ScrollablePane Details List with sticky header & footer', () => (
    <ScrollablePaneDetailsListStory />
  ));
