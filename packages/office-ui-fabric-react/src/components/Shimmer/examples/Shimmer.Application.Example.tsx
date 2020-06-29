import * as React from 'react';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { useSetTimeout } from '@uifabric/react-hooks';
export interface IShimmerApplicationExampleState {
  lastIntervalId: number;
  lastIndexWithData: number;
}

const ITEMS_COUNT = 200;
const INTERVAL_DELAY = 2500;
let exampleItems: IExampleItem[];
const toggleStyling = { display: 'block', marginBottom: '20px' };
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

export const ShimmerApplicationExample: React.FunctionComponent = () => {
  const safeSetTimeout = useSetTimeout();
  const columns: IColumn[] = buildShimmerColumns();
  // const [columns, setColumns] = React.useState<IColumn[]>(buildShimmerColumns());
  const [items, setItems] = React.useState<IExampleItem[]>([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState<boolean>(false);

  const { current: state } = React.useRef<IShimmerApplicationExampleState>({
    lastIntervalId: 0,
    lastIndexWithData: 0,
  });

  const loadData = (): void => {
    state.lastIntervalId = safeSetTimeout(() => {
      const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
      const itemsCopy = items!.slice(0);
      itemsCopy.splice(
        state.lastIndexWithData,
        randomQuantity,
        ...exampleItems.slice(state.lastIndexWithData, state.lastIndexWithData + randomQuantity),
      );
      state.lastIndexWithData += randomQuantity;
      setItems(itemsCopy);
    }, INTERVAL_DELAY);
  };

  const randomFileIcon = (): { docType: string; url: string } => {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
    };
  };

  const onLoadData = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    if (!exampleItems) {
      exampleItems = createListItems(ITEMS_COUNT);
      exampleItems.map((item: IExampleItem) => {
        const randomFileType = randomFileIcon();
        item.thumbnail = randomFileType.url;
      });
    }
    let currentItems: IExampleItem[];
    const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
    if (checked) {
      currentItems = exampleItems.slice(0, randomQuantity).concat(new Array(ITEMS_COUNT - randomQuantity));
      state.lastIndexWithData = randomQuantity;
      loadData();
    } else {
      currentItems = [];
      clearInterval(state.lastIntervalId);
      // clearTimeout(state.lastIntervalId);
    }
    setIsDataLoaded(checked);
    setItems(currentItems);
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
        checked={isDataLoaded}
        onChange={onLoadData}
        onText="Content"
        offText="Shimmer"
      />
      <div>
        <ShimmeredDetailsList
          setKey="items"
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColumn}
          enableShimmer={!isDataLoaded}
          ariaLabelForShimmer="Content is being fetched"
          ariaLabelForGrid="Item details"
          listProps={shimmeredDetailsListProps}
        />
      </div>
    </div>
  );
};
