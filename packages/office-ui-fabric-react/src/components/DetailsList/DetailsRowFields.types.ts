import { IColumn } from './DetailsList.types';
import { IDetailsRowStyles, ICellStyleProps } from './DetailsRow.types';
import { IDetailsListProps } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow';
import { isRowHeader, shimmerIconPlaceholder } from './DetailsRow.scss';

/**
 * {@docCategory DetailsList}
 */
export type IOverrideColumnRenderProps = Pick<IDetailsListProps, 'onRenderItemColumn'> & Pick<IDetailsRowProps, 'cellsByColumn'>;

/**
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
   * Whether to show shimmer
   */
  shimmer?: boolean;

  /**
   * Subset of classnames currently generated in DetailsRow that are used within DetailsRowFields.
   */
  rowClassNames: {
    isMultiline: string;
    isRowHeader: string;
    shimmerIconPlaceholder: string;
    shimmer: string;
    cell: string;
    cellPadded: string;
    cellUnpadded: string;
    fields: string;
  };

  cellStyleProps?: ICellStyleProps;
}
