import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { ISelection, Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

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
    },
  ],
});

const ITEM_COUNT = 100;

interface ISelectionBasicExampleState {
  items: IExampleItem[];
  selection: ISelection;
}

interface ISelectionItemExampleProps {
  item: IExampleItem;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

const SelectionItemExample: React.FunctionComponent<ISelectionItemExampleProps> = (
  props: ISelectionItemExampleProps,
) => {
  const { item, itemIndex, selection } = props;
  let isSelected = false;

  if (selection && itemIndex !== undefined) {
    isSelected = selection.isIndexSelected(itemIndex);
  }

  return (
    <div className={classNames.item} data-is-focusable={true} data-selection-index={itemIndex}>
      {selection && selection.canSelectItem(item) && selection.mode !== SelectionMode.none && (
        <div className={classNames.check} data-is-focusable={true} data-selection-toggle={true}>
          <Check checked={isSelected} />
        </div>
      )}
      <span className={classNames.cell}>{item.name}</span>
      <a className={classNames.cell} href="https://bing.com" target="_blank">
        Link that avoids selection
      </a>
      <a className={classNames.cell} data-selection-select={true} href="https://bing.com" target="_blank">
        Link that selects first
      </a>
    </div>
  );
};

export const SelectionBasicExample: React.FunctionComponent = () => {
  const [canSelect, setCanSelect] = React.useState<'all' | 'vowels'>('all');

  const { current: internalState } = React.useRef<ISelectionBasicExampleState>({
    selection: new Selection(),
    items: createListItems(ITEM_COUNT),
  });

  const onToggleSelectAll = (): void => {
    internalState.selection.toggleAllSelected();
  };

  const getCommandItems = memoizeFunction(
    (selectionModeProp: SelectionMode, canSelectProp: 'all' | 'vowels'): IContextualMenuItem[] => [
      {
        key: 'selectionMode',
        text: 'Selection Mode',
        items: [
          {
            key: SelectionMode[SelectionMode.none],
            name: 'None',
            canCheck: true,
            checked: selectionModeProp === SelectionMode.none,
            onClick: onSelectionModeChanged,
            data: SelectionMode.none,
          },
          {
            key: SelectionMode[SelectionMode.single],
            name: 'Single select',
            canCheck: true,
            checked: selectionModeProp === SelectionMode.single,
            onClick: onSelectionModeChanged,
            data: SelectionMode.single,
          },
          {
            key: SelectionMode[SelectionMode.multiple],
            name: 'Multi select',
            canCheck: true,
            checked: selectionModeProp === SelectionMode.multiple,
            onClick: onSelectionModeChanged,
            data: SelectionMode.multiple,
          },
        ],
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
        items: [
          {
            key: 'all',
            name: 'All items',
            canCheck: true,
            checked: canSelectProp === 'all',
            onClick: onCanSelectChanged,
            data: 'all',
          },
          {
            key: 'a',
            name: 'Names starting with vowels',
            canCheck: true,
            checked: canSelectProp === 'vowels',
            onClick: onCanSelectChanged,
            data: 'vowels',
          },
        ],
      },
    ],
  );

  const alertItem = (item: IExampleItem): void => {
    alert('item invoked: ' + item.name);
  };

  const onSelectionModeChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    const newSelection = new Selection({
      canSelectItem: canSelect === 'vowels' ? canSelectItem : undefined,
      selectionMode: menuItem.data,
    });
    newSelection.setItems(internalState.items, false);
    internalState.selection = newSelection;
  };

  const onCanSelectChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    const newSelection = new Selection({
      canSelectItem: menuItem.data === 'vowels' ? canSelectItem : undefined,
      selectionMode: internalState.selection.mode,
    });
    newSelection.setItems(internalState.items, false);
    internalState.selection = newSelection;
    setCanSelect(menuItem.data === 'vowels' ? 'vowels' : 'all');
  };

  const canSelectItem = (item: IExampleItem): boolean => {
    return /^[aeiou]/.test(item.name || '');
  };

  return (
    <div className="ms-SelectionBasicExample">
      <CommandBar items={getCommandItems(internalState.selection.mode, canSelect)} />
      <MarqueeSelection
        selection={internalState.selection}
        isEnabled={internalState.selection.mode === SelectionMode.multiple}
      >
        <SelectionZone selection={internalState.selection} onItemInvoked={alertItem}>
          {internalState.items.map((item: IExampleItem, index: number) => (
            <SelectionItemExample key={item.key} item={item} itemIndex={index} selection={internalState.selection} />
          ))}
        </SelectionZone>
      </MarqueeSelection>
    </div>
  );
};
