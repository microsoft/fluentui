/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IPickerItemProps } from '../PickerItem.Props';
import { ITag } from './TagPicker';
import { css } from '../../../utilities/css';
import './TagItem.scss';

export const TagItem = (props: IPickerItemProps<ITag> ) => (
  <div
  className={ css('ms-TagItem', {
    'is-selected': props.isSelected
  }) }
    key={ props.index }
    data-selection-index={ props.index }
    data-is-focusable={ true }>
    <span className='ms-TagItem-text'>{ props.children }</span>
    <span className='ms-TagItem-close' onClick={ props.onRemoveItem }><i className=' ms-Icon ms-Icon--Cancel'/></span>
  </div>
);
