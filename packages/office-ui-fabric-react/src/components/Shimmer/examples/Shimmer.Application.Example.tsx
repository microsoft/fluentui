import * as React from 'react';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { useSetInterval } from '@uifabric/react-hooks';

export interface IShimmerApplicationExampleState {
  lastIntervalId: number;
  visibleCount: number;
}

const ITEMS_COUNT = 200;
const INTERVAL_DELAY = 1200;
const toggleStyling = { marginBottom: '20px' };
const shimmeredDetailsListProps = { renderedWindowsAhead: 0, renderedWindowsBehind: 0 };

const fileIcons: { name: string }[] = [
  { name: 'accdb' },
  { name: 'audio' },
  { name: 'code' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'model' },
  { name: 'one' },
  { name: 'onetoc' },
  { name: 'pdf' },
  { name: 'photo' },
  { name: 'pptx' },
  { name: 'presentation' },
  { name: 'potx' },
  { name: 'pub' },
  { name: 'rtf' },
  { name: 'spreadsheet' },
  { name: 'txt' },
  { name: 'vector' },
  { name: 'vsdx' },
  { name: 'xlsx' },
  { name: 'xltx' },
  { name: 'xsn' },
];

const randomFileIcon = (): { docType: string; url: string } => {
  const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
  };
};

const buildShimmerColumns = (): IColumn[] => {
  const currentItems = createListItems(1);
  const columns: IColumn[] = buildColumns(currentItems);
  for (const column of columns) {
    if (column.key === 'thumbnail') {
      column.name = 'FileType';
      column.minWidth = 16;
      column.maxWidth = 16;
      column.isIconOnly = true;
      column.iconName = 'Page';
      break;
    }
  }
  return columns;
};

const shimmerColumns: IColumn[] = buildShimmerColumns();
const exampleItems: IExampleItem[] = createListItems(ITEMS_COUNT).map((item: IExampleItem) => {
  const randomFileType = randomFileIcon();
  return { ...item, thumbnail: randomFileType.url };
});

export const ShimmerApplicationExample: React.FunctionComponent = () => {
  const safeSetInterval = useSetInterval();
  const [items, setItems] = React.useState<IExampleItem[] | undefined>(undefined);

  const { current: state } = React.useRef<IShimmerApplicationExampleState>({
    lastIntervalId: 0,
    visibleCount: 0,
  });

  const loadMoreItems = (): void => {
    state.visibleCount = Math.min(exampleItems.length, state.visibleCount + 2);

    setItems(exampleItems.map((current, index) => (index < state.visibleCount ? current : null)) as IExampleItem[]);
  };

  const onLoadData = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    state.visibleCount = 0;

    if (checked) {
      loadMoreItems();
      state.lastIntervalId = safeSetInterval(loadMoreItems, INTERVAL_DELAY);
    } else {
      setItems(undefined);
      clearInterval(state.lastIntervalId);
    }
  };

  const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string | number => {
    if (column.key === 'thumbnail') {
      return <img src={item.thumbnail} />;
    }
    return item[column.key as keyof IExampleItem];
  };

  return (
    <div>
      <Toggle
        label="Toggle to load content"
        style={toggleStyling}
        onChange={onLoadData}
        onText="Content"
        offText="Shimmer"
      />
      <div>
        <ShimmeredDetailsList
          setKey="items"
          items={items || []}
          columns={shimmerColumns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColumn}
          enableShimmer={!items}
          ariaLabelForShimmer="Content is being fetched"
          ariaLabelForGrid="Item details"
          listProps={shimmeredDetailsListProps}
        />
      </div>
    </div>
  );
};
