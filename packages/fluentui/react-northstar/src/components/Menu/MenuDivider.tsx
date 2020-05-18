import { Accessibility, menuDividerBehavior, MenuDividerBehaviorProps } from '@fluentui/accessibility';
import {
  compose,
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useTelemetry,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  ShorthandFactory,
  ShorthandConfig,
} from '../../utils';
import { ProviderContextPrepared } from '../../types';

export interface MenuDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<MenuDividerBehaviorProps>;

  vertical?: boolean;
  primary?: boolean;
  secondary?: boolean;
  inSubmenu?: boolean;
}

export type MenuDividerStylesProps = Required<Pick<MenuDividerProps, 'vertical' | 'inSubmenu' | 'primary'>> & {
  hasContent: boolean;
};

export const menuDividerClassName = 'ui-menu__divider';

/**
 * A MenuDivider is non-actionable element that visually segments items of Menu.
 */
const MenuDivider = compose<'li', MenuDividerProps, MenuDividerStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(MenuDivider.displayName, context.telemetry);
    setStart();

    const { children, content, vertical, inSubmenu, primary, className, design, styles, variables } = props;

    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: MenuDivider.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<MenuDividerStylesProps>(MenuDivider.displayName, {
      className: menuDividerClassName,
      composeOptions,
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
      unstable_props: props,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
          ...unhandledProps,
          ref,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
    setEnd();

    return element;
  },
  {
    className: menuDividerClassName,
    displayName: 'MenuDivider',

    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'variables',

      'inSubmenu',
      'primary',
      'secondary',
      'vertical',
    ],
  },
) as ComponentWithAs<'li', MenuDividerProps> & {
  create: ShorthandFactory<MenuDividerProps>;
  shorthandConfig: ShorthandConfig<MenuDividerProps>;
};

MenuDivider.defaultProps = {
  as: 'li',
  accessibility: menuDividerBehavior,
};

MenuDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
};

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' });
MenuDivider.shorthandConfig = { mappedProp: 'content' };

export default MenuDivider;
