// @codepen

import * as React from 'react';
import { DetailsList, DetailsRow, IDetailsRowProps, IDetailsRowCheckProps } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, IExampleItem } from 'office-ui-fabric-react/lib/utilities/exampleData';

let _items: IExampleItem[];

export class DetailsListCustomRowsExample extends React.Component {
  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(500);
  }

  public render() {
    return <DetailsList items={_items} setKey="set" onRenderRow={this._onRenderRow} />;
  }

  private _onRenderRow = (props: IDetailsRowProps): JSX.Element => {
    return <DetailsRow {...props} onRenderCheck={this._onRenderCheck} aria-busy={false} />;
  };

  private _onRenderCheck = (props: IDetailsRowCheckProps): JSX.Element => {
    return (
      <div
        style={props.anySelected ? { opacity: 1 } : undefined}
        role="button"
        aria-pressed={props.isSelected}
        data-selection-toggle={true}
      >
        <input type="checkbox" checked={props.isSelected} />
      </div>
    );
  };
}
