import * as React from 'react';
import { IColumn } from './interfaces';
import { css } from '../../utilities/css';
import { shallowCompare } from '../../utilities/object';

export interface IDetailsRowFieldsProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];

  onDidMount?: (fields: DetailsRowFields) => void;
  onWillUnmount?: (fields: DetailsRowFields) => void;
}

export default class DetailsRowFields extends React.Component<IDetailsRowFieldsProps, {}> {
  public shouldComponentUpdate(newProps: IDetailsRowFieldsProps) {
    return !shallowCompare(this.props, newProps);
  }

  public componentDidMount() {
    if (this.props.onDidMount) {
      this.props.onDidMount(this);
    }
  }

  public componentWillUnmount() {
    if (this.props.onWillUnmount) {
      this.props.onWillUnmount(this);
    }
  }

  public render() {
    let { columns, itemIndex } = this.props;

    return (
      <div className='ms-DetailsRow-fields'>
        { columns.map((column, columnIndex) => (
          <div key={ columnIndex } className={ css('ms-DetailsRow-cell', {
            'is-clipped': column.isClipped
          }) } style={ { width: column.calculatedWidth } }>
            { this._getCellContent(column, itemIndex) }
          </div>
        )) }
      </div>
    );
  }

  private _getCellContent(column: IColumn, index: number): any {
    let { item } = this.props;
    let cellContent;

    try {
      cellContent = column.getCellContent ? column.getCellContent(item, index) : (String(item[column.fieldName]) || '');
    } catch (e) {
      cellContent = `{ Exception: ${e.message}}`;
    }

    return cellContent;
  }

}
