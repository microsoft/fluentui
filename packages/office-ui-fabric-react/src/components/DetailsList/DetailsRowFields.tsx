import * as React from 'react';
import { IColumn } from './DetailsList.types';
import { BaseComponent, css } from '../../Utilities';
import * as stylesImport from './DetailsRow.scss';
const styles: any = stylesImport;
import { AnimationClassNames, AnimationVariables } from '../../Styling';

const INNER_PADDING = 16; // Account for padding around the cell.
const ISPADDED_WIDTH = 24;

export interface IDetailsRowFieldsProps {
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columnStartIndex: number;
  columns: IColumn[];
  compact?: boolean;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  shimmer?: boolean;
}

export interface IDetailsRowFieldsState {
  columns: IColumn[];
  cellContent: React.ReactNode[];
  item: any;
  renderingPhase?: DetailsRowFieldsRenderingPhase;
  oldColumns?: IColumn[];
  oldCellContent?: React.ReactNode[];
  oldItem?: any;
}

/* When a column gets new data, we animate the transition. The old data slides out
  * and then the new data slides in. In order to do this, we remember the old data
  * whenever new props come in, in getDerivedStateFromProps(). Then we do rendering
  * in three phases:
  * 2. OldContentOutgiong: Render with the old data and animate it sliding out
  * 1. NewContentIncoming: Render the new data and slide it in
  * 0. Rest: resting state, remove all animation classes
  * Every render() call will move the rendering phase closer to the rest state.
  * The phases go 2->1->0 with a delay inbetween each to allow the animation to
  * complete. Each cell will also check to make sure it changed, if its contents
  * did not change, then it will not do any animation.
*/
export const enum DetailsRowFieldsRenderingPhase {
  OldContentOutgoing = 2,
  NewContentIncoming = 1,
  Rest = 0
}

export class DetailsRowFields extends BaseComponent<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  private static _getCellContent(props: IDetailsRowFieldsProps): React.ReactNode[] {
    const { columns, item, itemIndex, onRenderItemColumn, shimmer } = props;

    return columns.map(column => {
      let cellContent;

      try {
        const render = column.onRender || onRenderItemColumn;

        cellContent =
          render && !shimmer ? render(item, itemIndex, column) : DetailsRowFields._getCellText(item, column);
      } catch (e) {
        /* no-op */
      }

      return cellContent;
    });
  }

  private static _getCellText(item: any, column: IColumn): void {
    let value = item && column && column.fieldName ? item[column.fieldName] : '';

    if (value === null || value === undefined) {
      value = '';
    }

    return value;
  }

  constructor(props: IDetailsRowFieldsProps) {
    super(props);

    this.state = {
      columns: { ...{}, ...props.columns },
      cellContent: DetailsRowFields._getCellContent(props),
      item: { ...{}, ...props.item }
    };
  }

  public componentWillReceiveProps(nextProps: IDetailsRowFieldsProps) {
    this.setState({
      columns: nextProps.columns,
      cellContent: DetailsRowFields._getCellContent(nextProps),
      item: nextProps.item,
      // when first called after ctor, set it to 0, otherwise it's new data and set it to 2
      renderingPhase: typeof this.state.renderingPhase === 'undefined' ? 0 : 2,
      oldColumns: { ...{}, ...this.props.columns }, // get by value instead of by reference
      oldCellContent: DetailsRowFields._getCellContent(this.props),
      oldItem: { ...{}, ...this.props.item }
    });
  }

  public render(): JSX.Element {
    const { item, columns } = this.props;
    const { cellContent, renderingPhase, oldColumns, oldCellContent, oldItem } = this.state;

    if (renderingPhase) {
      this._async.setTimeout(() => {
        this.setState({ renderingPhase: renderingPhase - 1 });
      }, Number(AnimationVariables.durationValue4) * 1000 /* convert to ms */);
    }

    return (
      <div
        className={css('ms-DetailsRow-fields', styles.fields)}
        data-automationid="DetailsRowFields"
        role="presentation"
      >
        {columns.map((column, columnIndex) => {
          const oldColumn = oldColumns && oldColumns[columnIndex];
          let contentChanged = false;
          if (oldItem && oldColumn) {
            contentChanged =
              DetailsRowFields._getCellText(item, column) !== DetailsRowFields._getCellText(oldItem, oldColumn);
          }
          switch (renderingPhase) {
            case 2:
              if (contentChanged) {
                return this._renderCell(oldColumn!, columnIndex, oldCellContent!, AnimationClassNames.slideRightOut40);
              } else {
                return this._renderCell(column, columnIndex, cellContent);
              }
            case 1:
              if (contentChanged) {
                return this._renderCell(column, columnIndex, cellContent, AnimationClassNames.slideLeftIn40);
              } else {
                return this._renderCell(column, columnIndex, cellContent);
              }
            case 0:
            default:
              return this._renderCell(column, columnIndex, cellContent);
          }
        })}
      </div>
    );
  }

  private _renderCell(
    column: IColumn,
    columnIndex: number,
    cellContent: React.ReactNode[],
    withAnimationClass?: string
  ) {
    const { columnStartIndex, shimmer } = this.props;
    return (
      <div
        key={columnIndex}
        role={column.isRowHeader ? 'rowheader' : 'gridcell'}
        aria-colindex={columnIndex + columnStartIndex + 1}
        className={css(
          'ms-DetailsRow-cell',
          styles.cell,
          column.className,
          column.isMultiline && 'is-multiline',
          column.isRowHeader && styles.isRowHeader,
          column.isPadded && styles.isPadded,
          column.isMultiline && styles.isMultiline,
          column.isIconOnly && shimmer && styles.shimmerIconPlaceholder,
          shimmer && styles.shimmerm,
          withAnimationClass
        )}
        style={{
          width: column.calculatedWidth! + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0)
        }}
        data-automationid="DetailsRowCell"
        data-automation-key={column.key}
      >
        {cellContent[columnIndex]}
      </div>
    );
  }
}
