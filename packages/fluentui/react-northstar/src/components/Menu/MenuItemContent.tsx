import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface MenuItemContentOwnProps {
  /** Indicates whether the parent menu item has menu. */
  hasMenu?: boolean;

  /** Indicates whether the parent menu item has icon. */
  hasIcon?: boolean;

  /** Indicates whether the parent menu item is inside vertical menu. */
  vertical?: boolean;

  /** Indicates whether the parent menu item is part of submenu. */
  inSubmenu?: boolean;
}

export interface MenuItemContentProps extends BoxProps, MenuItemContentOwnProps {}
export type MenuItemContentStylesProps = Pick<MenuItemContentProps, 'hasMenu' | 'hasIcon' | 'vertical' | 'inSubmenu'>;

export const menuItemContentClassName = 'ui-menu__itemcontent';

/**
 * A MenuItemContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemContent = compose<'span', MenuItemContentProps, MenuItemContentStylesProps, BoxProps, {}>(Box, {
  className: menuItemContentClassName,
  displayName: 'MenuItemContent',
  mapPropsToStylesProps: props => ({
    hasMenu: props.hasMenu,
    hasIcon: props.hasIcon,
    vertical: props.vertical,
    inSubmenu: props.inSubmenu,
  }),
  handledProps: ['hasMenu', 'hasIcon', 'vertical', 'inSubmenu'],

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

MenuItemContent.defaultProps = {
  as: 'span',
};
MenuItemContent.propTypes = {
  ...commonPropTypes.createCommon(),
  hasIcon: PropTypes.bool,
  hasMenu: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
};
