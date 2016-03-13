import * as React from 'react';
import { FocusZone } from '../../../../index';
import Row from './List/Row';

export default class ListExample extends React.Component<any, any> {
  public render() {
    return (
      <FocusZone focusNamespace='List'>
        <ul className='FocusList'>
          { this._list.map(this._renderItem) }
        </ul>
      </FocusZone>
    );
  }

  private get _list(): string[] {
    return [
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6'
    ];
  }

  private _renderItem(item: string): JSX.Element {
    return (
      <li key={ item }>
        <Row item={ item } data-contains-focusable-subcomponents={ true } />
      </li>
    );
  }
}
