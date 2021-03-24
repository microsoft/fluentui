import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
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
}

export type PillContentStylesProps = Required<Pick<PillContentProps, 'size'>>;
export const pillContentClassName = 'ui-pillcontent';

/**
 * A PillContent allows user to classify content.
 */
export const PillContent: ComponentWithAs<'span', PillContentProps> &
  FluentComponentStaticProps<PillContentProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(PillContent.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, styles, variables, size } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: PillContent.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillContentStylesProps>(PillContent.displayName, {
    className: pillContentClassName,
    mapPropsToStyles: () => ({ size }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(PillContent.handledProps, props);

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
};

PillContent.displayName = 'PillContent';

PillContent.propTypes = {
  ...commonPropTypes.createCommon(),
};

PillContent.handledProps = Object.keys(PillContent.propTypes) as any;

PillContent.defaultProps = {
  as: 'span',
};

PillContent.shorthandConfig = {
  mappedProp: 'content',
};
