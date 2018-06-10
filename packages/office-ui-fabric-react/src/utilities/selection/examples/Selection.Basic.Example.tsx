import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import {
  IObjectWithKey,
  ISelection,
  Selection,
  SelectionMode,
  SelectionZone
} from 'office-ui-fabric-react/lib/Selection';
import { createListItems } from '@uifabric/example-app-base';

import './Selection.Example.scss';

const ITEM_COUNT = 100;

export interface ISelectionBasicExampleState {
  items: any[];
  selection: ISelection;
  selectionMode?: SelectionMode;
  canSelect?: string;
}

export interface ISelectionItemExampleProps {
  item?: any;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
export class SelectionItemExample extends React.Component<ISelectionItemExampleProps, {}> {
  public render(): JSX.Element {
    const { item, itemIndex, selection } = this.props;
    let isSelected = false;

    if (selection && itemIndex !== undefined) {
      isSelected = selection.isIndexSelected(itemIndex);
    }

    return (
      <div className='ms-SelectionItemExample' data-is-focusable={ true } data-selection-index={ itemIndex }>
        { (selection && selection.canSelectItem(item) && selection.mode !== SelectionMode.none) && (
          <div className='ms-SelectionItemExample-check' data-is-focusable={ true } data-selection-toggle={ true } >
            <Check checked={ isSelected } />
          </div>
        ) }
        <span className='ms-SelectionItemExample-name'>
          { item.name }
        </span>
        <a className='ms-SelectionItemExample-link' href='https://bing.com' target='_blank'>Link that avoids selection</a>
        <a className='ms-SelectionItemExample-link' data-selection-select={ true } href='https://bing.com' target='_blank'>Link that selects first</a>
      </div>
    );
  }
}

/**
 * The SelectionBasicExample controls the selection state of all items
 */
export class SelectionBasicExample extends React.Component<{}, ISelectionBasicExampleState> {
  private _hasMounted: boolean;

  constructor(props: {}) {
    super(props);

    this._hasMounted = false;
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onSelectionModeChanged = this._onSelectionModeChanged.bind(this);
    this._onToggleSelectAll = this._onToggleSelectAll.bind(this);
    this._onCanSelectChanged = this._onCanSelectChanged.bind(this);
    this._canSelectItem = this._canSelectItem.bind(this);

    this.state = {
      items: createListItems(ITEM_COUNT),
      selection: new Selection({ onSelectionChanged: this._onSelectionChanged }),
      selectionMode: SelectionMode.multiple,
      canSelect: 'all'
    };
    this.state.selection.setItems(this.state.items as IObjectWithKey[], false);
  }

  public componentDidMount(): void {
    this._hasMounted = true;
  }

  public render(): JSX.Element {
    const { items, selection } = this.state;

    return (
      <div className='ms-SelectionBasicExample'>
        <CommandBar items={ this._getCommandItems() } />
        <MarqueeSelection selection={ selection } isEnabled={ selection.mode === SelectionMode.multiple } >
          <SelectionZone
            selection={ selection }
            // tslint:disable-next-line:jsx-no-lambda
            onItemInvoked={ this._alertItem }
          >
            { items.map((item: { key: string | number }, index: number) => (
              <SelectionItemExample
                ref={ 'detailsGroup_' + index }
                key={ item.key }
                item={ item }
                itemIndex={ index }
                selection={ selection }
              />
            )) }
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _alertItem = (item: { key?: React.Key, name: React.ReactText }): void => alert('item invoked: ' + item.name);

  private _onSelectionChanged(): void {
    if (this._hasMounted) {
      this.forceUpdate();
    }
  }

  private _onToggleSelectAll(): void {
    const { selection } = this.state;
    selection.toggleAllSelected();
  }

  private _onSelectionModeChanged(ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void {
    this.setState((previousState: ISelectionBasicExampleState) => {
      const newSelection = new Selection({
        onSelectionChanged: this._onSelectionChanged,
        canSelectItem: previousState.canSelect === 'vowels' ? this._canSelectItem : undefined,
        selectionMode: menuItem.data
      });
      newSelection.setItems(previousState.items as IObjectWithKey[], false);

      return {
        selection: newSelection
      };
    });
  }

  private _onCanSelectChanged(ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void {
    const canSelectItem = (menuItem.data === 'vowels') ? this._canSelectItem : undefined;

    this.setState((previousState: ISelectionBasicExampleState) => {
      const newSelection = new Selection({ onSelectionChanged: this._onSelectionChanged, canSelectItem: canSelectItem, selectionMode: previousState.selection.mode });
      newSelection.setItems(previousState.items as IObjectWithKey[], false);
      return {
        selection: newSelection,
        canSelect: (menuItem.data === 'vowels') ? 'vowels' : 'all'
      };
    });
  }

  private _canSelectItem(item: any): boolean {
    return item.name && (item.name.indexOf('a') === 0 || item.name.indexOf('e') === 0 || item.name.indexOf('i') === 0 || item.name.indexOf('o') === 0 || item.name.indexOf('u') === 0);
  }

  private _getCommandItems(): IContextualMenuItem[] {
    const { selection, canSelect } = this.state;

    return [
      {
        key: 'selectionMode',
        name: 'Selection Mode',
        items: [
          {
            key: SelectionMode[SelectionMode.none],
            name: 'None',
            canCheck: true,
            checked: selection.mode === SelectionMode.none,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.none

          },
          {
            key: SelectionMode[SelectionMode.single],
            name: 'Single select',
            canCheck: true,
            checked: selection.mode === SelectionMode.single,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.single
          },
          {
            key: SelectionMode[SelectionMode.multiple],
            name: 'Multi select',
            canCheck: true,
            checked: selection.mode === SelectionMode.multiple,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.multiple
          },
        ]
      },
      {
        key: 'selectAll',
        name: 'Select All',
        icon: 'CheckMark',
        onClick: this._onToggleSelectAll
      },
      {
        key: 'allowCanSelect',
        name: 'Choose selectable items',
        items: [
          {
            key: 'all',
            name: 'All items',
            canCheck: true,
            checked: canSelect === 'all',
            onClick: this._onCanSelectChanged,
            data: 'all'
          },
          {
            key: 'a',
            name: 'Names starting with vowels',
            canCheck: true,
            checked: canSelect === 'vowels',
            onClick: this._onCanSelectChanged,
            data: 'vowels'
          }
        ]
      }
    ];
  }
}
