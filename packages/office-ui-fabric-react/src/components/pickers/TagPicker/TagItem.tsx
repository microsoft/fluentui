/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../Utilities';
import { IPickerItemProps } from '../PickerItem.Props';
import { ITag } from './TagPicker';
import styles = require('./TagItem.scss');

export const TagItem = (props: IPickerItemProps<ITag>) => (
  <div
    className={ css('ms-TagItem',
      styles.root,
      { 'is-selected': props.selected },
      props.selected && styles.isSelected) }
    key={ props.index }
    data-selection-index={ props.index }
    data-is-focusable={ true }>
    <span className={ css('ms-TagItem-text', styles.tagItemText) }>{ props.children }</span>
    <span className={ css('ms-TagItem-close', styles.tagItemClose) } onClick={ props.onRemoveItem }>
      <i className=' ms-Icon ms-Icon--Cancel' />
    </span>
  </div>
);
