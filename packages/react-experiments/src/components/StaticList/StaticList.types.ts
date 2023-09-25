import type { IObjectWithKey } from '@fluentui/react/lib/Selection';
import type { IGenericListProps } from './List.types';

export interface IStaticListProps<TItem extends IObjectWithKey> extends IGenericListProps<TItem> {
  /** Html tag to use for rendering the list, defaults to 'ul' */
  listTagName?: string;
}
