import * as React from 'react';
import {
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IOverflowGroupProps } from './OverflowGroup.Props';

import styles from './OverflowGroup.scss';

export class OverflowGroup extends React.Component<IOverflowGroupProps, {}> {
  public render() {
    let { className, items, onRenderItem } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    let modifiedClassName = css(
      'ms-OverflowGroup',
      styles.root,
      className
    );

    return (
      <div { ...divProps } className={ modifiedClassName } >
        { this._onRenderGroup(items) }
      </div>
    );
  }

  private _onRenderGroup(items) {
    let groupItems = [];
    let { onRenderItem } = this.props;

    for (let i = 0; items && i < items.length; i++) {
      let item = items[i];

      if (item.key === null || item.key === undefined) {
        item.key = i;
      }

      groupItems.push(
        <div className={ css('ms-OverflowGroup-item', styles.item) } key={ item.key } >
          { onRenderItem(item, i) }
        </div>
      );
    }

    return groupItems;
  }
}
