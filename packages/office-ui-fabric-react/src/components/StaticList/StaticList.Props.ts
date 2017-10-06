import {
  IObjectWithKey
} from '../../utilities/selection/index';
import { IGenericListProps } from './List.Props';

export interface IStaticListProps<TItem extends IObjectWithKey> extends IGenericListProps<TItem> {
  listTagName?: string;
}
