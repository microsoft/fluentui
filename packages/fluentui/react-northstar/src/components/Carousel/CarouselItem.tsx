import * as React from 'react';
import * as PropTypes from 'prop-types';
import { carouselItemBehavior, CarouselItemBehaviorProps, Accessibility } from '@fluentui/accessibility';

import {
  commonPropTypes,
  UIComponentProps,
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../utils';

import { screenReaderContainerStyles } from '../../utils/accessibility/Styles/accessibilityStyles';
import { FluentComponentStaticProps } from '../../types';
import {
  useAccessibility,
  useTelemetry,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface CarouselItemSlotClassNames {
  itemPositionText: string;
}

export interface CarouselItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<CarouselItemBehaviorProps>;

  /** Whether or not the item is in view or not. */
  active?: boolean;

  /**
   * Text to be added in the DOM that will specify item position. To be picked
   * up by screen readers.
   */
  itemPositionText?: string;

  /** Whether or not navigation exists in carousel. */
  navigation?: boolean;
}

export type CarouselItemStylesProps = never;

export const carouselItemClassName = 'ui-carousel__item';
export const carouselItemSlotClassNames: CarouselItemSlotClassNames = {
  itemPositionText: `${carouselItemClassName}__itemPositionText`,
};

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CarouselItem.displayName, context.telemetry);
  setStart();
  const unhandledProps = useUnhandledProps(CarouselItem.handledProps, props);
  const {
    accessibility,
    navigation,
    active,
    children,
    itemPositionText,
    content,
    className,
    design,
    styles,
    variables,
  } = props;
  const ElementType = getElementType(props);
  const getA11yProps = useAccessibility<CarouselItemBehaviorProps>(accessibility, {
    debugName: CarouselItem.displayName,
    actionHandlers: {
      arrowKeysNavigationStopPropagation: e => {
        // let event propagate, when it was invoke on the element where arrow keys should rotate carousel
        if (e.currentTarget !== e.target) {
          e.stopPropagation();
        }
      },
    },
    mapPropsToBehavior: () => ({
      navigation,
      active,
    }),
  });

  const { classes } = useStyles<CarouselItemStylesProps>(CarouselItem.displayName, {
    className: carouselItemClassName,
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
    >
      {childrenExist(children) ? children : content}
      <div className={carouselItemSlotClassNames.itemPositionText} style={screenReaderContainerStyles}>
        {itemPositionText}
      </div>
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CarouselItemProps> &
  FluentComponentStaticProps<CarouselItemProps>;

CarouselItem.displayName = 'CarouselItem';

CarouselItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  navigation: PropTypes.bool,
  itemPositionText: PropTypes.string,
};

CarouselItem.defaultProps = {
  accessibility: carouselItemBehavior,
};

CarouselItem.handledProps = Object.keys(CarouselItem.propTypes) as any;

CarouselItem.create = createShorthandFactory({ Component: CarouselItem, mappedProp: 'content' });
