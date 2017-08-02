import * as React from 'react';
import {
  KeyCodes,
  createArray,
  getRTLSafeKeyCode
} from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { DetailsRow, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import './FocusZone.List.Example.scss';

const ITEMS = createArray(10, (index) => ({
  key: index,
  name: 'Item-' + index,
  url: 'http://placehold.it/100x' + (200 + index!)
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
    onRender: item => <Link href={ item.url }>{ item.url }</Link>
  },
  {
    key: 'link',
    name: 'Link',
    fieldName: 'url',
    minWidth: 100,
    onRender: item => <DefaultButton>{ item.url }</DefaultButton>
  }
];

export class FocusZoneListExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    this._selection = new Selection();
    this._selection.setItems(ITEMS);
  }

  public render() {
    return (
      <FocusZone
        className='ms-FocusZoneListExample'
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
