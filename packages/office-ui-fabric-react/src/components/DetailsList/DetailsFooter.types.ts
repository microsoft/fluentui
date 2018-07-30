import { IColumn } from './DetailsList.types';
import { ISelection } from '../../utilities/selection/index';
// export interface IDetailsFooter {
//   focus: () => boolean;
// }

export interface IDetailsFooterProps {
  // componentRef?: (component: IDetailsFooter | null) => void;
  /**
   * Custom classname
   */
  columns?: IColumn[];
  groupNestingDepth?: number;
  selection?: ISelection;
}
