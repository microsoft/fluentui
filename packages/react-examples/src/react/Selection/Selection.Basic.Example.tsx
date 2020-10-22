import * as React from 'react';
import { ICommandBarItemProps, CommandBar } from '@fluentui/react/lib/CommandBar';
import { Check } from '@fluentui/react/lib/Check';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { ISelection, Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { IExampleItem, createListItems } from '@fluentui/example-data';
import { IRawStyle, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useConst, useForceUpdate } from '@fluentui/react-hooks';

interface ISelectionItemExampleProps {
  item: IExampleItem;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

const commonStyles: IRawStyle = {
  display: 'inline-block',
  cursor: 'default',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  background: 'none',
  backgroundColor: 'transparent',
  border: 'none',
};
const classNames = mergeStyleSets({
  item: {
    selectors: {
      '&:hover': { background: '#eee' },
    },
  },
  // Overwrites the default style for Button
  check: [commonStyles, { padding: '11px 8px' }],
  cell: [
    commonStyles,
    {
      overflow: 'hidden',
      height: 36,
      padding: 8,
      userSelect: 'none',
    },
  ],
});

const alertItem = (item: IExampleItem): void => {
  alert('item invoked: ' + item.name);
};

const startsWithVowel = (item: IExampleItem): boolean => {
  return /^[aeiou]/.test(item.name || '');
};

const selectionModes = {
  [SelectionMode[SelectionMode.none]]: 'None',
  [SelectionMode[SelectionMode.single]]: 'Single select',
  [SelectionMode[SelectionMode.multiple]]: 'Multi select',
};
const selectableItemTypes = {
  all: 'All items',
  vowels: 'Names starting with vowels',
};

const ITEM_COUNT = 100;

const SelectionItemExample: React.FunctionComponent<ISelectionItemExampleProps> = (
  props: ISelectionItemExampleProps,
) => {
  const { item, itemIndex, selection } = props;
  let isSelected = false;

  if (selection && itemIndex !== undefined) {
    isSelected = selection.isIndexSelected(itemIndex);
  }

  return (
    <div className={classNames.item} data-is-focusable data-selection-index={itemIndex}>
      {selection && selection.canSelectItem(item) && selection.mode !== SelectionMode.none && (
        <div className={classNames.check} data-is-focusable data-selection-toggle>
          <Check checked={isSelected} />
        </div>
      )}
      <span className={classNames.cell}>{item.name}</span>
      <a className={classNames.cell} href="https://bing.com" target="_blank">
        Link that avoids selection
      </a>
      <a className={classNames.cell} data-selection-select href="https://bing.com" target="_blank">
        Link that selects first
      </a>
    </div>
  );
};

export const SelectionBasicExample: React.FunctionComponent = () => {
  const [selectableItemType, setSelectableItemType] = React.useState<'all' | 'vowels'>('all');
  const [selectionMode, setSelectionMode] = React.useState(SelectionMode.multiple);
  const forceUpdate = useForceUpdate();
  const items = useConst<IExampleItem[]>(() => createListItems(ITEM_COUNT));
  const selection = React.useMemo(
    () =>
      new Selection({
        canSelectItem: selectableItemType === 'vowels' ? startsWithVowel : undefined,
        selectionMode,
        onSelectionChanged: forceUpdate,
        items,
      }),
    [selectableItemType, selectionMode, forceUpdate, items],
  );

  const commandItems = React.useMemo<ICommandBarItemProps[]>(
    () => [
      {
        key: 'selectionMode',
        text: 'Selection mode: ' + selectionModes[SelectionMode[selectionMode]],
        subMenuProps: {
          items: Object.keys(selectionModes).map((mode: keyof typeof SelectionMode) => ({
            key: mode,
            name: selectionModes[mode],
            canCheck: true,
            checked: selectionMode === SelectionMode[mode],
            onClick: () => setSelectionMode(SelectionMode[mode]),
          })),
        },
      },
      {
        key: 'allowCanSelect',
        text: 'Selectable item type: ' + selectableItemType,
        subMenuProps: {
          items: Object.keys(selectableItemTypes).map((itemType: keyof typeof selectableItemTypes) => ({
            key: itemType,
            name: selectableItemTypes[itemType],
            checked: selectableItemType === itemType,
            onClick: () => setSelectableItemType(itemType),
          })),
        },
      },
      {
        key: 'selectAll',
        text: 'Toggle select all',
        iconProps: { iconName: 'CheckMark' },
        onClick: () => selection.toggleAllSelected(),
        disabled: selectionMode !== SelectionMode.multiple,
      },
    ],
    [selectionMode, selection, selectableItemType],
  );

  return (
    <div>
      <CommandBar items={commandItems} />
      <MarqueeSelection selection={selection} isEnabled={selection.mode === SelectionMode.multiple}>
        <SelectionZone selection={selection} onItemInvoked={alertItem}>
          {items.map((item: IExampleItem, index: number) => (
            <SelectionItemExample key={item.key} item={item} itemIndex={index} selection={selection} />
          ))}
        </SelectionZone>
      </MarqueeSelection>
    </div>
  );
};
