import { compose } from '@fluentui/react-bindings';
import { indicatorBehavior } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface MenuItemIndicatorOwnProps {
  /** Indicates if the parent menu item may have just icons. */
  iconOnly?: boolean;

  /** Indicates whether the parent menu item is inside vertical menu. */
  vertical?: boolean;

  /** Indicates whether the parent menu item is part of submenu. */
  inSubmenu?: boolean;

  /** Indicates whether the parent menu item is active. */
  active?: boolean;

  /** Indicates whether the parent menu item is primary. */
  primary?: boolean;

  /** Indicates whether the parent menu item is underlined. */
  underlined?: boolean;
}

export interface MenuItemIndicatorProps extends BoxProps, MenuItemIndicatorOwnProps {}
export type MenuItemIndicatorStylesProps = Pick<
  MenuItemIndicatorProps,
  'iconOnly' | 'vertical' | 'inSubmenu' | 'active' | 'primary' | 'underlined'
>;

export const menuItemIndicatorClassName = 'ui-menu__itemindicator';

/**
 * A MenuItemIndicator allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemIndicator = compose<'span', MenuItemIndicatorProps, MenuItemIndicatorStylesProps, BoxProps, {}>(
  Box,
  {
    className: menuItemIndicatorClassName,
    displayName: 'MenuItemIndicator',
    mapPropsToStylesProps: props => ({
      iconOnly: props.iconOnly,
      vertical: props.vertical,
      inSubmenu: props.inSubmenu,
      active: props.active,
      primary: props.primary,
      underlined: props.underlined,
    }),
    handledProps: ['iconOnly', 'vertical', 'inSubmenu', 'active', 'primary', 'underlined'],

    overrideStyles: true,
    shorthandConfig: {
      mappedProp: 'content',
    },
  },
);

MenuItemIndicator.defaultProps = {
  as: 'span',
  accessibility: indicatorBehavior,
};
MenuItemIndicator.propTypes = {
  ...commonPropTypes.createCommon(),
  iconOnly: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
  active: PropTypes.bool,
  primary: PropTypes.bool,
  underlined: PropTypes.bool,
};
