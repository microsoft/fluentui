import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Accessibility } from '@fluentui/accessibility';
import {
  useTelemetry,
  useAccessibility,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

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

  /** A split button divider can be formatted to show different levels of emphasis. */
  primary?: boolean;
}

export type SplitButtonDividerStylesProps = Required<Pick<SplitButtonDividerProps, 'primary'>>;

export const SplitButtonDividerClassName = 'ui-splitButtonDivider';

/**
 * A SplitButtonDivider visually segments content.
 */
export const SplitButtonDivider = React.forwardRef<HTMLDivElement, SplitButtonDividerProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(SplitButtonDivider.displayName, context.telemetry);
  setStart();
  const { className, design, styles, variables, accessibility } = props;
  const ElementType = getElementType(props);
  const { primary } = props;
  const unhandledProps = useUnhandledProps(SplitButtonDivider.handledProps, props);
  const getA11yProps = useAccessibility<never>(accessibility, {
    debugName: SplitButtonDivider.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<SplitButtonDividerStylesProps>(SplitButtonDivider.displayName, {
    className: SplitButtonDividerClassName,
    mapPropsToStyles: () => ({
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
        ref,
        ...unhandledProps,
      })}
    />
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, SplitButtonDividerProps> &
  FluentComponentStaticProps<SplitButtonDividerProps>;

SplitButtonDivider.displayName = 'SplitButtonDivider';

SplitButtonDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
};

SplitButtonDivider.handledProps = Object.keys(SplitButtonDivider.propTypes) as any;
