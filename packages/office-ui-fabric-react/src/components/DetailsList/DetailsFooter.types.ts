import { IColumn } from './DetailsList.types';
import { ISelection } from '../../utilities/selection/index';
import { IViewport } from '../../utilities/decorators/withViewport';
export interface IDetailsFooterProps {
  columns?: IColumn[];
  groupNestingDepth?: number;
  selection?: ISelection;
  viewport?: IViewport | undefined;
}