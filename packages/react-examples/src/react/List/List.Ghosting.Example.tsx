import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { ITheme, mergeStyleSets, getFocusStyle } from '@fluentui/react/lib/Styling';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';
import { useTheme } from '@fluentui/react/lib/Theme';

const generateStyles = (theme: ITheme) => {
  return mergeStyleSets({
    container: {
      overflow: 'auto',
      maxHeight: 500,
    },
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        minHeight: 54,
        padding: 10,
        boxSizing: 'border-box',
        borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
        display: 'flex',
        selectors: {
          '&:hover': { background: theme.palette.neutralLight },
        },
      },
    ],
    itemImage: {
      flexShrink: 0,
    },
    itemContent: {
      marginLeft: 10,
      overflow: 'hidden',
      flexGrow: 1,
    },
    itemName: [
      theme.fonts.xLarge,
      {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    ],
    itemIndex: {
      fontSize: theme.fonts.small.fontSize,
      color: theme.palette.neutralTertiary,
      marginBottom: 10,
    },
    chevron: {
      alignSelf: 'center',
      marginLeft: 10,
      color: theme.palette.neutralTertiary,
      fontSize: theme.fonts.large.fontSize,
      flexShrink: 0,
    },
  });
};

export const ListGhostingExample: React.FunctionComponent = () => {
  const items = useConst(() => createListItems(5000));
  const theme = useTheme();
  const classNames = React.useMemo(() => generateStyles(theme), [theme]);

  const onRenderCell = React.useCallback(
    (item: IExampleItem, index: number, isScrolling: boolean): JSX.Element => {
      return (
        <div className={classNames.itemCell} data-is-focusable={true}>
          <Image
            className={classNames.itemImage}
            src={
              isScrolling
                ? undefined
                : 'https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg'
            }
            width={50}
            height={50}
            imageFit={ImageFit.cover}
          />
          <div className={classNames.itemContent}>
            <div className={classNames.itemName}>{item.name}</div>
            <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          </div>
        </div>
      );
    },
    [classNames],
  );

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div className={classNames.container} data-is-scrollable>
        <List items={items} onRenderCell={onRenderCell} />
      </div>
    </FocusZone>
  );
};
