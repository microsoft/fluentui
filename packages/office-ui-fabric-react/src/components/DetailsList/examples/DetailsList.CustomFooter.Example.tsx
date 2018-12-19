import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  IDetailsList,
  IDetailsFooterProps,
  DetailsRow,
  SelectionMode,
  IDetailsRowCheckProps,
  DetailsRowCheck
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
const _items: any[] = [];

const _columns: IColumn[] = [
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
  }
];

export class DetailsListCustomFooterExample extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails: {};
    showItemIndexInView: boolean;
  }
> {
  private _selection: Selection;
  private _detailsList = React.createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);

    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 2; i++) {
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
      selectionDetails: this._getSelectionDetails(),
      showItemIndexInView: false
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <div>
        <div>{selectionDetails}</div>
        <div>
          <Checkbox
            label="Show index of the first item in view when unmounting"
            checked={this.state.showItemIndexInView}
            onChange={this._onShowItemIndexInViewChanged}
          />
        </div>
        <TextField label="Filter by name:" onChange={this._onChange} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            componentRef={this._detailsList}
            items={items}
            columns={_columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
            onRenderDetailsFooter={this._onRenderDetailsFooter}
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._detailsList!.current!.getStartItemIndexInView();
      alert('unmounting, getting first item index that was in view: ' + itemIndexInView);
    }
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onShowItemIndexInViewChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      showItemIndexInView: checked
    });
  };

  private _onRenderDetailsFooter(
    detailsFooterProps: IDetailsFooterProps,
    defaultRender: IRenderFunction<IDetailsFooterProps>
  ): JSX.Element {
    return (
      <DetailsRow
        {...detailsFooterProps}
        columns={detailsFooterProps!.columns as IColumn[]}
        item={{}}
        itemIndex={-1}
        groupNestingDepth={detailsFooterProps!.groupNestingDepth}
        selectionMode={SelectionMode.single}
        selection={detailsFooterProps!.selection as Selection}
        onRenderItemColumn={_renderDetailsFooterItemColumn}
        onRenderCheck={_onRenderCheckForFooterRow}
      />
    );
  }
}

function _renderDetailsFooterItemColumn(item: any, index: number, column: IColumn) {
  return (
    <div>
      <span>
        <b>{column.name}</b>
      </span>
    </div>
  );
}

function _onRenderCheckForFooterRow(props: IDetailsRowCheckProps): JSX.Element {
  return <DetailsRowCheck {...props} style={{ visibility: 'hidden' }} selected={true} />;
}
