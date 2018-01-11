/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css, IDictionary, KeyCodes } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { IPickerItemProps } from '../PickerItem.types';
import { ITag } from './TagPicker';
import * as stylesImport from './TagItem.scss';
const styles: any = stylesImport;

export const TagItem = (props: IPickerItemProps<ITag>) => {
  const onClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    if (props.onClick) {
      props.onClick(event);
    }
  }

  const onKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.keyCode === KeyCodes.enter || event.keyCode === KeyCodes.space) {
      onClick(event);
    }
  }

  return (
    <div
      className={ css('ms-TagItem',
        styles.root,
        { 'is-selected': props.selected } as IDictionary,
        props.selected && styles.isSelected) }
      key={ props.index }
      data-selection-index={ props.index }
      data-is-focusable={ !props.disabled && true }
      onClick={ onClick }
      onKeyDown={ onKeydown }
      role={ 'button' }
    >
      <span className={ css('ms-TagItem-text', styles.tagItemText) } aria-label={ props.children }>{ props.children }</span>
      { !props.disabled &&
        <span className={ css('ms-TagItem-close', styles.tagItemClose) } onClick={ props.onRemoveItem }>
          <Icon iconName='Cancel' />
        </span>
      }
    </div>
  );
};
