import { Accessibility, buttonBehavior, ButtonBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ContentComponentProps,
} from '../../utils';

import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import {
  getElementType,
  useFluentContext,
  useAccessibility,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { Box, BoxProps } from '../Box/Box';

export interface CarouselPaddleProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>>,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ButtonBehaviorProps>;

  /** A paddle can show that it cannot be interacted with. */
  disabled?: boolean;

  /** Indicates whether the paddle should be hidden. */
  hidden?: boolean;

  /**
   * Called after a user clicks the paddle.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<CarouselPaddleProps>;

  /** A paddle can indicate that it slides to the next item. */
  next?: boolean;

  /** A paddle can indicate that it slides to the previous item. */
  previous?: boolean;

  /** A navigation may be clickable */
  disableClickableNav?: boolean;
}

export type CarouselPaddleSlotClassNames = {
  content: string;
};

export type CarouselPaddleStylesProps = Pick<
  CarouselPaddleProps,
  'disabled' | 'next' | 'previous' | 'hidden' | 'disableClickableNav'
>;
export const carouselPaddleClassName = 'ui-carousel__paddle';
export const carouselPaddleSlotClassNames: CarouselPaddleSlotClassNames = {
  content: `${carouselPaddleClassName}__content`,
};

/**
 * A CarouselPaddle allows users to customize the paddles inside the Carousel component.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
export const CarouselPaddle = React.forwardRef<HTMLButtonElement, CarouselPaddleProps & { as: React.ReactNode }>(
  (props, ref) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(CarouselPaddle.displayName, context.telemetry);
    setStart();

    const {
      accessibility,
      as,
      children,
      className,
      content,
      disabled,
      design,
      hidden,
      next,
      previous,
      styles,
      variables,
      disableClickableNav,
    } = props;

    const hasChildren = childrenExist(children);

    const getA11Props = useAccessibility(accessibility, {
      debugName: CarouselPaddle.displayName,
      mapPropsToBehavior: () => ({
        as: String(as),
        disabled,
      }),
      actionHandlers: {
        performClick: event => {
          event.preventDefault();
          handleClick(event);
        },
      },
      rtl: context.rtl,
    });
    const { classes, styles: resolvedStyles } = useStyles<CarouselPaddleStylesProps>(CarouselPaddle.displayName, {
      className: carouselPaddleClassName,
      mapPropsToStyles: () => ({
        disabled,
        hidden,
        next,
        previous,
        disableClickableNav,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const unhandledProps = useUnhandledProps(CarouselPaddle.handledProps, props);
    const ElementType = getElementType(props);

    const handleClick = (e: React.SyntheticEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const result = (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...getA11Props('root', {
          onClick: handleClick,
          disabled,
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {hasChildren
          ? children
          : Box.create(content, {
              defaultProps: () =>
                getA11Props('content', {
                  as: 'span',
                  className: carouselPaddleSlotClassNames.content,
                  styles: resolvedStyles.content,
                }),
            })}
      </ElementType>
    );

    setEnd();

    return result;
  },
) as unknown as ForwardRefWithAs<'button', HTMLButtonElement, CarouselPaddleProps> &
  FluentComponentStaticProps<CarouselPaddleProps>;

CarouselPaddle.defaultProps = {
  as: 'button',
  accessibility: buttonBehavior,
  content: {},
};

CarouselPaddle.displayName = 'CarouselPaddle';

CarouselPaddle.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  next: customPropTypes.every([customPropTypes.disallow(['previous']), PropTypes.bool]),
  previous: customPropTypes.every([customPropTypes.disallow(['next']), PropTypes.bool]),
  disableClickableNav: PropTypes.bool,
};

CarouselPaddle.handledProps = Object.keys(CarouselPaddle.propTypes) as any;

CarouselPaddle.create = createShorthandFactory({ Component: CarouselPaddle, mappedProp: 'content' });
