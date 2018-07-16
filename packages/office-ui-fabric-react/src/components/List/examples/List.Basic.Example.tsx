/* tslint:disable:jsx-no-lambda */

import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';

const items: { key: string; value: string }[] = [];
const ITEMS_PER_PAGE = 20;
const ITEM_HEIGHT = 40;

for (let i = 0; i < 200; ++i) {
  items.push({ key: String(i), value: String(i) });
}

class Row extends React.Component<{ value: string }> {
  private _renderCount = 0;

  public render() {
    return (
      <div style={{ height: ITEM_HEIGHT }}>
        {this.props.value} - Render: {++this._renderCount}
      </div>
    );
  }
}
export class ListBasicExample extends React.Component<{}, any> {
  public render(): JSX.Element {
    return (
      <List
        items={items}
        getItemCountForPage={() => ITEMS_PER_PAGE}
        getPageHeight={() => ITEM_HEIGHT * ITEMS_PER_PAGE}
        onRenderCell={item => <Row value={item.value} />}
      />
    );
  }
}
