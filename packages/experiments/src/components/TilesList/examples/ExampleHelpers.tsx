
import { TilesGridMode, ITilesGridItem, ITilesGridSegment, ITileSize } from '../TilesList.Props';
import { lorem } from '@uifabric/example-app-base';

type IAspectRatioByProbability = { [probability: string]: number; };

const PROBABILITIES: IAspectRatioByProbability = {
  '0.95': 3,
  '0.90': 1 / 3,
  '0.80': 16 / 9,
  '0.70': 9 / 16,
  '0.40': 4 / 3,
  '0.10': 3 / 4,
  '0.00': 1
};

const ENTRIES = Object.keys(PROBABILITIES).map((key: keyof IAspectRatioByProbability) => ({
  probability: Number(key),
  aspectRatio: PROBABILITIES[key]
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
      aspectRatio: ENTRIES.filter((entry: { probability: number; aspectRatio: number; }) => seed >= entry.probability)[0].aspectRatio
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
      aspectRatio: 1
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
    key: `group-${index}`
  };
}

export function getTileCells(groups: IExampleGroup[], {
  onRenderCell,
  onRenderHeader
}: {
    onRenderHeader: (item: IExampleItem) => JSX.Element;
    onRenderCell: (item: IExampleItem, finalSize?: ITileSize) => JSX.Element;
  }): (ITilesGridSegment<IExampleItem> | ITilesGridItem<IExampleItem>)[] {
  const items: (ITilesGridSegment<IExampleItem> | ITilesGridItem<IExampleItem>)[] = [];

  for (const group of groups) {
    const header: ITilesGridItem<IExampleItem> = {
      key: `header-${group.key}`,
      content: {
        key: '',
        aspectRatio: 1,
        name: lorem(6),
        index: group.index
      },
      onRender: onRenderHeader
    };

    items.push(header);

    items.push({
      items: group.items.map((item: IExampleItem): ITilesGridItem<IExampleItem> => {
        return {
          key: item.key,
          content: item,
          desiredSize: group.type === 'document' ? {
            width: 176,
            height: 171
          } : {
              width: 171 * item.aspectRatio,
              height: 171
            },
          onRender: onRenderCell
        };
      }),
      spacing: 8,
      marginBottom: 40,
      minRowHeight: 171,
      mode: group.type === 'document' ?
        TilesGridMode.stack :
        TilesGridMode.fill,
      key: group.key
    });
  }

  return items;
}
