import { IBaseProps } from '../../Utilities';
import { IGenericListProps } from '../StaticList/List.Props';
import { IObjectWithKey } from 'office-ui-fabric-react/lib/Selection';

export interface IVirtualizedListProps<TItem extends IObjectWithKey> extends IGenericListProps<TItem>, IBaseProps {
  /** Initial height of the viewport in pixels */
  initialViewportHeight?: number;

  /** Height of individual item in pixels */
  itemHeight: number;

  /** Number of items to draw before/after viewport height */
  itemOverdraw?: number;

  spacerItemTagName?: string;
}