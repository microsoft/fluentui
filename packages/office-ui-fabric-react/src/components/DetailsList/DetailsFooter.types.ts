import { IColumn } from './DetailsList.types';
import { ISelection } from '../../utilities/selection/index';

export interface IDetailsFooterProps {
  columns?: IColumn[];
  groupNestingDepth?: number;
  selection?: ISelection;
}