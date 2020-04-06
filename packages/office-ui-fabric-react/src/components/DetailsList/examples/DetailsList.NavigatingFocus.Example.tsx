import * as React from 'react';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';

export interface IDetailsListNavigatingFocusExampleState {
  items: string[];
  initialFocusedIndex?: number;
  key: number;
}

export class DetailsListNavigatingFocusExample extends React.Component<{}, IDetailsListNavigatingFocusExampleState> {
  public state: IDetailsListNavigatingFocusExampleState = {
    items: generateItems(''),
    key: 0,
  };

  private _columns: IColumn[] = [
    {
      key: 'filepath',
      name: 'File path',
      onRender: item => (
        // tslint:disable-next-line:jsx-no-lambda
        <Link key={item} onClick={() => this._navigate(item)}>
          {item}
        </Link>
      ),
    } as IColumn,
    {
      key: 'size',
      name: 'Size',
      onRender: item => '4 KB',
    } as IColumn,
  ];

  public render(): JSX.Element {
    // By default, when the list is re-rendered on navigation or some other event,
    // focus goes to the list container and the user has to tab back into the list body.
    // Setting initialFocusedIndex makes focus go directly to a particular item instead.
    return (
      <DetailsList
        key={this.state.key}
        items={this.state.items}
        columns={this._columns}
        onItemInvoked={this._navigate}
        initialFocusedIndex={this.state.initialFocusedIndex}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  private _navigate = (name: string) => {
    this.setState({
      items: generateItems(name + ' / '),
      initialFocusedIndex: 0,
      // Simulate navigation by updating the list's key, which causes it to re-render
      key: this.state.key + 1,
    });
  };
}

function generateItems(parent: string): string[] {
  return Array.prototype.map.call('ABCDEFGHI', (name: string) => parent + 'Folder ' + name);
}
