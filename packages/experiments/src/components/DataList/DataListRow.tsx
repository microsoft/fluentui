import * as React from 'react';
import { css, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IItem } from './List';
import { IColumn, ISizing } from './DataList';

import * as stylesImport from './DataListRow.scss';
import { ISelection } from 'office-ui-fabric-react/lib/utilities/selection';
const styles: any = stylesImport;

export interface IDataListRowProps<TItem extends IItem = any> {
  className?: string;

  columns: IColumn[];

  index: number;

  item: TItem;

  itemHeight: number;

  dropColumns?: boolean;

  selection?: ISelection;
}

export class DataListRow<TItem extends IItem = any> extends React.PureComponent<IDataListRowProps<TItem>> {
  public render() {
    const { className, dropColumns, item, selection, index } = this.props;

    const isSelected = selection && selection.isKeySelected(item.key);

    return <div
      className={ css(
        'ms-DataListRow',
        styles.row,
        dropColumns && styles.rowDropColumns,
        isSelected && styles.rowSelected,
        isSelected && 'ms-DataListRow--Selected',
        className
      ) }
      data-selection-index={ index }>
      { this.renderColumns() }
    </div>;
  }

  private renderColumns(): JSX.Element[] {
    const { className, columns, item, itemHeight, dropColumns } = this.props;

    return columns.map(column => {
      const {
        key,
        fieldName,
        name,
        sizing,
        minWidth,
        isCollapsable
      } = column;

      return <div
        key={ key }
        className={ css(
          'ms-DataList--Cell',
          styles.cell
        ) }
        style={ {
          minWidth,
          flexShrink: isCollapsable ? 1 : undefined,
          height: itemHeight
        } }>
        <div className={ styles.text }>
          { this.getValueFromColumn(item, fieldName || key) }
        </div>
      </div>;
    });
  }

  private getValueFromColumn(item: TItem, key: string): string {
    return (item as any)[key];
  }

  @autobind
  private onClick() {
    this.props.selection!.toggleKeySelected(this.props.item.key);
  }
}