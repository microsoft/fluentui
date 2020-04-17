import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { createListItems } from '@uifabric/example-data';

const theme: ITheme = getTheme();
const { palette, fonts } = theme;

const classNames = mergeStyleSets({
  listGridExample: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative',
  },
  listGridExampleTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: palette.neutralLighter,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: `1px solid ${palette.white}`,
      },
    },
  },
  listGridExampleSizer: {
    paddingBottom: '100%',
  },
  listGridExamplePadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2,
  },
  listGridExampleLabel: {
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    width: '100%',
    fontSize: fonts.small.fontSize,
    boxSizing: 'border-box',
  },
  listGridExampleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

const items = createListItems(5000);
let columnCount: number;
let columnWidth: number;
let rowHeight: number;

const onRenderCell = (item: any, index: number | undefined): JSX.Element => (
  <div
    className={classNames.listGridExampleTile}
    data-is-focusable={true}
    style={{
      width: 100 / columnCount + '%',
    }}
  >
    <div className={classNames.listGridExampleSizer}>
      <div className={classNames.listGridExamplePadder}>
        <img src={item.thumbnail} className={classNames.listGridExampleImage} />
        <span className={classNames.listGridExampleLabel}>{`item ${index}`}</span>
      </div>
    </div>
  </div>
);

const getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
  if (itemIndex === 0) {
    columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
    columnWidth = Math.floor(surfaceRect.width / columnCount);
    rowHeight = columnWidth;
  }
  return columnCount * ROWS_PER_PAGE;
};

const getPageHeight = (): number => {
  return rowHeight * ROWS_PER_PAGE;
};

export const ListGridExample: React.FunctionComponent = () => (
  <FocusZone>
    <List
      className={classNames.listGridExample}
      items={items}
      getItemCountForPage={getItemCountForPage}
      getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={onRenderCell}
    />
  </FocusZone>
);
