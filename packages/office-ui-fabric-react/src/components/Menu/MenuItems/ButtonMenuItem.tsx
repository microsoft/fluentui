import * as React from 'react';
import { IMenuItemProps } from '../MenuItem.Props';
import {
  buttonProperties,
  getNativeProps,
  css,
  getRTL
} from '../../../Utilities';
import {
  Icon,
  IconName
} from '../../../Icon';

export function ButtonMenuItem(
  item: IMenuItemProps) {
  return (
    <button { ...getNativeProps(item, buttonProperties) }
      className={ css(item.className, item.submenuOpen ? 'is-expanded' : (null), 'ms-Menu-link') }>
      <div className='ms-Menu-linkContent'>
        { (item.hasCheckmarks) ? (
          <Icon
            iconName={ item.checked ? IconName.CheckMark : IconName.CustomIcon }
            className={ 'ms-Menu-icon' }
            onClick={ item.onClick } />
        ) : (null) }
        { (item.hasIcons) ? (
          <Icon {...item.iconProps} />
        ) : (null) }
        <span className='ms-Menu-itemText ms-fontWeight-regular'>{ item.name }</span>
        { (item.items && item.items.length) ? (
          <Icon className='ms-Menu-submenuChevron ms-Icon'
            iconName={ getRTL() ? IconName.ChevronLeft : IconName.ChevronRight } />
        ) : (null) }
      </div>
    </button>);
}