import { Accessibility } from '@fluentui/accessibility';
import {
  useTelemetry,
  useAccessibility,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useStyles,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import * as React from 'react';

import {
  UIComponentProps,
  ChildrenComponentProps,
  ColorComponentProps,
  ContentComponentProps,
  commonPropTypes,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';

export interface SplitButtonDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type SplitButtonDividerStylesProps = never;

export const SplitButtonDividerClassName = 'ui-splitButtonDivider';

/**
 * A SplitButtonDivider visually segments content.
 */
export const SplitButtonDivider: ComponentWithAs<'div', SplitButtonDividerProps> &
  FluentComponentStaticProps<SplitButtonDividerProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(SplitButtonDivider.displayName, context.telemetry);
  setStart();
  const { className, design, styles, variables, accessibility } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(SplitButtonDivider.handledProps, props);
  const getA11yProps = useAccessibility<never>(accessibility, {
    debugName: SplitButtonDivider.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<SplitButtonDividerStylesProps>(SplitButtonDivider.displayName, {
    className: SplitButtonDividerClassName,
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
    />
  );
  setEnd();
  return element;
};

SplitButtonDivider.displayName = 'SplitButtonDivider';

SplitButtonDivider.propTypes = {
  ...commonPropTypes.createCommon(),
};

SplitButtonDivider.handledProps = Object.keys(SplitButtonDivider.propTypes) as any;
