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

export interface ISelectionBasicExampleState {
  items: IExampleItem[];
  selection: ISelection;
  selectionMode: SelectionMode;
  canSelect: 'all' | 'vowels';
}

interface ISelectionItemExampleProps {
  item: IExampleItem;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
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

/**
 * The SelectionBasicExample controls the selection state of all items
 */
export class SelectionBasicExample extends React.Component<{}, ISelectionBasicExampleState> {
  private _hasMounted: boolean;

  constructor(props: {}) {
    super(props);

    this._hasMounted = false;
    // Memoizing this means that given the same parameters, it will return the same array of command objects
    // (performance optimization)
    this._getCommandItems = memoizeFunction(this._getCommandItems);

    this.state = {
      items: createListItems(ITEM_COUNT),
      selection: new Selection({ onSelectionChanged: this._onSelectionChanged }),
      selectionMode: SelectionMode.multiple,
      canSelect: 'all',
    };
    this.state.selection.setItems(this.state.items, false);
  }

  public componentDidMount(): void {
    this._hasMounted = true;
  }

  public render(): JSX.Element {
    const { items, selection, canSelect } = this.state;

    return (
      <div className="ms-SelectionBasicExample">
        <CommandBar items={this._getCommandItems(selection.mode, canSelect)} />
        <MarqueeSelection selection={selection} isEnabled={selection.mode === SelectionMode.multiple}>
          <SelectionZone selection={selection} onItemInvoked={this._alertItem}>
            {items.map((item: IExampleItem, index: number) => (
              <SelectionItemExample key={item.key} item={item} itemIndex={index} selection={selection} />
            ))}
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _alertItem = (item: IExampleItem): void => {
    alert('item invoked: ' + item.name);
  };

  private _onSelectionChanged = (): void => {
    if (this._hasMounted) {
      this.forceUpdate();
    }
  };

  private _onToggleSelectAll = (): void => {
    const { selection } = this.state;
    selection.toggleAllSelected();
  };

  private _onSelectionModeChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    this.setState((previousState: ISelectionBasicExampleState) => {
      const newSelection = new Selection({
        onSelectionChanged: this._onSelectionChanged,
        canSelectItem: previousState.canSelect === 'vowels' ? this._canSelectItem : undefined,
        selectionMode: menuItem.data,
      });
      newSelection.setItems(previousState.items, false);

      return {
        selection: newSelection,
      };
    });
  };

  private _onCanSelectChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    const canSelectItem = menuItem.data === 'vowels' ? this._canSelectItem : undefined;

    this.setState((previousState: ISelectionBasicExampleState) => {
      const newSelection = new Selection({
        onSelectionChanged: this._onSelectionChanged,
        canSelectItem: canSelectItem,
        selectionMode: previousState.selection.mode,
      });
      newSelection.setItems(previousState.items, false);
      return {
        selection: newSelection,
        canSelect: menuItem.data === 'vowels' ? 'vowels' : 'all',
      };
    });
  };

  private _canSelectItem = (item: IExampleItem): boolean => {
    return /^[aeiou]/.test(item.name || '');
  };

  private _getCommandItems = (selectionMode: SelectionMode, canSelect: 'all' | 'vowels'): IContextualMenuItem[] => {
    return [
      {
        key: 'selectionMode',
        text: 'Selection Mode',
        items: [
          {
            key: SelectionMode[SelectionMode.none],
            name: 'None',
            canCheck: true,
            checked: selectionMode === SelectionMode.none,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.none,
          },
          {
            key: SelectionMode[SelectionMode.single],
            name: 'Single select',
            canCheck: true,
            checked: selectionMode === SelectionMode.single,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.single,
          },
          {
            key: SelectionMode[SelectionMode.multiple],
            name: 'Multi select',
            canCheck: true,
            checked: selectionMode === SelectionMode.multiple,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.multiple,
          },
        ],
      },
      {
        key: 'selectAll',
        text: 'Select All',
        iconProps: { iconName: 'CheckMark' },
        onClick: this._onToggleSelectAll,
      },
      {
        key: 'allowCanSelect',
        text: 'Choose selectable items',
        items: [
          {
            key: 'all',
            name: 'All items',
            canCheck: true,
            checked: canSelect === 'all',
            onClick: this._onCanSelectChanged,
            data: 'all',
          },
          {
            key: 'a',
            name: 'Names starting with vowels',
            canCheck: true,
            checked: canSelect === 'vowels',
            onClick: this._onCanSelectChanged,
            data: 'vowels',
          },
        ],
      },
    ];
  };
}
