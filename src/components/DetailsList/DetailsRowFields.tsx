import * as React from 'react';
import { IColumn } from './DetailsList.Props';
import { css } from '../../utilities/css';
import { shallowCompare } from '../../utilities/object';

export interface IDetailsRowFieldsProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
}

export interface IDetailsRowFieldsState {
  cellContent: React.ReactNode[];
}

export class DetailsRowFields extends React.Component<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  constructor(props: IDetailsRowFieldsProps) {
    super();

    this.state = this._getState(props);
  }

  public shouldComponentUpdate(newProps: IDetailsRowFieldsProps) {
    return !shallowCompare(this.props, newProps);
  }

  public componentWillReceiveProps(newProps: IDetailsRowFieldsProps) {
    this.setState(this._getState(newProps));
  }

  public render() {
    let { columns } = this.props;
    let { cellContent } = this.state;

    return (
      <div className='ms-DetailsRow-fields' data-automationid='DetailsRowFields'>
        { columns.map((column, columnIndex) => (
        <div
          key={ columnIndex }
          role={ column.isRowHeader ? 'rowheader' : '' }
          className={ css('ms-DetailsRow-cell', column.className, {
            'is-multiline': column.isMultiline
          }) }
          style={ { width: column.calculatedWidth } }
          data-automationid='DetailsRowCell'
          data-automation-key={ column.key }>
          { cellContent[columnIndex] }
        </div>
        )) }
      </div>
    );
  }

  private _getState(props: IDetailsRowFieldsProps) {
    let { item, itemIndex } = props;

    return {
      cellContent: props.columns.map((column) => {
        let cellContent;

        try {
          cellContent = column.onRender ? column.onRender(item, itemIndex) : (String(item[column.fieldName] || ''));
        } catch (e) { /* no-op */ }

        return cellContent;
      })
    };
  }

}
