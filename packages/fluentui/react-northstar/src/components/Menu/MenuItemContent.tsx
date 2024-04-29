import * as React from 'react';
import {
  ForwardRefWithAs,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  useUnhandledProps,
  getElementType,
  childrenExist,
  useContextSelectors,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
  UIComponentProps,
} from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { MenuContext, MenuItemSubscribedValue } from './menuContext';

export interface MenuItemContentProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Indicates whether the parent menu item has menu. */
  hasMenu?: boolean;

  /** Indicates whether the parent menu item has icon. */
  hasIcon?: boolean;

  /** Indicates whether the parent menu item is inside vertical menu. */
  vertical?: boolean;

  /** Indicates whether the parent menu item is part of submenu. */
  inSubmenu?: boolean;
}

export type MenuItemContentStylesProps = Pick<MenuItemContentProps, 'hasMenu' | 'hasIcon' | 'vertical' | 'inSubmenu'>;

export const menuItemContentClassName = 'ui-menu__itemcontent';

/**
 * A MenuItemContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemContent = React.forwardRef<HTMLSpanElement, MenuItemContentProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(MenuItemContent.displayName, context.telemetry);
  setStart();

  const parentProps = useContextSelectors(MenuContext, {
    vertical: v => v.vertical,
  }) as unknown as MenuItemSubscribedValue; // TODO: we should improve typings for the useContextSelectors

  const { className, children, design, styles, variables, content, hasMenu, hasIcon, vertical, inSubmenu } = props;

  const { classes } = useStyles<MenuItemContentStylesProps>(MenuItemContent.displayName, {
    className: menuItemContentClassName,
    mapPropsToStyles: () => ({
      hasMenu,
      hasIcon,
      vertical: vertical || parentProps.vertical,
      inSubmenu,
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
    debugName: MenuItemContent.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuItemContent.handledProps, props);

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ref,
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, MenuItemContentProps> &
  FluentComponentStaticProps<MenuItemContentProps>;

MenuItemContent.displayName = 'MenuItemContent';

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

MenuItemContent.shorthandConfig = {
  mappedProp: 'content',
};

MenuItemContent.handledProps = Object.keys(MenuItemContent.propTypes) as any;
