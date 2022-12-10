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
  IDetailsRowCheckProps,
  DetailsRowCheck,
} from '@fluentui/react/lib/DetailsList';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { TooltipHost, ITooltipHostProps } from '@fluentui/react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { Fabric } from '@fluentui/react/lib/Fabric';
import { getTheme } from '@fluentui/react/lib/Styling';
import { createGroups } from '@fluentui/example-data';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const columnMidWidth = 200;
const columnMaxWidth = 300;
const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Test 1',
    fieldName: 'test1',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for name',
  },
  {
    key: 'column2',
    name: 'Test 2',
    fieldName: 'test2',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for value',
  },
  {
    key: 'column3',
    name: 'Test 3',
    fieldName: 'test3',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for value',
  },
  {
    key: 'column4',
    name: 'Test 4',
    fieldName: 'test4',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for value',
  },
  {
    key: 'column5',
    name: 'Test 5',
    fieldName: 'test5',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for value',
  },
  {
    key: 'column6',
    name: 'Test 6',
    fieldName: 'test6',
    minWidth: columnMidWidth,
    maxWidth: columnMaxWidth,
    isResizable: true,
    ariaLabel: 'Operations for value',
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
const _groups = createGroups(100, 0, 0, 1, 0, '', true);

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
    maxHeight: 'inherit',
    width: '800px',
  },
  footerDetailsRow: {
    display: 'inline-block',
  },
  detailsListContent: {
    padding: '0 64px',
  },
});

class ScrollablePaneDetailsListStory extends React.Component<{}, {}> {
  private _selection: Selection;
  private readonly _items: IItem[];

  constructor(props: {}) {
    super(props);

    this._items = [];
    let rowData = '';
    for (let i = 0; i < 100; i++) {
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
      <div className={classNames.wrapper}>
        <Fabric>
          <ScrollablePane
            scrollbarVisibility={ScrollbarVisibility.auto}
            style={{ maxWidth: '800px', border: '1px solid #edebe9' }}
          >
            {/* providing backgroundColor as no parent element for the test has this property defined */}
            <Sticky
              stickyPosition={StickyPositionType.Header}
              stickyBackgroundColor={getTheme().palette.white}
            >
              <h1 style={{ margin: '0px' }}>Item List</h1>
            </Sticky>
            <MarqueeSelection selection={this._selection}>
              <DetailsList
                className={classNames.detailsListContent}
                items={this._items}
                groups={_groups}
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
    <Sticky
      stickyPosition={StickyPositionType.Header}
      isScrollSynced={true}
      stickyClassName={classNames.detailsListContent}
    >
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
    <Sticky
      stickyPosition={StickyPositionType.Footer}
      isScrollSynced={true}
      stickyClassName={classNames.detailsListContent}
    >
      <div className={classNames.footerDetailsRow}>
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
          selectionMode={SelectionMode.single}
          viewport={props.viewport}
          groupNestingDepth={props.groupNestingDepth}
          onRenderCheck={_onRenderCheckForFooterRow}
        />
      </div>
    </Sticky>
  );
}

function _onRenderCheckForFooterRow(
  props: IDetailsRowCheckProps,
  DefaultRender: React.ComponentType<IDetailsRowCheckProps> = DetailsRowCheck,
): JSX.Element {
  return <DefaultRender {...props} style={{ visibility: 'hidden' }} selected={true} />;
}

const getElement = "document.getElementsByClassName('ms-ScrollablePane--contentContainer')[0]";
const cropTo = { cropTo: '.testWrapper' };

storiesOf('ScrollablePane Grouped Details List', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default: scrollbars should be visible', cropTo)
        .executeScript(`${getElement}.scrollTop = 100`)
        .snapshot('Scrollbars visibility when header is sticky', cropTo)
        .executeScript(`${getElement}.scrollTop = 99999`)
        .snapshot('Scrollbars visibility after scrolling down to the bottom', cropTo)
        .executeScript(`${getElement}.scrollTop = 0`)
        .snapshot('Scrollbars visibility after scrolling up to the top', cropTo)
        .executeScript(`${getElement}.scrollLeft = 100`)
        .snapshot('Scrollbars visibilty after scrolling left', cropTo)
        .executeScript(`${getElement}.scrollTop = 100`)
        .snapshot('Scrollbars visibility when header is sticky and scrollLeft is non-zero', cropTo)
        .executeScript(`${getElement}.scrollTop = 99999`)
        .snapshot(
          'Scrollbars visibility after scrolling down to the bottom with non-zero scrollLeft',
          cropTo,
        )
        .executeScript(`${getElement}.scrollTop = 0`)
        .snapshot(
          'Scrollbars visibility after scrolling up to the top with non-zero scrollLeft',
          cropTo,
        )
        .executeScript(`${getElement}.scrollLeft = 0`)
        .executeScript(`document.getElementsByClassName('ms-GroupHeader-expand')[0].click()`)
        .snapshot('On expanding a group, horizontal scrollbar should be visible', cropTo)
        .executeScript(`document.getElementsByClassName('ms-GroupHeader-expand')[1].click()`)
        .executeScript(`document.getElementsByClassName('ms-GroupHeader-expand')[2].click()`)
        .executeScript(`${getElement}.scrollTop = 50`)
        .snapshot(
          'If groups are expanded, when header becomes sticky, horizontal scrollbar should be visible',
          cropTo,
        )
        .executeScript(`${getElement}.scrollLeft = 99999`)
        .snapshot(
          'If groups are expanded, on horizontal scroll, over scroll should not happen for content container',
          cropTo,
        )
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('ScrollablePane scrollbars visibility', () => <ScrollablePaneDetailsListStory />);
