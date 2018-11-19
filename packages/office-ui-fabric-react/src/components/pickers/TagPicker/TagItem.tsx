/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css, IDictionary } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { IPickerItemProps } from '../PickerItem.types';
import { ITag } from './TagPicker';
import * as stylesImport from './TagItem.scss';
const styles: any = stylesImport;

export interface ITagItemProps extends IPickerItemProps<ITag> {
  enableTagFocusInDisabledPicker?: boolean;
}

export const TagItem = (props: ITagItemProps) => (
  <div
    className={css('ms-TagItem', styles.root, { 'is-selected': props.selected } as IDictionary, props.selected && styles.isSelected)}
    role={'listitem'}
    key={props.index}
    data-selection-index={props.index}
    data-is-focusable={(props.enableTagFocusInDisabledPicker || !props.disabled) && true}
  >
    <span className={css('ms-TagItem-text', styles.tagItemText)} aria-label={props.children as string}>
      {props.children}
    </span>
    {!props.disabled && (
      <span className={css('ms-TagItem-close', styles.tagItemClose)} onClick={props.onRemoveItem}>
        <Icon iconName="Cancel" />
      </span>
    )}
  </div>
);
