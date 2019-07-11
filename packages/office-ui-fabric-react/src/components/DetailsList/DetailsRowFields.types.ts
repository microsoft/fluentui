import { IColumn } from './DetailsList.types';
import { ICellStyleProps } from './DetailsRow.types';
import { IDetailsListProps } from './DetailsList';
import { IDetailsRowProps } from './DetailsRow';

/**
 * Extended column render props.
 *
 * {@docCategory DetailsList}
 */
export type IOverrideColumnRenderProps = Pick<IDetailsListProps, 'onRenderItemColumn' | 'getCellValueKey'> &
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
    isMultiline: string;
    isRowHeader: string;
    cell: string;
    cellAnimation: string;
    cellPadded: string;
    cellUnpadded: string;
    fields: string;
  };

  /**
   * Style properties to customize cell render output.
   */
  cellStyleProps?: ICellStyleProps;
}
