import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
  compose,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import { mergeComponentVariables } from '@fluentui/styles';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import * as React from 'react';
import { ProviderContextPrepared } from '../../types';
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  ShorthandConfig,
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

const ToolbarDivider = compose<'div', ToolbarDividerProps, ToolbarDividerStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, className, design, styles, variables } = props;
    const parentVariables = React.useContext(ToolbarVariablesContext);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });
    const { classes } = useStyles<ToolbarDividerStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables: mergeComponentVariables(parentVariables, variables),
      }),
      rtl: context.rtl,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const element = <ElementType {...getA11yProps('root', { ref, ...unhandledProps, className: classes.root })} />;
    setEnd();

    return element;
  },
  {
    displayName: 'ToolbarDivider',
    className: toolbarDividerClassName,
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'styles', 'variables', 'design'],
  },
) as ComponentWithAs<'div', ToolbarDividerProps> & {
  create: ShorthandFactory<ToolbarDividerProps>;
  shorthandConfig: ShorthandConfig<ToolbarDividerProps>;
};
ToolbarDivider.propTypes = commonPropTypes.createCommon();

ToolbarDivider.create = createShorthandFactory({ Component: ToolbarDivider, mappedProp: 'content' });
ToolbarDivider.shorthandConfig = {
  mappedProp: 'content',
};
export default ToolbarDivider;
