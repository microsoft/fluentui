import { Accessibility } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { mergeComponentVariables } from '@fluentui/styles';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import * as React from 'react';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
} from '../../utils';
import { ToolbarVariablesContext } from './toolbarVariablesContext';

export interface ToolbarDividerProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type ToolbarDividerStylesProps = never;
export const toolbarDividerClassName = 'ui-toolbar__divider';

const ToolbarDivider: React.FC<WithAsProp<ToolbarDividerProps>> &
  FluentComponentStaticProps<ToolbarDividerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ToolbarDivider.displayName, context.telemetry);
  setStart();

  const { accessibility, className, design, styles, variables } = props;
  const parentVariables = React.useContext(ToolbarVariablesContext);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: ToolbarDivider.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<ToolbarDividerStylesProps>(ToolbarDivider.displayName, {
    className: toolbarDividerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables: mergeComponentVariables(parentVariables, variables),
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ToolbarDivider.handledProps, props);

  const element = <ElementType {...getA11yProps('root', { ...unhandledProps, className: classes.root })} />;
  setEnd();

  return element;
};

ToolbarDivider.displayName = 'ToolbarDivider';

ToolbarDivider.propTypes = commonPropTypes.createCommon();
ToolbarDivider.handledProps = Object.keys(ToolbarDivider.propTypes) as any;

ToolbarDivider.create = createShorthandFactory({ Component: ToolbarDivider, mappedProp: 'content' });

/**
 * A ToolbarDivider is a non-actionable element that visually segments Toolbar items.
 */
export default withSafeTypeForAs<typeof ToolbarDivider, ToolbarDividerProps>(ToolbarDivider);
