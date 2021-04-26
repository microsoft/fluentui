import * as React from 'react';
import {
  ComponentWithAs,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  useUnhandledProps,
  getElementType,
  childrenExist,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes, rtlTextContainer } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { BoxProps } from '../Box/Box';

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
export const MenuItemContent: ComponentWithAs<'span', MenuItemContentProps> &
  FluentComponentStaticProps<MenuItemContentProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(MenuItemContent.displayName, context.telemetry);
  setStart();

  const { className, children, design, styles, variables, content, hasMenu, hasIcon, vertical, inSubmenu } = props;

  const { classes } = useStyles<MenuItemContentStylesProps>(MenuItemContent.displayName, {
    className: menuItemContentClassName,
    mapPropsToStyles: () => ({
      hasMenu,
      hasIcon,
      vertical,
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
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
};

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
