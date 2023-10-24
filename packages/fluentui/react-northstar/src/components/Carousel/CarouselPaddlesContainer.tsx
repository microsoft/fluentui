import * as React from 'react';
import {
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import {
  commonPropTypes,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  childrenExist,
} from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';

export interface CarouselPaddlesContainerProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}

export type CarouselPaddlesContainerStylesProps = never;
export const carouselPaddlesContainerClassName = 'ui-carrouselpaddles_container';

/**
 * A CarouselPaddlesContainer is a container for the Carousel Paddles.
 */
export const CarouselPaddlesContainer = React.forwardRef<HTMLDivElement, CarouselPaddlesContainerProps>(
  (props, ref) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(CarouselPaddlesContainer.displayName, context.telemetry);
    setStart();

    const { className, children, design, styles, variables, content } = props;

    const { classes } = useStyles<CarouselPaddlesContainerStylesProps>(CarouselPaddlesContainer.displayName, {
      className: carouselPaddlesContainerClassName,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const getA11Props = useAccessibility(props.accessibility, {
      debugName: CarouselPaddlesContainer.displayName,
      rtl: context.rtl,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(CarouselPaddlesContainer.handledProps, props);

    const element = (
      <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
        {childrenExist(children) ? children : content}
      </ElementType>
    );
    setEnd();

    return element;
  },
) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CarouselPaddlesContainerProps> &
  FluentComponentStaticProps<CarouselPaddlesContainerProps>;

CarouselPaddlesContainer.displayName = 'CarouselPaddlesContainer';
CarouselPaddlesContainer.propTypes = {
  ...commonPropTypes.createCommon(),
};

CarouselPaddlesContainer.handledProps = Object.keys(CarouselPaddlesContainer.propTypes) as any;

CarouselPaddlesContainer.shorthandConfig = {
  mappedProp: 'content',
};
