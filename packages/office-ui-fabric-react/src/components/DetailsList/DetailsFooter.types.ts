import { IDetailsItemProps } from './DetailsRow.types';
import { IColumn } from './DetailsList.types';
import { ISelection, SelectionMode } from '../../utilities/selection/index';

export interface IDetailsFooterBaseProps extends IDetailsItemProps {}

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
