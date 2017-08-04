/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsHeaderProps,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import {
  IRenderFunction
} from 'office-ui-fabric-react/lib/Utilities';
import {
  TooltipHost,
  ITooltipHostProps
} from 'office-ui-fabric-react/lib/Tooltip';
import {
  ScrollablePane
} from 'office-ui-fabric-react/lib/ScrollablePane';
import {
  Sticky
} from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

let _items: {
  key: number,
  name: string,
  value: number
}[] = [];

let _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
];

export class ScrollablePaneDetailsListExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 200; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          value: i
        });
      }
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render() {
    let { items, selectionDetails } = this.state;

    return (
      <ScrollablePane>
        <Sticky>{ selectionDetails }</Sticky>
        <TextField
          label='Filter by name:'
          onChanged={ text => this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items }) }
        />
        <Sticky>
          <h1 style={ { margin: '0px' } }>Item List</h1>
        </Sticky>
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ items }
            columns={ _columns }
            setKey='set'
            layoutMode={ DetailsListLayoutMode.fixedColumns }
            onRenderDetailsHeader={
              (detailsHeaderProps: IDetailsHeaderProps, defaultRender: IRenderFunction<IDetailsHeaderProps>) => (
                <Sticky>
                  { defaultRender({
                    ...detailsHeaderProps,
                    onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => <TooltipHost { ...tooltipHostProps } />
                  }) }
                </Sticky>
              ) }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            ariaLabelForSelectionColumn='Toggle selection'
            ariaLabelForSelectAllCheckbox='Toggle selection for all items'
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
          />
        </MarqueeSelection>
      </ScrollablePane>
    );
  }

  private _getSelectionDetails(): string {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }
}
