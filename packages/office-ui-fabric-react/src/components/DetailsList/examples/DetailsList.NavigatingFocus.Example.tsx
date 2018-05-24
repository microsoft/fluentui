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
      key: 'filepath',
      name: 'File path',
      onRender: item =>
        (
          <Link
            key={ item }
            onClick={ this._navigate(item) }
          >
            { item }
          </Link>
        ),
    } as IColumn,
    {
      key: 'size',
      name: 'Size',
      onRender: item => '4 KB',
    } as IColumn
  ];

  public render(): JSX.Element {
    return (
      <DetailsList
        items={ this.state.items }
        columns={ this._columns }
        initialFocusedIndex={ this.state.initialFocusedIndex }
      />
    );
  }

  private _navigate = (name: string): () => void => {
    return (): void => {
      this.setState({
        items: generateItems(name + '/'),
        initialFocusedIndex: 0,
      });
    };
  }
}

function generateItems(parent: string): void {
  return Array.prototype.map.call('abcdefghi', (name: string) => parent + name);
}
