import * as React from 'react';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { IRectangle } from '@fluentui/react/lib/Utilities';
import { ITheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';
import { useTheme } from '@fluentui/react/lib/Theme';

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

const generateStyles = (theme: ITheme) => {
  const { palette, fonts } = theme;
  return mergeStyleSets({
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
      color: palette.white,
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
      height: '100%',
      width: '100%',
    },
  });
};

export const ListGridExample: React.FunctionComponent = () => {
  const columnCount = React.useRef(0);
  const rowHeight = React.useRef(0);
  const theme = useTheme();
  const classNames = React.useMemo(() => generateStyles(theme), [theme]);

  const getItemCountForPage = React.useCallback((itemIndex: number, surfaceRect: IRectangle) => {
    if (itemIndex === 0) {
      columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      rowHeight.current = Math.floor(surfaceRect.width / columnCount.current);
    }
    return columnCount.current * ROWS_PER_PAGE;
  }, []);

  const onRenderCell = React.useCallback(
    (item: IExampleItem, index: number | undefined) => {
      return (
        <div
          className={classNames.listGridExampleTile}
          data-is-focusable
          style={{
            width: 100 / columnCount.current + '%',
          }}
        >
          <div className={classNames.listGridExampleSizer}>
            <div className={classNames.listGridExamplePadder}>
              <img
                src={
                  'https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg'
                }
                className={classNames.listGridExampleImage}
              />
              <span className={classNames.listGridExampleLabel}>{`item ${index}`}</span>
            </div>
          </div>
        </div>
      );
    },
    [classNames],
  );

  const getPageHeight = React.useCallback((): number => {
    return rowHeight.current * ROWS_PER_PAGE;
  }, []);

  const items = useConst(() => createListItems(5000));

  return (
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
};
