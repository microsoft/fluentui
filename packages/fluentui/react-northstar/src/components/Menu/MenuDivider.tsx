import { Accessibility, MenuDividerBehaviorProps, menuDividerBehavior } from '@fluentui/accessibility';
import {
  compose,
  ComponentWithAs,
  getElementType,
  mergeVariablesOverrides,
  useFluentContext,
  useAccessibility,
  useTelemetry,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { useContextSelectors } from '@fluentui/react-context-selector';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';
import { MenuContext, MenuDividerSubscribedValue } from './menuContext';

export interface MenuDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<MenuDividerBehaviorProps>;

  inSubmenu?: boolean;
  secondary?: boolean;
  pills?: boolean;
  pointing?: boolean | 'start' | 'end';
  primary?: boolean;
  vertical?: boolean;
}

export type MenuDividerStylesProps = Required<
  Pick<MenuDividerProps, 'vertical' | 'inSubmenu' | 'pills' | 'primary' | 'pointing' | 'secondary'>
> & {
  hasContent: boolean;
};

export const menuDividerClassName = 'ui-menu__divider';

/**
 * A MenuDivider is non-actionable element that visually segments items of Menu.
 */
export const MenuDivider = compose<'li', MenuDividerProps, MenuDividerStylesProps, {}, {}>(
  (inputProps, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const parentProps = (useContextSelectors(MenuContext, {
      variables: v => v.variables,
      slotProps: v => v.slotProps.divider,
      accessibility: v => v.behaviors.divider,
    }) as unknown) as MenuDividerSubscribedValue; // TODO: we should improve typings for the useContextSelectors

    const props = {
      ...parentProps.slotProps,
      accessibility: parentProps.accessibility,
      variables: parentProps.variables,
      ...inputProps,
    };

    const {
      accessibility = menuDividerBehavior,
      children,
      content,
      vertical,
      inSubmenu,
      pills,
      pointing,
      primary,
      className,
      design,
      styles,
      secondary,
      variables,
    } = props;

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<MenuDividerStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        hasContent: !!content || !!children,
        pills,
        pointing,
        vertical,
        inSubmenu,
        primary,
        secondary,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergeVariablesOverrides(variables, parentProps.variables),
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

      'pointing',
      'inSubmenu',
      'primary',
      'secondary',
      'vertical',
    ],
    shorthandConfig: { mappedProp: 'content' },
  },
) as ComponentWithAs<'li', MenuDividerProps> & {
  create: ShorthandFactory<MenuDividerProps>;
};

MenuDivider.defaultProps = {
  as: 'li',
};

MenuDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
  pointing: PropTypes.oneOf(['start', 'end', true, false]),
};

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' });
