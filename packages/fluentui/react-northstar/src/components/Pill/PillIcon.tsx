import * as React from 'react';
import { Accessibility, pillIconBehavior } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import * as customPropTypes from '@fluentui/react-proptypes';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
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
import { FluentComponentStaticProps, ShorthandValue } from '../../types';
import { PillImageProps } from './PillImage';

export interface PillIconProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /**
   * A Pill Icon can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /**
   * A Pill Icon can represent selection state
   */
  selectable?: boolean;

  /**
   * A PillImage shorthand for the image slot.
   */
  image?: ShorthandValue<PillImageProps>;
}

export type PillIconStylesProps = Required<Pick<PillIconProps, 'size' | 'selectable'>> & {
  hasImage: boolean;
};
export const pillIconClassName = 'ui-pill__icon';

/**
 * A PillIcon allows user set an icon.
 */
export const PillIcon = React.forwardRef<HTMLSpanElement, PillIconProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(PillIcon.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, styles, variables, size, selectable, image } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: PillIcon.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillIconStylesProps>(PillIcon.displayName, {
    className: pillIconClassName,
    mapPropsToStyles: () => ({ size, selectable, hasImage: !!image }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(PillIcon.handledProps, props);

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, PillIconProps> & FluentComponentStaticProps<PillIconProps>;

PillIcon.defaultProps = {
  accessibility: pillIconBehavior,
  as: 'span' as const,
};

PillIcon.displayName = 'PillIcon';

PillIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  selectable: PropTypes.bool,
  size: PropTypes.oneOf<'small' | 'smaller' | 'medium'>(['small', 'smaller', 'medium']),
  image: customPropTypes.shorthandAllowingChildren,
};

PillIcon.handledProps = Object.keys(PillIcon.propTypes) as any;

PillIcon.shorthandConfig = {
  mappedProp: 'content',
};
