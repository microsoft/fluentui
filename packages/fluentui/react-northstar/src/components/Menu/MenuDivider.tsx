import { Accessibility, menuDividerBehavior } from '@fluentui/accessibility';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps, ProviderContextPrepared } from '../../types';
import { useTelemetry, getElementType, useUnhandledProps, useAccessibility, useStyles } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface MenuDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  vertical?: boolean;
  primary?: boolean;
  secondary?: boolean;
  inSubmenu?: boolean;
}

export const menuDividerClassName = 'ui-menu__divider';

export type MenuDividerStylesProps = Required<Pick<MenuDividerProps, 'vertical' | 'inSubmenu' | 'primary'>> & {
  hasContent: boolean;
};

export const MenuDivider: React.FC<WithAsProp<MenuDividerProps>> &
  FluentComponentStaticProps<MenuDividerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(MenuDivider.displayName, context.telemetry);
  setStart();
  const { children, content, vertical, inSubmenu, primary, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(MenuDivider.handledProps, props);

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: MenuDivider.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<MenuDividerStylesProps>(MenuDivider.displayName, {
    className: menuDividerClassName,
    mapPropsToStyles: () => ({
      hasContent: !!content,
      vertical,
      inSubmenu,
      primary,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
};

MenuDivider.displayName = 'MenuDivider';

MenuDivider.defaultProps = {
  as: 'li',
  accessibility: menuDividerBehavior as Accessibility,
};

MenuDivider.handledProps = Object.keys(MenuDivider.propTypes) as any;

MenuDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
};

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' });

/**
 * A MenuDivider is non-actionable element that visually segments items of Menu.
 */
export default withSafeTypeForAs<typeof MenuDivider, MenuDividerProps, 'li'>(MenuDivider);
