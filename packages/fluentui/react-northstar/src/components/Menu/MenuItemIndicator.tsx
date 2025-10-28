import * as React from 'react';
import {
  ForwardRefWithAs,
  useFluentContext,
  useStyles,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  getElementType,
  useUnhandledProps,
  childrenExist,
} from '@fluentui/react-bindings';
import { Accessibility, indicatorBehavior, IndicatorBehaviorProps } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import { ChildrenComponentProps, commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';
import { FluentComponentStaticProps } from '../../types';

export interface MenuItemIndicatorProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<IndicatorBehaviorProps>;

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

export type MenuItemIndicatorStylesProps = Pick<
  MenuItemIndicatorProps,
  'iconOnly' | 'vertical' | 'inSubmenu' | 'active' | 'primary' | 'underlined'
>;

export const menuItemIndicatorClassName = 'ui-menu__itemindicator';

/**
 * A MenuItemIndicator allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemIndicator = React.forwardRef<HTMLSpanElement, MenuItemIndicatorProps>((props, ref) => {
  const context = useFluentContext();

  const {
    accessibility = indicatorBehavior,
    className,
    children,
    design,
    styles,
    variables,
    content,
    iconOnly,
    vertical,
    inSubmenu,
    active,
    primary,
    underlined,
  } = props;

  const { classes } = useStyles<MenuItemIndicatorStylesProps>(MenuItemIndicator.displayName, {
    className: menuItemIndicatorClassName,
    mapPropsToStyles: () => ({
      iconOnly,
      vertical,
      inSubmenu,
      active,
      primary,
      underlined,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });

  const ElementType = getElementType(props, 'span');
  const unhandledProps = useUnhandledProps(MenuItemIndicator.handledProps, props);

  const element = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', { className: classes.root, ref, ...unhandledProps })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, MenuItemIndicatorProps> &
  FluentComponentStaticProps<MenuItemIndicatorProps>;

MenuItemIndicator.displayName = 'MenuItemIndicator';

MenuItemIndicator.propTypes = {
  ...commonPropTypes.createCommon(),
  iconOnly: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
  active: PropTypes.bool,
  primary: PropTypes.bool,
  underlined: PropTypes.bool,
};

MenuItemIndicator.handledProps = Object.keys(MenuItemIndicator.propTypes) as any;

MenuItemIndicator.shorthandConfig = {
  mappedProp: 'content',
};
