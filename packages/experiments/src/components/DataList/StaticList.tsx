import * as React from 'react';
import { IItem, IListProps, IList } from './List';
import { css } from 'office-ui-fabric-react/lib/Utilities';

export interface IStaticListProps<TItem extends IItem> extends IListProps<TItem> {
  listTagName?: string;
}

export class StaticList<TItem extends IItem = any> extends React.PureComponent<IStaticListProps<TItem>> implements IList<TItem> {
  public render(): JSX.Element {
    const {
      className,
      items,
      onRenderItem,
      listTagName: ListTag = 'ul'
     } = this.props;

    return <ListTag className={ css(className) }>
      { items.map((item, index) => onRenderItem(index, item)) }
    </ListTag>;
  }
}