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
import * as PropTypes from 'prop-types';
import { ChildrenComponentProps, commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';

export interface MenuItemIconProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Indicates if the parent menu item may have just icons. */
  iconOnly?: boolean;

  /** Indicates if the parent menu item has content. */
  hasContent?: boolean;
}

export type MenuItemIconStylesProps = Pick<MenuItemIconProps, 'hasContent' | 'iconOnly'>;

export const menuItemIconClassName = 'ui-menu__itemicon';

/**
 * A MenuItemIcon allows a user to have a dedicated component that can be targeted from the theme.
 */
export const MenuItemIcon = React.forwardRef<HTMLSpanElement, MenuItemIconProps>((props, ref) => {
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
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, MenuItemIconProps> &
  FluentComponentStaticProps<MenuItemIconProps>;

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
