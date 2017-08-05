import * as React from 'react';
import {
  GroupedList,
  IGroup,
  IGroupDividerProps
} from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { createListItems, createGroups } from '@uifabric/example-app-base';
import { FontClassNames } from '../../../Styling';
import './GroupedList.Custom.Example.scss';

let _items: any[];
let _groups: IGroup[];

export class GroupedListCustomExample extends React.Component<any, any> {

  constructor() {
    super();

    _items = _items || createListItems(20);
    _groups = createGroups(4, 0, 0, 5);
  }

  public render() {
    return (
      <GroupedList
        ref='groupedList'
        items={ _items }
        onRenderCell={ this._onRenderCell }
        groupProps={
          {
            onRenderHeader: this._onRenderHeader,
            onRenderFooter: this._onRenderFooter
          }
        }
        groups={ _groups }
      />
    );
  }

  private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
    return (
      <div data-selection-index={ itemIndex }>
        <span className='ms-GroupedListExample-name'>
          { item.name }
        </span>
      </div>
    );
  }

  private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
    return (
      <div className={ css('ms-GroupedListExample-header', FontClassNames.xLarge) }>
        This is a custom header for { props.group!.name }
        &nbsp;(<Link onClick={ () => props.onToggleCollapse!(props.group!) }>{ props.group!.isCollapsed ? 'Expand' : 'Collapse' }</Link>)
      </div>
    );
  }

  private _onRenderFooter(props: IGroupDividerProps): JSX.Element {
    return (
      <div className={ css('ms-GroupedListExample-footer', FontClassNames.xLarge) }>
        This is a custom footer for { props.group!.name }
      </div>
    );
  }
}
