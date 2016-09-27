import * as React from 'react';
import {
  GroupedList,
  IGroup,
  IGroupDividerProps
} from '../../../../components/GroupedList/index';
import { Link } from '../../../../Link';
import { createListItems, createGroups } from '../../../utilities/data';
import './GroupedList.Custom.Example.scss';

export class GroupedListCustomExample extends React.Component<any, any> {
  private _items: any[];
  private _groups: IGroup[];

  constructor() {
    super();

    this._items = createListItems(20);
    this._groups = createGroups(4, 0, 0, 5);
  }

  public render() {
    return (
      <GroupedList
        ref='groupedList'
        items={this._items}
        onRenderCell={this._onRenderCell}
        groupProps={
          {
            onRenderHeader: this._onRenderHeader,
            onRenderFooter: this._onRenderFooter
          }
        }
        groups={this._groups}
        />
    );
  }

  private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
    return (
      <div data-selection-index={itemIndex}>
        <span className='ms-GroupedListExample-name'>
          {item.name}
        </span>
      </div>
    );
  }

  private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
    return (
      <div className='ms-GroupedListExample-header ms-font-xl'>
        This is a custom header for {props.group.name}
        (<Link onClick={ () => props.onToggleCollapse(props.group) }>{ props.group.isCollapsed ? 'Expand' : 'Collapse' }</Link>)
      </div>
    );
  }

  private _onRenderFooter(props: IGroupDividerProps): JSX.Element {
    return (
      <div className='ms-GroupedListExample-footer ms-font-xl'>
        This is a custom footer for {props.group.name}
      </div>
    );
  }
}
