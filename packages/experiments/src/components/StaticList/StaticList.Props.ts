import { IObjectWithKey } from 'office-ui-fabric-react/lib/Selection';
import { IGenericListProps } from './List.Props';

export interface IStaticListProps<TItem extends IObjectWithKey> extends IGenericListProps<TItem> {
  listTagName?: string;
}
