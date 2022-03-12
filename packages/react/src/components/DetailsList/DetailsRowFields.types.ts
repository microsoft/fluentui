import type { IColumn } from './DetailsList.types';
import type { ICellStyleProps, IDetailsRowStyles } from './DetailsRow.types';
import type { IDetailsListProps } from './DetailsList';
import type { IDetailsRowProps } from './DetailsRow';

/**
 * Extended column render props.
 *
 * {@docCategory DetailsList}
 */
export type IOverrideColumnRenderProps = Pick<
  IDetailsListProps,
  'onRenderItemColumn' | 'getCellValueKey' | 'onRenderField'
> &
  Pick<IDetailsRowProps, 'cellsByColumn'>;

/**
 * Props interface for the DetailsRowFields component.
 *
 * {@docCategory DetailsList}
 */
export interface IDetailsRowFieldsProps extends IOverrideColumnRenderProps {
  /**
   * Data source for this component
   */
  item: any;

  /**
   * The item index of the collection for the DetailsList
   */
  itemIndex: number;

  /**
   * Index to start for the column
   */
  columnStartIndex: number;

  /**
   * Columns metadata
   */
  columns: IColumn[];

  /**
   * whether to render as a compact field
   */
  compact?: boolean;

  /**
   * Subset of classnames currently generated in DetailsRow that are used within DetailsRowFields.
   */
  rowClassNames: {
    [k in keyof Pick<
      IDetailsRowStyles,
      'isMultiline' | 'isRowHeader' | 'cell' | 'cellAnimation' | 'cellPadded' | 'cellUnpadded' | 'fields'
    >]: string;
  };

  /**
   * Whether or not the details row is in a selected state.
   */
  isSelected?: boolean;

  /**
   * Id for the current row's row-header
   */
  rowHeaderId?: string;

  /**
   * Style properties to customize cell render output.
   */
  cellStyleProps?: ICellStyleProps;

  enableUpdateAnimations?: boolean;
}
