import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { List, ScrollToMode, IList } from '@fluentui/react/lib/List';
import { TextField } from '@fluentui/react/lib/TextField';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { mergeStyleSets, normalize, ITheme } from '@fluentui/react/lib/Styling';
import { useConst } from '@fluentui/react-hooks';
import { useTheme } from '@fluentui/react/lib/Theme';

const evenItemHeight = 50;
const oddItemHeight = 25;
const numberOfItemsOnPage = 10;
const dropdownOptions = [
  { key: 'auto', text: 'Auto' },
  { key: 'top', text: 'Top' },
  { key: 'bottom', text: 'Bottom' },
  { key: 'center', text: 'Center' },
];

const generateStyles = (theme: ITheme) => {
  return mergeStyleSets({
    container: {
      overflow: 'auto',
      maxHeight: 400,
      border: '1px solid ' + theme.palette.neutralLight,
      marginTop: 20,
      selectors: {
        '.ms-List-cell .odd': {
          height: oddItemHeight,
          lineHeight: oddItemHeight,
        },
        '.ms-List-cell .even': {
          height: evenItemHeight,
          lineHeight: evenItemHeight,
          background: theme.palette.neutralLighter,
        },
      },
    },
    itemContent: [
      theme.fonts.medium,
      normalize,
      {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        borderLeft: '3px solid ' + theme.palette.themePrimary,
        paddingLeft: 27,
      },
    ],
  });
};

export const ListScrollingExample: React.FunctionComponent = () => {
  const items = useConst(() => createListItems(5000));
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollToMode, setScrollToMode] = React.useState<ScrollToMode>(ScrollToMode.auto);
  const listRef: React.RefObject<IList> = React.useRef(null);
  const theme = useTheme();
  const classNames = React.useMemo(() => generateStyles(theme), [theme]);

  const onRenderCell = React.useCallback(
    (item: IExampleItem, index: number): JSX.Element => {
      return (
        <div data-is-focusable className={index % 2 === 0 ? 'even' : 'odd'}>
          <div className={classNames.itemContent}>
            {index} &nbsp; {item.name}
          </div>
        </div>
      );
    },
    [classNames],
  );

  const scroll = (index: number, propScrollToMode: ScrollToMode): void => {
    const updatedSelectedIndex = Math.min(Math.max(index, 0), items.length - 1);
    setSelectedIndex(updatedSelectedIndex);
    setScrollToMode(propScrollToMode);

    listRef.current?.scrollToIndex(
      updatedSelectedIndex,
      idx => (idx % 2 === 0 ? evenItemHeight : oddItemHeight),
      scrollToMode,
    );
  };

  const getPageHeight = (idx: number): number => {
    let h = 0;
    for (let i = idx; i < idx + numberOfItemsOnPage; ++i) {
      const isEvenRow = i % 2 === 0;

      h += isEvenRow ? evenItemHeight : oddItemHeight;
    }
    return h;
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
      <div className={classNames.container} data-is-scrollable>
        <List
          componentRef={listRef}
          items={items}
          // eslint-disable-next-line react/jsx-no-bind
          getPageHeight={getPageHeight}
          onRenderCell={onRenderCell}
        />
      </div>
    </FocusZone>
  );
};
