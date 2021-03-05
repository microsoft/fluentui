import { compose } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface MenuItemWrapperOwnProps {
  /** A menu item wrapper can be active. */
  active?: boolean;

  /** A menu item wrapper can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** A menu item wrapper may have just icons. */
  iconOnly?: boolean;

  /** Indicates whether the last event was from keyboard. */
  isFromKeyboard?: boolean;

  /** A menu item wrapper can adjust its appearance to de-emphasize its contents. */
  pills?: boolean;

  /**
   * A menu can point to show its relationship to nearby content.
   * For vertical menu, it can point to the start of the item or to the end.
   */
  pointing?: boolean | 'start' | 'end';

  /** The menu item wrapper can have primary type. */
  primary?: boolean;

  /** The menu item wrapper can have secondary type. */
  secondary?: boolean;

  /** Menu items wrapper can by highlighted using underline. */
  underlined?: boolean;

  /** A vertical menu displays elements vertically. */
  vertical?: boolean;

  /** Menu can be set to open on hover */
  on?: 'hover';
}

export interface MenuItemWrapperProps extends BoxProps, MenuItemWrapperOwnProps {}
export type MenuItemWrapperStylesProps = Required<
  Pick<
    MenuItemWrapperProps,
    | 'active'
    | 'disabled'
    | 'iconOnly'
    | 'isFromKeyboard'
    | 'pills'
    | 'pointing'
    | 'primary'
    | 'secondary'
    | 'underlined'
    | 'vertical'
    | 'on'
  >
>;

export const menuItemWrapperClassName = 'ui-menu__itemwrapper';

/**
 * A MenuItemWrapper allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemWrapper = compose<'li', MenuItemWrapperProps, MenuItemWrapperStylesProps, BoxProps, {}>(Box, {
  className: menuItemWrapperClassName,
  displayName: 'MenuItemWrapper',
  mapPropsToStylesProps: props => ({
    active: props.active,
    disabled: props.disabled,
    iconOnly: props.iconOnly,
    isFromKeyboard: props.isFromKeyboard,
    pills: props.pills,
    pointing: props.pointing,
    secondary: props.secondary,
    underlined: props.underlined,
    vertical: props.vertical,
    primary: props.primary,
    on: props.on,
  }),
  handledProps: [
    'active',
    'disabled',
    'iconOnly',
    'isFromKeyboard',
    'pills',
    'pointing',
    'secondary',
    'underlined',
    'vertical',
    'primary',
    'on',
  ],

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

MenuItemWrapper.defaultProps = {
  as: 'li',
};
MenuItemWrapper.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  isFromKeyboard: PropTypes.bool,
  pills: PropTypes.bool,
  pointing: PropTypes.oneOf(['start', 'end', true, false]),
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  underlined: PropTypes.bool,
  vertical: PropTypes.bool,
};
