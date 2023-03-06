import {
  TilesGridMode,
  ITilesGridItem,
  ITilesGridSegment,
  ITilesGridItemCellProps,
  ITilesListRootProps,
  ITilesListRowProps,
} from '@fluentui/react-experiments/lib/TilesList';
import { lorem } from '@fluentui/example-data';
import { IRenderFunction } from '@fluentui/utilities';

type IAspectRatioByProbability = { [probability: string]: number };

const PROBABILITIES: IAspectRatioByProbability = {
  '0.95': 3,
  '0.90': 1 / 3,
  '0.80': 16 / 9,
  '0.70': 9 / 16,
  '0.40': 4 / 3,
  '0.10': 3 / 4,
  '0.00': 1,
};

const ENTRIES = Object.keys(PROBABILITIES).map((key: keyof IAspectRatioByProbability) => ({
  probability: Number(key),
  aspectRatio: PROBABILITIES[key],
}));

export interface IExampleItem {
  key: string;
  name: string;
  index: number;
  aspectRatio: number;
}

export interface IExampleGroup {
  items: IExampleItem[];
  name: string;
  index: number;
  type: 'document' | 'media';
  key: string;
}

export function createMediaItems(count: number, indexOffset: number): IExampleItem[] {
  const items: IExampleItem[] = [];

  for (let i = 0; i < count; i++) {
    const seed = Math.random();

    items.push({
      key: `item-${indexOffset + i}`,
      name: lorem(4),
      index: indexOffset + i,
      aspectRatio: ENTRIES.filter((entry: { probability: number; aspectRatio: number }) => seed >= entry.probability)[0]
        .aspectRatio,
    });
  }

  return items;
}

export function createDocumentItems(count: number, indexOffset: number): IExampleItem[] {
  const items: IExampleItem[] = [];

  for (let i = 0; i < count; i++) {
    items.push({
      key: `item-${indexOffset + i}`,
      name: lorem(4),
      index: indexOffset + i,
      aspectRatio: 1,
    });
  }

  return items;
}

export function createGroup(items: IExampleItem[], type: 'document' | 'media', index: number): IExampleGroup {
  return {
    items: items,
    index: index,
    name: lorem(4),
    type: type,
    key: `group-${index}`,
  };
}

export function onRenderTilesListExampleRoot(
  rootProps?: ITilesListRootProps<IExampleItem>,
  defaultRender?: IRenderFunction<ITilesListRootProps<IExampleItem>>,
): JSX.Element | null {
  if (!rootProps || !defaultRender) {
    return null;
  }

  return defaultRender({
    ...rootProps,
    divProps: {
      ...rootProps.divProps,
      'aria-colcount': rootProps.columnCount,
      'aria-rowcount': rootProps.rowCount,
    },
  });
}

export function onRenderTilesListExampleRow(
  rowProps?: ITilesListRowProps<IExampleItem>,
  defaultRender?: IRenderFunction<ITilesListRowProps<IExampleItem>>,
): JSX.Element | null {
  if (!rowProps || !defaultRender) {
    return null;
  }

  return defaultRender({
    ...rowProps,
    divProps: {
      ...rowProps.divProps,
      role: 'row',
    },
  });
}

export function getExampleTilesListCells(
  groups: IExampleGroup[],
  {
    onRenderCell,
    onRenderHeader,
    size = 'large',
    shimmerMode = false,
  }: {
    onRenderHeader: (props: ITilesGridItemCellProps<IExampleItem>) => JSX.Element | null;
    onRenderCell: (props: ITilesGridItemCellProps<IExampleItem>) => JSX.Element | null;
    size?: 'large' | 'small';
    shimmerMode?: boolean;
  },
): (ITilesGridSegment<IExampleItem> | ITilesGridItem<IExampleItem>)[] {
  const items: (ITilesGridSegment<IExampleItem> | ITilesGridItem<IExampleItem>)[] = [];
  const isLargeSize: boolean = size === 'large' ? true : false;

  for (const group of groups) {
    const header: ITilesGridItem<IExampleItem> = {
      key: `header-${group.key}`,
      content: {
        key: group.key,
        aspectRatio: 1,
        name: group.name,
        index: group.index,
      },
      onRenderCell: onRenderHeader,
      isPlaceholder: shimmerMode,
    };

    items.push(header);

    items.push({
      items: group.items.map((item: IExampleItem): ITilesGridItem<IExampleItem> => {
        return {
          key: item.key,
          content: item,
          desiredSize:
            group.type === 'document'
              ? {
                  width: isLargeSize ? 176 : 138,
                  height: isLargeSize ? 171 : 135,
                }
              : {
                  width: isLargeSize ? 171 * item.aspectRatio : 135 * item.aspectRatio,
                  height: isLargeSize ? 171 : 135,
                },
          onRenderCell: onRenderCell,
          isPlaceholder: shimmerMode,
        };
      }),
      spacing: isLargeSize ? 8 : 12,
      marginBottom: shimmerMode ? 0 : 40,
      minRowHeight: isLargeSize ? 171 : 135,
      mode:
        group.type === 'document'
          ? size === 'small'
            ? TilesGridMode.fillHorizontal
            : TilesGridMode.stack
          : TilesGridMode.fill,
      key: group.key,
      isPlaceholder: shimmerMode,
    });
  }

  return items;
}

export function createShimmerGroups(type: 'document' | 'media', index: number): IExampleGroup[] {
  return [
    {
      items: [
        {
          key: `shimmerItem-${index}`,
          name: lorem(4),
          index: index,
          aspectRatio: 1,
        },
      ],
      index: index,
      name: lorem(4),
      key: `shimmerGroup-${index}`,
      type: type,
    },
  ];
}
