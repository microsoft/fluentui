/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IMenuItemProps } from '../MenuItem.Props';
import {
  anchorProperties,
  getNativeProps,
  css,
} from '../../../Utilities';
import {
  Icon
} from '../../../Icon';

export function AnchorMenuItem(item: IMenuItemProps): JSX.Element {
  return (
    <div>
      <a
        { ...getNativeProps(item, anchorProperties) }
        href={ item.href }
        role='menuitem'
        onClick={ item.onClick }
        className={ css('ms-Menu-link', item.className) }>
        { (item.hasIcons) ? (
          <Icon { ...item.iconProps} />
        ) : (null) }
        <span className='ms-Menu-linkText ms-fontWeight-regular'> { item.name } </span>
      </a>
    </div >);
}