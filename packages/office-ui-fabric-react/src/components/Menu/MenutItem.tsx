import * as React from 'react';
import { IMenuProps } from './Menu.Props';
import { IMenuItemProps } from './MenuItem.Props';
import {
  anchorProperties,
  buttonProperties,
  getNativeProps,
  assign,
  getId,
  getRTL,
  css,
  autobind,
  KeyCodes,
  getDocument,
  getWindow
} from '../../Utilities';
import { BaseComponent } from '../../common/BaseComponent';
import {
  Icon,
  IconName,
  IIconProps
} from '../../Icon';
import { AnchorMenuItem } from './MenuItems/AnchorMenuItem';
import { ButtonMenuItem } from './MenuItems/ButtonMenuItem';
import './Menu.scss';

export class MenuItem extends BaseComponent<IMenuItemProps, {}> {
  public render() {
    let { index, name, className } = this.props;

    // If the item is disabled then it should render as the button for proper styling.
    if (this.props.href) {
      return <AnchorMenuItem
        {...this.props}
        key={index + name}
        className={css('ms-MenuItem', className)} />;
    }
    return <ButtonMenuItem
        {...this.props}
        key={index + name}
        className={css('ms-MenuItem', className)} />;
  }
}