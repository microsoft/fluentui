import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Accessibility } from '@fluentui/accessibility';
import {
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
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

  const { className, design, styles, variables, accessibility } = props;
  const ElementType = getElementType(props);
  const { primary } = props;
  const unhandledProps = useUnhandledProps(SplitButtonDivider.handledProps, props);
  const a11yBehavior = useAccessibilityBehavior<never>(accessibility, {
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
      {...useAccessibilitySlotProps(a11yBehavior, 'root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
    />
  );

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, SplitButtonDividerProps> &
  FluentComponentStaticProps<SplitButtonDividerProps>;

SplitButtonDivider.displayName = 'SplitButtonDivider';

SplitButtonDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
};

SplitButtonDivider.handledProps = Object.keys(SplitButtonDivider.propTypes) as any;
