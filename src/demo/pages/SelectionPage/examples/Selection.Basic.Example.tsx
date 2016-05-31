import * as React from 'react';
import { CommandBar, IContextualMenuItem } from '../../../../index';
import { Check } from '../../../../components/DetailsList/Check';
import {
  IObjectWithKey,
  ISelection,
  Selection,
  SelectionMode,
  SelectionZone
  } from '../../../../utilities/selection/index';
import { createListItems } from '../../../utilities/data';
import { css } from '../../../../utilities/css';

import './Selection.Example.scss';

const ITEM_COUNT = 100;

export interface ISelectionBasicExampleState {
  items?: any[];
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

export interface ISelectionItemExampleProps {
  item?: any;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

export interface ISelectionItemExampleState {
  isSelected?: boolean;
}

/**
 * The SelectionBasicExample controls the selection state of all items
 */
export class SelectionBasicExample extends React.Component<any, ISelectionBasicExampleState> {
  private _hasMounted: boolean;

  constructor() {
    super();

    this._hasMounted = false;
    this._onSelectionModeChanged = this._onSelectionModeChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onToggleSelectAll = this._onToggleSelectAll.bind(this);

    this.state = {
      items: createListItems(ITEM_COUNT),
      selection: new Selection(this._onSelectionChanged),
      selectionMode: SelectionMode.multiple,
    };
    this.state.selection.setItems(this.state.items as IObjectWithKey[], false);
  }

  public componentDidMount() {
    this._hasMounted = true;
  }

  public render() {
    let { selection, selectionMode } = this.state;

    return (
      <div className='ms-SelectionBasicExample'>
        <CommandBar items={ this._getCommandItems() } />
        <SelectionZone selection={ selection } selectionMode={ selectionMode } >
          { this._renderSelectionItems() }
        </SelectionZone>
      </div>
    );
  }

  private _renderSelectionItems() {
    let { items, selection, selectionMode } = this.state;

    let renderedItems = items.map((item, index) => (
      <SelectionItemExample
        ref={ 'detailsGroup_' + index }
        key={ item.key }
        item={ item }
        itemIndex={ index }
        selectionMode={ selectionMode }
        selection={ selection }
        />
    ));

    return (
      <div className='ms-SelectionExampleItems'>
        { renderedItems }
      </div>
    );
  }

  private _onSelectionChanged() {
    if (this._hasMounted) {
      this.forceUpdate();
    }
  }

  private _onToggleSelectAll() {
    let { selection } = this.state;
    selection.toggleAllSelected();
  }

  private _onSelectionModeChanged(menuItem: IContextualMenuItem) {
    this.setState({
      selectionMode: menuItem.data
    });
  }

  private _getCommandItems(): IContextualMenuItem[] {
    let { selectionMode } = this.state;

    return [
      {
        key: 'selectionMode',
        name: 'Selection Mode',
        items: [
          {
            key: SelectionMode[SelectionMode.none],
            name: 'None',
            canCheck: true,
            isChecked: selectionMode === SelectionMode.none,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.none

          },
          {
            key: SelectionMode[SelectionMode.single],
            name: 'Single select',
            canCheck: true,
            isChecked: selectionMode === SelectionMode.single,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.single
          },
          {
            key: SelectionMode[SelectionMode.multiple],
            name: 'Multi select',
            canCheck: true,
            isChecked: selectionMode === SelectionMode.multiple,
            onClick: this._onSelectionModeChanged,
            data: SelectionMode.multiple
          },
        ]
      },
      {
        key: 'selectAll',
        name: 'Select All',
        icon: 'check',
        onClick: this._onToggleSelectAll
      }
    ];
  }
}

/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
export class SelectionItemExample extends React.Component<ISelectionItemExampleProps, ISelectionItemExampleState> {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this._getSelectionState(props)
    };
  }

  public forceUpdate() {
    this._onSelectionChanged();
    super.forceUpdate();
  }

  public render() {
    let { isSelected } = this.state;
    let { item, itemIndex, selectionMode } = this.props;

    return (
      <div
        className={ css('ms-SelectionItemExample', { 'is-selected': isSelected }) }
        data-selection-index={ itemIndex }
        >
          { (selectionMode !== SelectionMode.none) && (
            <button className='ms-SelectionItemExample-check' data-selection-toggle={ true } >
              <Check isChecked={ isSelected } />
            </button>
          ) }
          <span className='ms-SelectionItemExample-name'>
            { item.name }
          </span>
      </div>
    );
  }

  public componentWillReceiveProps(newProps: ISelectionItemExampleProps) {
    this.setState({
      isSelected: this._getSelectionState(newProps)
    });
  }

  private _getSelectionState(props: ISelectionItemExampleProps): boolean {
    let { itemIndex, selection } = props;

    return selection.isIndexSelected(itemIndex);
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (selectionState !== this.state.isSelected) {
      this.setState({
        isSelected: selectionState
      });
    }
  }
}
