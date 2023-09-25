import { SelectionMode } from '../../Selection';
import type { IDetailsItemProps } from './DetailsRow.types';
import type { IColumn } from './DetailsList.types';
import type { ISelection } from '../../Selection';

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsFooterBaseProps extends IDetailsItemProps {}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsFooterProps extends IDetailsFooterBaseProps {
  /**
   * Column metadata
   */
  columns: IColumn[];

  /**
   * Selection from utilities
   */
  selection: ISelection;

  /**
   * Selection mode
   */
  selectionMode: SelectionMode;
}
