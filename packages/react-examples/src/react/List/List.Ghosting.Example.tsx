import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
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
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
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
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

const onRenderCell = (item: IExampleItem, index: number, isScrolling: boolean): JSX.Element => {
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
};

export const ListGhostingExample: React.FunctionComponent = () => {
  const items = useConst(() => createListItems(5000));

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div className={classNames.container} data-is-scrollable>
        <List items={items} onRenderCell={onRenderCell} />
      </div>
    </FocusZone>
  );
};
