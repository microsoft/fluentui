/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { IPickerItemProps } from '../PickerItem.Props';
import { ITag } from './TagPicker';
import * as stylesImport from './TagItem.scss';
const styles: any = stylesImport;

export const TagItem = (props: IPickerItemProps<ITag>) => (
  <div
    className={ css('ms-TagItem',
      styles.root,
      { 'is-selected': props.selected },
      props.selected && styles.isSelected) }
    key={ props.index }
    data-selection-index={ props.index }
    data-is-focusable={ !props.disabled && true }>
    <span className={ css('ms-TagItem-text', styles.tagItemText) }>{ props.children }</span>
    { !props.disabled &&
      <span className={ css('ms-TagItem-close', styles.tagItemClose) } onClick={ props.onRemoveItem }>
        <Icon iconName='Cancel' />
      </span>
    }
  </div>
);
