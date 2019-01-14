// @codepen

import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IDetailsList, DetailsList, IColumn, IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { Toggle, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap'
});
const toggleStyles: Partial<IToggleStyles> = {
  label: { display: 'inline-block', marginLeft: '10px', marginBottom: '3px' },
  root: { display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', margin: margin }
};

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
const _initialRedIndex = 0;
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
          name: 'Color: "red"',
          startIndex: _initialRedIndex,
          count: _initialRedCount
        },
        {
          key: 'groupgreen2',
          name: 'Color: "green"',
          startIndex: _initialGreenIndex,
          count: _initialGreenCount
        },
        {
          key: 'groupblue2',
          name: 'Color: "blue"',
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
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }

  public render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div>
        <div className={controlWrapperClass}>
          <DefaultButton onClick={this._addItem} text="Add an item" styles={{ root: { margin: margin } }} />
          <Toggle label="Compact mode" checked={isCompactMode} onChange={this._onChangeCompactMode} styles={toggleStyles} />
          <Toggle
            label="Show index of first item in view when unmounting"
            checked={this.state.showItemIndexInView}
            onChange={this._onShowItemIndexInViewChanged}
            styles={toggleStyles}
          />
        </div>
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
      </div>
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
    const value = item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  }

  private _onShowItemIndexInViewChanged = (event: React.MouseEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({ showItemIndexInView: checked });
  };

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };
}
