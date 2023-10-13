import * as React from 'react';
import {
  ConstrainMode,
  DefaultButton,
  DetailsHeader,
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  Dropdown,
  FocusZone,
  FocusZoneDirection,
  GroupedListV2_unstable as GroupedListV2,
  ScrollToMode,
  TextField,
  mergeStyleSets,
} from '@fluentui/react';

import type {
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  IGroup,
  IGroupedItem,
  IRenderFunction,
  IDetailsListProps,
  IDetailsRowStyles,
  IRectangle,
  IDetailsGroupRenderProps,
  IDropdownOption,
  IDetailsListStyles,
} from '@fluentui/react';

const rowHeight = 42;
const rowHeaderHeight = 48;
const defaultItemsPerPage = 10;
const dropdownOptions = [
  { key: 'auto', text: 'Auto' },
  { key: 'top', text: 'Top' },
  { key: 'bottom', text: 'Bottom' },
  { key: 'center', text: 'Center' },
];

const gridStyles: Partial<IDetailsListStyles> = {
  root: {
    overflowX: 'hidden',
    selectors: {
      '& [role=grid]': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: '60vh',
      },
    },
  },
  headerWrapper: {
    flex: '0 0 auto',
  },
  contentWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
    maxWidth: '100%',
  },
};

const classNames = mergeStyleSets({
  header: {
    margin: 0,
  },
  focusZone: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxWidth: '100%',
  },
  selectionZone: {
    height: '100%',
    overflow: 'hidden',
  },
});

export interface IDetailsListGroupedExampleItem {
  key: string;
  name: string;
  value: string;
}

const getInitialItems = () => {
  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push({
      key: i.toString(),
      name: 'Item ' + i,
      value: i.toString(),
    });
  }

  return items;
};

const getInitialGroups = () => {
  const groups = [];
  for (let i = 0; i < 10; i++) {
    groups.push({
      key: i.toString(),
      name: i.toString(),
      startIndex: i * 100,
      count: 100,
      level: 0,
    });
  }

  return groups;
};

const onRenderColumn = (item: IDetailsListGroupedExampleItem, index: number, column: IColumn) => {
  const value =
    item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || '' : '';

  return <div data-is-focusable={true}>{value}</div>;
};

const onRenderDetailsHeader = (props: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>) => {
  return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Expand collapse groups'} />;
};

const onRenderRow: IDetailsListProps['onRenderRow'] = props => {
  const customStyles: Partial<IDetailsRowStyles> = {};
  if (props) {
    customStyles.root = { height: rowHeight };
    return <DetailsRow {...props} styles={customStyles} />;
  }
  return null;
};

const onRenderGroupHeader: IDetailsGroupRenderProps['onRenderHeader'] = (props, defaultRender) => {
  if (props) {
    const nextProps = {
      ...props,
      styles: {
        root: {
          height: rowHeaderHeight,
        },
      },
    };

    return defaultRender?.(nextProps) ?? null;
  }

  return null;
};

/**
 *
 * @param index Index of the first item in the page
 * @param _visibleRect
 * @param itemsPerPage Number of items per page
 * @param flatItems Flattened list of items rendered in the GroupedList (includes `groups` and `items`)
 * @returns The height of the page.
 */
const getPageHeight = (index?: number, _visibleRect?: IRectangle, itemsPerPage?: number, flatItems?: any[]): number => {
  if (typeof index === 'number' && typeof itemsPerPage === 'number' && Array.isArray(flatItems)) {
    let h = 0;

    const listItems: IGroupedItem[] = flatItems as IGroupedItem[];

    const count = Math.min(index + itemsPerPage, listItems.length);
    for (let i = index; i < count; i++) {
      const item = listItems[i];
      if (item.type === 'item') {
        h += measureItem(item.itemIndex);
      } else {
        h += measureGroup(item.group);
      }
    }

    return h;
  }

  return defaultItemsPerPage * rowHeight;
};

const measureItem = (index: number): number => {
  return rowHeight;
};

const measureGroup = (group: IGroup): number => {
  return rowHeaderHeight;
};

export const DetailsListGroupedV2ScrollToIndexExample: React.FC = () => {
  const root = React.useRef<IDetailsList>(null);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollToMode, setScrollToMode] = React.useState<ScrollToMode>(ScrollToMode.auto);

  const [items] = React.useState<IDetailsListGroupedExampleItem[]>(() => getInitialItems());
  const [groups] = React.useState<IGroup[]>(() => getInitialGroups());
  const [columns] = React.useState<IColumn[]>([
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'value', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ]);

  const scroll = (index: number, propScrollToMode: ScrollToMode): void => {
    const updatedSelectedIndex = Math.min(Math.max(index, 0), items.length - 1);
    setSelectedIndex(updatedSelectedIndex);
    setScrollToMode(propScrollToMode);

    root.current?.scrollToIndex(updatedSelectedIndex, measureItem, scrollToMode);
  };

  const scrollRelative = (delta: number): (() => void) => {
    return (): void => {
      scroll(selectedIndex + delta, scrollToMode);
    };
  };

  const onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    scroll(parseInt(value, 10) || 0, scrollToMode);
  };

  const onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
    let scrollMode = scrollToMode;
    switch (option.key) {
      case 'auto':
        scrollMode = ScrollToMode.auto;
        break;
      case 'top':
        scrollMode = ScrollToMode.top;
        break;
      case 'bottom':
        scrollMode = ScrollToMode.bottom;
        break;
      case 'center':
        scrollMode = ScrollToMode.center;
        break;
    }
    scroll(selectedIndex, scrollMode);
  };
  const focusZoneProps = {
    className: classNames.focusZone,
    'data-is-scrollable': 'true',
  } as React.HTMLAttributes<HTMLElement>;
  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div>
        <DefaultButton onClick={scrollRelative(-10)}>-10</DefaultButton>
        <DefaultButton onClick={scrollRelative(-1)}>-1</DefaultButton>
        <DefaultButton onClick={scrollRelative(1)}>+1</DefaultButton>
        <DefaultButton onClick={scrollRelative(10)}>+10</DefaultButton>
      </div>
      <Dropdown
        placeholder="Select an Option"
        label="Scroll To Mode:"
        ariaLabel="Scroll To Mode"
        defaultSelectedKey={'auto'}
        options={dropdownOptions}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onDropdownChange}
      />
      <div>
        Scroll item index:
        <TextField
          value={selectedIndex.toString(10)}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChangeText}
        />
      </div>

      <DetailsList
        componentRef={root}
        items={items}
        groups={groups}
        columns={columns}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        onRenderDetailsHeader={onRenderDetailsHeader}
        styles={gridStyles}
        groupProps={{
          showEmptyGroups: true,
          groupedListAs: GroupedListV2,
          onRenderHeader: onRenderGroupHeader,
        }}
        listProps={{
          getPageHeight,
        }}
        onRenderItemColumn={onRenderColumn}
        onRenderRow={onRenderRow}
        focusZoneProps={focusZoneProps}
        selectionZoneProps={{
          className: classNames.selectionZone,
        }}
      />
      {/* </div> */}
    </FocusZone>
  );
};

// @ts-expect-error Storybook
DetailsListGroupedV2ScrollToIndexExample.storyName = 'V2 Grouped ScrollToIndex';
