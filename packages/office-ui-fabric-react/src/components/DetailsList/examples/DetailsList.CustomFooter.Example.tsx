// @codepen

import * as React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IDetailsFooterProps,
  DetailsRow,
  SelectionMode,
  IDetailsRowCheckProps,
  DetailsRowCheck
} from 'office-ui-fabric-react/lib/DetailsList';

export interface IDetailsListCustomFooterExampleItem {
  key: number;
  name: string;
  value: number;
}

const _items: IDetailsListCustomFooterExampleItem[] = [];
for (let i = 0; i < 5; i++) {
  _items.push({
    key: i,
    name: 'Item ' + i,
    value: i
  });
}

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

export class DetailsListCustomFooterExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <DetailsList
        items={_items}
        columns={_columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        onRenderDetailsFooter={this._onRenderDetailsFooter}
      />
    );
  }

  private _onRenderDetailsFooter(detailsFooterProps: IDetailsFooterProps): JSX.Element {
    return (
      <DetailsRow
        {...detailsFooterProps}
        columns={detailsFooterProps!.columns}
        item={{}}
        itemIndex={-1}
        groupNestingDepth={detailsFooterProps!.groupNestingDepth}
        selectionMode={SelectionMode.single}
        selection={detailsFooterProps!.selection}
        onRenderItemColumn={_renderDetailsFooterItemColumn}
        onRenderCheck={_onRenderCheckForFooterRow}
      />
    );
  }
}

function _renderDetailsFooterItemColumn(item: IDetailsListCustomFooterExampleItem, index: number, column: IColumn) {
  return (
    <div>
      <b>{column.name}</b>
    </div>
  );
}

function _onRenderCheckForFooterRow(props: IDetailsRowCheckProps): JSX.Element {
  return <DetailsRowCheck {...props} styles={{ root: { visibility: 'hidden' } }} selected={true} />;
}
