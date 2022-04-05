import * as React from 'react';
import { css } from '../../Utilities';
import * as stylesImport from './StaticList.scss';
import type { IObjectWithKey } from '@fluentui/react/lib/Selection';
import type { IStaticListProps } from './StaticList.types';

export class StaticList<TItem extends IObjectWithKey> extends React.Component<IStaticListProps<TItem>> {
  public render(): JSX.Element {
    const { className, items, onRenderItem, listTagName: ListTag = 'ul' } = this.props;

    return React.createElement(
      ListTag,
      { className: css(stylesImport.root, className) },
      items.map((item: TItem, index: number) => onRenderItem(item, index)),
    );
  }
}
