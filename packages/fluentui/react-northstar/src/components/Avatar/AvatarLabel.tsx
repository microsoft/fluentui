import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';
import { labelClassName } from '../Label/Label';
import { AvatarSizeValue } from './Avatar';

export interface AvatarLabelProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** The AvatarLabel can have a square shape. */
  square?: boolean;

  /** The AvatarLabel can be circular. */
  circular?: boolean;

  /** Size multiplier. */
  size?: AvatarSizeValue;
}

export type AvatarLabelStylesProps = Pick<AvatarLabelProps, 'size' | 'square' | 'circular'>;
export const avatarlabelClassName = labelClassName;

/**
 * A AvatarLabel allows user to classify content.
 */
export const AvatarLabel = React.forwardRef<HTMLSpanElement, AvatarLabelProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarLabel.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, styles, variables, square, size, circular } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: AvatarLabel.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<AvatarLabelStylesProps>(AvatarLabel.displayName, {
    className: avatarlabelClassName,
    mapPropsToStyles: () => ({
      square,
      size,
      circular,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarLabel.handledProps, props);

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, AvatarLabelProps> &
  FluentComponentStaticProps<AvatarLabelProps>;

AvatarLabel.displayName = 'AvatarLabel';

AvatarLabel.propTypes = {
  ...commonPropTypes.createCommon(),
  square: PropTypes.bool,
  size: customPropTypes.size,
  circular: PropTypes.bool,
};
AvatarLabel.handledProps = Object.keys(AvatarLabel.propTypes) as any;

AvatarLabel.defaultProps = {
  as: 'span',
};

AvatarLabel.shorthandConfig = {
  mappedProp: 'content',
};
