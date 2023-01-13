import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { ReactSelectorTreeComponentRenderer } from '../../shared/react/types';

interface DetailsListBasicExampleItem {
  file: string;
  author: string;
  lastUpdated: string;
  lastUpdate: string;
}

interface DetailsListBasicExampleState {
  items: DetailsListBasicExampleItem[];
}

class DetailsListDataGridExample extends React.Component<{}, DetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: DetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({});
    const items = [
      {
        file: 'Meeting notes',
        author: 'Max Mustermann',
        lastUpdated: '7h ago',
        lastUpdate: 'You edited this',
      },
      {
        file: 'Thursday presentation',
        author: 'Erika Mustermann',
        lastUpdated: 'Yesterday at 1:45 PM',
        lastUpdate: 'You recently opened this',
      },
      {
        file: 'Training recording',
        author: 'John Doe',
        lastUpdated: 'Yesterday at 1:45 PM',
        lastUpdate: 'You recently opened this',
      },
      {
        file: 'Purchase order',
        author: 'Jane Doe',
        lastUpdated: 'Tue at 9:30 AM',
        lastUpdate: 'You shared this in a Teams chat',
      },
    ];

    // Populate with items for demos.
    this._allItems = new Array(1).fill(0).map((_, i) => items[i % items.length]);

    this._columns = [
      { key: 'file', name: 'File', fieldName: 'file', minWidth: 150, maxWidth: 200 },
      { key: 'author', name: 'Author', fieldName: 'author', minWidth: 150, maxWidth: 200 },
      { key: 'lastUpdated', name: 'Last updated', fieldName: 'lastUpdated', minWidth: 150, maxWidth: 200 },
      { key: 'lastUpdate', name: 'Last update', fieldName: 'lastUpdate', minWidth: 150, maxWidth: 200 },
    ];

    this.state = {
      items: this._allItems,
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <DetailsList
        items={items}
        columns={this._columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={this._selection}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    );
  }
}

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <DetailsListDataGridExample />;
};

export default componentRenderer;
