import * as React from 'react';
import { IPickerItemProps } from '../BasePicker';
import { css } from '../../../utilities/css';
import './TagItem.scss';

export interface ITagItemProps extends IPickerItemProps {
  item: {
    key: string;
    name: string;
  }
}

export const TagItem = (props: ITagItemProps ) => (
  <div
  className={ css('ms-TagItem', {
    'is-selected': props.isSelected
  }) }
    key={ props.index }
    data-selection-index={ props.index }
    data-is-focusable={ true }>
    <span className='ms-TagItem-text'>{ props.children }</span>
    <span className='ms-TagItem-close' onClick={ props.onRemoveItem }><i className=' ms-Icon ms-Icon--x'/></span>
  </div>
);
