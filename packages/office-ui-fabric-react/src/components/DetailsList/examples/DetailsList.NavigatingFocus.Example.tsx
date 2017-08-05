import * as React from 'react';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import './DetailsListExample.scss';

export interface IDetailsListNavigatingFocusExampleState {
  items: any;
  initialFocusedIndex?: number;
}

export class DetailsListNavigatingFocusExample extends React.Component<{}, IDetailsListNavigatingFocusExampleState> {
  public state: IDetailsListNavigatingFocusExampleState = {
    items: generateItems(''),
    initialFocusedIndex: undefined,
  };

  private _columns = [
    {
      name: 'File path',
      onRender: item =>
        <Link
          key={ item }
          onClick={ () => this.navigate(item) }>
          { item }
        </Link>,
    } as IColumn,
    {
      name: 'Size',
      onRender: item => '4 KB',
    } as IColumn
  ];

  public render() {
    return (
      <DetailsList
        items={ this.state.items }
        columns={ this._columns }
        initialFocusedIndex={ this.state.initialFocusedIndex }
      />
    );
  }

  private navigate(name: string) {
    this.setState({
      items: generateItems(name + '/'),
      initialFocusedIndex: 0,
    });
  }
}

function generateItems(parent: string) {
  return Array.prototype.map.call('abcdefghi', (name: string) => parent + name);
}
