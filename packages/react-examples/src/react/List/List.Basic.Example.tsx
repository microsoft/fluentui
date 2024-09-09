import * as React from 'react';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { TextField } from '@fluentui/react/lib/TextField';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { List } from '@fluentui/react/lib/List';
import { ITheme, mergeStyleSets, getFocusStyle } from '@fluentui/react/lib/Styling';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';
import { useTheme } from '@fluentui/react/lib/Theme';

const generateStyles = (theme: ITheme) => {
  const { palette, semanticColors, fonts } = theme;
  return mergeStyleSets({
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
};

export const ListBasicExample: React.FunctionComponent = () => {
  const originalItems = useConst(() => createListItems(5000));
  const [items, setItems] = React.useState(originalItems);
  const theme = useTheme();
  const classNames = React.useMemo(() => generateStyles(theme), [theme]);

  const onRenderCell = React.useCallback(
    (item: IExampleItem, index: number | undefined): JSX.Element => {
      return (
        <div className={classNames.itemCell} data-is-focusable={true}>
          <Image
            className={classNames.itemImage}
            src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
            width={50}
            height={50}
            imageFit={ImageFit.cover}
          />
          <div className={classNames.itemContent}>
            <div className={classNames.itemName}>{item.name}</div>
            <div className={classNames.itemIndex}>{`Item ${index}`}</div>
            <div>{item.description}</div>
          </div>
          <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
        </div>
      );
    },
    [classNames],
  );

  const resultCountText =
    items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

  const onFilterChanged = (_: any, text: string): void => {
    setItems(originalItems.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0));
  };

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <TextField
        label={'Filter by name' + resultCountText}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onFilterChanged}
      />

      <List items={items} onRenderCell={onRenderCell} />
    </FocusZone>
  );
};
