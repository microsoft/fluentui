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

const _items: IDetailsListCustomFooterExampleItem[] = [{ key: 0, name: 'Item 0', value: 0 }, { key: 1, name: 'Item 1', value: 1 }];

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

export class DetailsListCustomFooterExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
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
      </div>
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
  return <DetailsRowCheck {...props} style={{ visibility: 'hidden' }} selected={true} />;
}
