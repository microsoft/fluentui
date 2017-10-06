import { IRenderFunction } from '../../Utilities';
import {
  IObjectWithKey
} from '../../utilities/selection/index';

export interface IGenericList<TItem extends IObjectWithKey> {
}

export interface IGenericListProps<TItem extends IObjectWithKey> {
  className?: string;

  items: TItem[];

  itemHeight: number;

  onRenderItem: (item: TItem, index: number) => JSX.Element | null;
}