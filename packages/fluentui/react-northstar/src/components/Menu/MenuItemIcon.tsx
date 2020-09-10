import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface MenuItemIconOwnProps {
  /** Indicates if the parent menu item may have just icons. */
  iconOnly?: boolean;

  /** Indicates if the parent menu item has content. */
  hasContent?: boolean;
}

export interface MenuItemIconProps extends BoxProps, MenuItemIconOwnProps {}
export type MenuItemIconStylesProps = Pick<MenuItemIconProps, 'hasContent' | 'iconOnly'>;

export const menuItemIconClassName = 'ui-menu__itemicon';

/**
 * A MenuItemIcon allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemIcon = compose<'span', MenuItemIconProps, MenuItemIconStylesProps, BoxProps, {}>(Box, {
  className: menuItemIconClassName,
  displayName: 'MenuItemIcon',
  mapPropsToStylesProps: props => ({ hasContent: props.hasContent, iconOnly: props.iconOnly }),
  handledProps: ['hasContent', 'iconOnly'],

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

MenuItemIcon.defaultProps = {
  as: 'span',
};
MenuItemIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  hasContent: PropTypes.bool,
  iconOnly: PropTypes.bool,
};
