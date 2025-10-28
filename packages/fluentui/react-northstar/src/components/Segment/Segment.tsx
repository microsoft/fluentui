import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ColorComponentProps,
  createShorthandFactory,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';

import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import {
  getElementType,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  wrapWithFocusZone,
  useFluentContext,
  useUnhandledProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface SegmentProps
  extends UIComponentProps<SegmentProps>,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** An segment can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean;
}

export type SegmentStylesProps = Required<Pick<SegmentProps, 'color' | 'inverted' | 'disabled'>>;

export const segmentClassName = 'ui-segment';

/**
 * A Segment visually groups related content.
 */
export const Segment = React.forwardRef<HTMLDivElement, SegmentProps>((props, ref) => {
  const context = useFluentContext();

  const { children, content, color, inverted, disabled, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Segment.handledProps, props);

  const a11yBehavior = useAccessibilityBehavior<never>(props.accessibility, {
    rtl: context.rtl,
  });

  const { classes } = useStyles<SegmentStylesProps>(Segment.displayName, {
    className: segmentClassName,
    mapPropsToStyles: () => ({
      color,
      inverted,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = wrapWithFocusZone(
    a11yBehavior,
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : Box.create(content)}
    </ElementType>,
  );

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, SegmentProps> & FluentComponentStaticProps<SegmentProps>;

Segment.displayName = 'Segment';

Segment.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
    color: true,
  }),
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
};
Segment.handledProps = Object.keys(Segment.propTypes) as any;

Segment.create = createShorthandFactory({
  Component: Segment,
});
