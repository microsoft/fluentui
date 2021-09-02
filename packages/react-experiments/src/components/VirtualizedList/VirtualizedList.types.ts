import type { IBaseProps } from '../../Utilities';
import type { IGenericListProps } from '../StaticList/List.types';
import type { IObjectWithKey } from '@fluentui/react/lib/Selection';

export interface IVirtualizedListProps<TItem extends IObjectWithKey> extends IGenericListProps<TItem>, IBaseProps {
  /** Initial height of the viewport in pixels */
  initialViewportHeight?: number;

  /** Height of individual item in pixels */
  itemHeight: number;

  /** Number of items to draw before/after viewport height */
  itemOverdraw?: number;

  /** Html tag to use for spacer elements in the list, defaults to 'div' */
  spacerItemTagName?: string;
}
