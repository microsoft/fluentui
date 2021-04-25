import * as React from 'react';
import {
  ComponentWithAs,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
  childrenExist,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import { BoxProps } from '../Box/Box';
import { FluentComponentStaticProps } from '../../types';

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
export const MenuItemIcon: ComponentWithAs<'span', MenuItemIconProps> &
  FluentComponentStaticProps<MenuItemIconProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(MenuItemIcon.displayName, context.telemetry);
  setStart();

  const { className, children, design, styles, variables, content, hasContent, iconOnly } = props;

  const { classes } = useStyles<MenuItemIconStylesProps>(MenuItemIcon.displayName, {
    className: menuItemIconClassName,
    mapPropsToStyles: () => ({
      hasContent,
      iconOnly,
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
    debugName: MenuItemIcon.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuItemIcon.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
};

MenuItemIcon.displayName = 'MenuItemIcon';

MenuItemIcon.defaultProps = {
  as: 'span',
};

MenuItemIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  hasContent: PropTypes.bool,
  iconOnly: PropTypes.bool,
};

MenuItemIcon.handledProps = Object.keys(MenuItemIcon.propTypes) as any;

MenuItemIcon.shorthandConfig = {
  mappedProp: 'content',
};
