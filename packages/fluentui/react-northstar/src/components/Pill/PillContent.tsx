import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useFluentContext,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  SizeValue,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';

export interface PillContentProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /**
   * A Pill can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /**
   * A Pill can be actionable.
   */
  actionable?: boolean;
}

export type PillContentStylesProps = Required<Pick<PillContentProps, 'size' | 'actionable'>>;
export const pillContentClassName = 'ui-pillcontent';

/**
 * A PillContent allows user to classify content.
 */
export const PillContent = React.forwardRef<HTMLSpanElement, PillContentProps>((props, ref) => {
  const context = useFluentContext();

  const { accessibility, children, className, content, design, styles, variables, size, actionable } = props;

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillContentStylesProps>(PillContent.displayName, {
    className: pillContentClassName,
    mapPropsToStyles: () => ({ size, actionable }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props, 'span');
  const unhandledProps = useUnhandledProps(PillContent.handledProps, props);

  const element = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, PillContentProps> &
  FluentComponentStaticProps<PillContentProps>;

PillContent.displayName = 'PillContent';

PillContent.propTypes = {
  ...commonPropTypes.createCommon(),
  actionable: PropTypes.bool,
};

PillContent.handledProps = Object.keys(PillContent.propTypes) as any;

PillContent.shorthandConfig = {
  mappedProp: 'content',
};
