import * as React from 'react';
import { ICommandBarItemProps, CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { ISelection, Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { IExampleItem, createListItems } from '@uifabric/example-data';
import { IRawStyle, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useConst, useForceUpdate } from '@uifabric/react-hooks';

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

const canSelectItem = (item: IExampleItem): boolean => {
  return /^[aeiou]/.test(item.name || '');
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
  const [canSelect, setCanSelect] = React.useState<'all' | 'vowels'>('all');
  const forceUpdate = useForceUpdate();
  const items = useConst<IExampleItem[]>(() => createListItems(ITEM_COUNT));
  const [selection, setSelection] = React.useState<Selection>(
    () =>
      new Selection({
        onSelectionChanged: forceUpdate,
        items,
      }),
  );

  const onToggleSelectAll = React.useCallback((): void => {
    selection.toggleAllSelected();
  }, [selection]);

  const onSelectionModeChanged = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
      setSelection(
        new Selection({
          canSelectItem: canSelect === 'vowels' ? canSelectItem : undefined,
          selectionMode: menuItem.data,
          onSelectionChanged: forceUpdate,
          items,
        }),
      );
    },
    [canSelect, forceUpdate, items],
  );

  const onCanSelectChanged = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
      setSelection(
        new Selection({
          canSelectItem: menuItem.data === 'vowels' ? canSelectItem : undefined,
          selectionMode: selection.mode,
          onSelectionChanged: forceUpdate,
          items,
        }),
      );
      setCanSelect(menuItem.data === 'vowels' ? 'vowels' : 'all');
    },
    [selection, forceUpdate, items],
  );

  const commandItems = React.useMemo<ICommandBarItemProps[]>(
    () => [
      {
        key: 'selectionMode',
        text: 'Selection Mode',
        subMenuProps: {
          items: [
            {
              key: SelectionMode[SelectionMode.none],
              name: 'None',
              canCheck: true,
              checked: selection.mode === SelectionMode.none,
              onClick: onSelectionModeChanged,
              data: SelectionMode.none,
            },
            {
              key: SelectionMode[SelectionMode.single],
              name: 'Single select',
              canCheck: true,
              checked: selection.mode === SelectionMode.single,
              onClick: onSelectionModeChanged,
              data: SelectionMode.single,
            },
            {
              key: SelectionMode[SelectionMode.multiple],
              name: 'Multi select',
              canCheck: true,
              checked: selection.mode === SelectionMode.multiple,
              onClick: onSelectionModeChanged,
              data: SelectionMode.multiple,
            },
          ],
        },
      },
      {
        key: 'selectAll',
        text: 'Select All',
        iconProps: { iconName: 'CheckMark' },
        onClick: onToggleSelectAll,
      },
      {
        key: 'allowCanSelect',
        text: 'Choose selectable items',
        subMenuProps: {
          items: [
            {
              key: 'all',
              name: 'All items',
              canCheck: true,
              checked: canSelect === 'all',
              onClick: onCanSelectChanged,
              data: 'all',
            },
            {
              key: 'a',
              name: 'Names starting with vowels',
              canCheck: true,
              checked: canSelect === 'vowels',
              onClick: onCanSelectChanged,
              data: 'vowels',
            },
          ],
        },
      },
    ],
    [selection.mode, canSelect, onCanSelectChanged, onToggleSelectAll, onSelectionModeChanged],
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
