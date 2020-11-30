import { Accessibility, toolbarMenuDividerBehavior, ToolbarMenuDividerBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  mergeVariablesOverrides,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  compose,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import * as React from 'react';

import { ChildrenComponentProps, ContentComponentProps, UIComponentProps, commonPropTypes } from '../../utils';
import { ToolbarVariablesContext } from './toolbarVariablesContext';

export interface ToolbarMenuDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<ToolbarMenuDividerBehaviorProps>;
}

export type ToolbarMenuDividerStylesProps = never;
export const toolbarMenuDividerClassName = 'ui-toolbar__menudivider';

/**
 * A ToolbarMenuDivider adds non-actionable separator between items of ToolbarMenu.
 */
export const ToolbarMenuDivider = compose<'li', ToolbarMenuDividerProps, ToolbarMenuDividerStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, className, design, styles, variables } = props;
    const parentVariables = React.useContext(ToolbarVariablesContext);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarMenuDividerStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergeVariablesOverrides(parentVariables, variables),
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const element = <ElementType {...getA11yProps('root', { ...unhandledProps, className: classes.root, ref })} />;
    setEnd();

    return element;
  },
  {
    className: toolbarMenuDividerClassName,
    displayName: 'ToolbarMenuDivider',

    shorthandConfig: { mappedProp: 'content' },
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables'],
  },
) as ComponentWithAs<'li', ToolbarMenuDividerProps>;

ToolbarMenuDivider.propTypes = commonPropTypes.createCommon();
ToolbarMenuDivider.defaultProps = {
  as: 'li',
  accessibility: toolbarMenuDividerBehavior,
};
