import { Accessibility } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { mergeComponentVariables } from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
} from '../../utils';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ToolbarVariablesContext } from './toolbarVariablesContext';

export interface ToolbarMenuDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type ToolbarMenuDividerStylesProps = never;
export const toolbarMenuDividerClassName = 'ui-toolbar__menudivider';

const ToolbarMenuDivider: React.FC<WithAsProp<ToolbarMenuDividerProps>> &
  FluentComponentStaticProps<ToolbarMenuDividerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarMenuDivider.displayName, context.telemetry);
  setStart();

  const { accessibility, className, design, styles, variables } = props;
  const parentVariables = React.useContext(ToolbarVariablesContext);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarMenuDivider.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<ToolbarMenuDividerStylesProps>(ToolbarMenuDivider.displayName, {
    className: toolbarMenuDividerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables: mergeComponentVariables(parentVariables, variables),
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ToolbarMenuDivider.handledProps, props);

  const element = <ElementType {...getA11yProps('root', { ...unhandledProps, className: classes.root })} />;
  setEnd();

  return element;
};

ToolbarMenuDivider.displayName = 'ToolbarMenuDivider';

ToolbarMenuDivider.propTypes = commonPropTypes.createCommon();
ToolbarMenuDivider.defaultProps = {
  as: 'li',
};
ToolbarMenuDivider.handledProps = Object.keys(ToolbarMenuDivider.propTypes) as any;

ToolbarMenuDivider.create = createShorthandFactory({
  Component: ToolbarMenuDivider,
  mappedProp: 'content',
});

/**
 * A ToolbarMenuDivider adds non-actionable separator between items of ToolbarMenu.
 */
export default withSafeTypeForAs<typeof ToolbarMenuDivider, ToolbarMenuDividerProps, 'li'>(ToolbarMenuDivider);
