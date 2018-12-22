// @codepen

import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { IDetailsList, DetailsList, IColumn, IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

export interface IDetailsListGroupedExampleItem {
  key: string;
  name: string;
  color: string;
}

const _columns: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'color',
    name: 'Color',
    fieldName: 'color',
    minWidth: 100,
    maxWidth: 200
  }
];
// NOTE: If changing these, also change the initial definition of state.groups below
const _initialRedNdx = 0;
const _initialRedCount = 2;
const _initialGreenIndex = 2;
const _initialGreenCount = 0;
const _initialBlueIndex = 2;
const _initialBlueCount = 3;
const _items: IDetailsListGroupedExampleItem[] = [
  {
    key: 'a',
    name: 'a',
    color: 'red'
  },
  {
    key: 'b',
    name: 'b',
    color: 'red'
  },
  {
    key: 'c',
    name: 'c',
    color: 'blue'
  },
  {
    key: 'd',
    name: 'd',
    color: 'blue'
  },
  {
    key: 'e',
    name: 'e',
    color: 'blue'
  }
];

export interface IDetailsListGroupedExampleState {
  items: IDetailsListGroupedExampleItem[];
  groups: IGroup[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}
const _blueGroupIndex = 2;

export class DetailsListGroupedExample extends BaseComponent<{}, IDetailsListGroupedExampleState> {
  private _root = React.createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);

    this.state = {
      items: _items,
      // This is based on the definition of _items
      groups: [
        {
          key: 'groupred0',
          name: 'By "red"',
          startIndex: _initialRedNdx,
          count: _initialRedCount
        },
        {
          key: 'groupgreen2',
          name: 'By "green"',
          startIndex: _initialGreenIndex,
          count: _initialGreenCount
        },
        {
          key: 'groupblue2',
          name: 'By "blue"',
          startIndex: _initialBlueIndex,
          count: _initialBlueCount
        }
      ],
      showItemIndexInView: false,
      isCompactMode: false
    };
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current!.getStartItemIndexInView();
      console.log('unmounting, getting first item index that was in view: ' + itemIndexInView);
    }
  }

  public render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <Fabric style={{ display: 'block' }}>
        <Checkbox
          className={exampleChildClass}
          label="Show index of the first item in view when unmounting"
          checked={this.state.showItemIndexInView}
          onChange={this._onShowItemIndexInViewChanged}
        />
        <DefaultButton className={exampleChildClass} onClick={this._addItem} text="Add an item" />
        <Toggle
          className={exampleChildClass}
          label="Enable compact mode"
          checked={isCompactMode}
          onChange={this._onChangeCompactMode}
          onText="Compact"
          offText="Normal"
        />
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={groups}
          columns={_columns}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          groupProps={{
            showEmptyGroups: true
          }}
          onRenderItemColumn={this._onRenderColumn}
          compact={isCompactMode}
        />
      </Fabric>
    );
  }

  private _addItem = (): void => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            key: 'item-' + items.length,
            name: 'New item ' + items.length,
            color: 'blue'
          }
        ]),
        groups
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      }
    );
  };

  private _onRenderColumn(item: IDetailsListGroupedExampleItem, index: number, column: IColumn) {
    const value = item && column && column.fieldName ? (item as any)[column.fieldName] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  }

  private _onShowItemIndexInViewChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      showItemIndexInView: checked
    });
  };

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };
}
