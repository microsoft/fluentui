import * as React from 'react';
import {
  ForwardRefWithAs,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
  childrenExist,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { ChildrenComponentProps, commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';

export interface MenuItemWrapperProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

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
export const MenuItemWrapper = React.forwardRef<HTMLLIElement, MenuItemWrapperProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(MenuItemWrapper.displayName, context.telemetry);
  setStart();

  const {
    className,
    children,
    design,
    styles,
    variables,
    content,
    active,
    disabled,
    iconOnly,
    isFromKeyboard,
    pills,
    pointing,
    secondary,
    underlined,
    vertical,
    primary,
    on,
  } = props;

  const { classes } = useStyles<MenuItemWrapperStylesProps>(MenuItemWrapper.displayName, {
    className: menuItemWrapperClassName,
    mapPropsToStyles: () => ({
      active,
      disabled,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
      primary,
      on,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getA11Props = useAccessibility(props.accessibility, {
    debugName: MenuItemWrapper.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuItemWrapper.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'li', HTMLLIElement, MenuItemWrapperProps> &
  FluentComponentStaticProps<MenuItemWrapperProps>;

MenuItemWrapper.displayName = 'MenuItemWrapper';

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
  on: PropTypes.oneOf(['hover']),
};

MenuItemWrapper.handledProps = Object.keys(MenuItemWrapper.propTypes) as any;

MenuItemWrapper.shorthandConfig = {
  mappedProp: 'content',
};
