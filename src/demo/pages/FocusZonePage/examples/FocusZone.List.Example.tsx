import * as React from 'react';
import { createArray } from '../../../../utilities/array';
import {
  Button,
  FocusZone,
  FocusZoneDirection,
  IColumn,
  Link,
  Selection,
  SelectionMode,
  KeyCodes,
  getRTLSafeKeyCode
} from '../../../../index';
import DetailsRow from '../../../../components/DetailsList/DetailsRow';

const ITEMS = createArray(10, (index) => ({
  key: index,
  name: 'Item-' + index,
  url: 'http://placekitten.com/100/' + (200 + index)
}));

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100
  },
  {
    key: 'link',
    name: 'Link',
    fieldName: 'url',
    minWidth: 100,
    getCellContent: item => <Link href={ item.url }>{ item.url }</Link>
  },
  {
    key: 'link',
    name: 'Link',
    fieldName: 'url',
    minWidth: 100,
    getCellContent: item => <Button>{ item.url }</Button>
  }
];

export default class ListExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    this._selection = new Selection();
    this._selection.setItems(ITEMS);
  }

  public render() {
    return (
      <FocusZone
        direction={ FocusZoneDirection.vertical }
        isCircularNavigation={ true }
        isInnerZoneKeystroke={ (ev) => (ev.which === getRTLSafeKeyCode(KeyCodes.right)) }>
        { ITEMS.map((item, index) => (
          <DetailsRow
            key={ index }
            item={ item }
            itemIndex={ index }
            columns={ COLUMNS }
            selectionMode={ SelectionMode.single }
            selection={ this._selection } />
        )) }
      </FocusZone>
    );
  }

}
