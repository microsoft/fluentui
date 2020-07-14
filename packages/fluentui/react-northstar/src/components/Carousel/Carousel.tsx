import * as customPropTypes from '@fluentui/react-proptypes';
import { Accessibility, carouselBehavior, CarouselBehaviorProps } from '@fluentui/accessibility';
import * as React from 'react';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { Ref } from '@fluentui/react-component-ref';
import { Animation } from '../Animation/Animation';

import {
  UIComponentProps,
  createShorthandFactory,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  isFromKeyboard as isEventFromKeyboard,
} from '../../utils';
import { ShorthandCollection, ShorthandValue, ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import { CarouselItem, CarouselItemProps } from './CarouselItem';
import { Text } from '../Text/Text';
import { CarouselNavigation, CarouselNavigationProps } from './CarouselNavigation';
import { CarouselNavigationItem, CarouselNavigationItemProps } from './CarouselNavigationItem';
import { CarouselPaddle, CarouselPaddleProps } from './CarouselPaddle';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  useStateManager,
} from '@fluentui/react-bindings';
import { createCarouselManager, CarouselState, CarouselActions } from '@fluentui/state';

export interface CarouselSlotClassNames {
  itemsContainer: string;
  paddleNext: string;
  paddlePrevious: string;
  pagination: string;
  navigation: string;
}

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuAsToolbarBehavior, tabListBehavior, tabBehavior
   */
  accessibility?: Accessibility<CarouselBehaviorProps>;

  /** Index of the currently active item. */
  activeIndex?: number;

  /**
   * Sets the aria-roledescription attribute.
   */
  ariaRoleDescription?: string;

  /**
   * Sets the aria-label attribute for carousel.
   */
  ariaLabel?: string;

  /** Specifies if the process of switching slides is circular. */
  circular?: boolean;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number;

  /**
   * Message generator for item position in the carousel. Used to generate the
   * text for pagination. Also generates invisible text content for each item
   * which is added along with the slide content. These are used by the screen
   * reader to narrate position when active item is changed.
   */
  getItemPositionText?: (index: number, size: number) => string;

  /** Shorthand array of props for CarouselItem. */
  items?: ShorthandCollection<CarouselItemProps>;

  thumbnails?: boolean;

  /** Shorthand array of props for the buttons of the CarouselNavigation. */
  navigation?: ShorthandValue<CarouselNavigationProps> | ShorthandCollection<CarouselNavigationItemProps>;

  /**
   * A Carousel can position its navigation below the content by default,
   * above the content, to the start or to the end of the content.
   */
  navigationPosition?: 'below' | 'above' | 'start' | 'end';

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All Carousel props.
   */
  onActiveIndexChange?: ComponentEventHandler<CarouselProps>;

  /** Shorthand for the paddle that navigates to the next item. */
  paddleNext?: ShorthandValue<CarouselPaddleProps>;

  /**
   * A Carousel can position its paddels inside the content, outside or inline
   * with the navigation component.
   */
  paddlesPosition?: 'inside' | 'outside' | 'inline';

  /** Shorthand for the paddle that navigates to the previous item. */
  paddlePrevious?: ShorthandValue<CarouselPaddleProps>;
}

export type CarouselStylesProps = { isFromKeyboard: boolean; shouldFocusContainer: boolean };

export const carouselClassName = 'ui-carousel';
export const carouselSlotClassNames: CarouselSlotClassNames = {
  itemsContainer: `${carouselClassName}__itemscontainer`,
  paddleNext: `${carouselClassName}__paddlenext`,
  paddlePrevious: `${carouselClassName}__paddleprevious`,
  pagination: `${carouselClassName}__pagination`,
  navigation: `${carouselClassName}__navigation`,
};

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 * @accessibilityIssues
 * [VoiceOver doens't narrate label referenced by aria-labelledby attribute, when role is "tabpanel"](https://bugs.chromium.org/p/chromium/issues/detail?id=1040924)
 */
export const Carousel: ComponentWithAs<'div', CarouselProps> &
  FluentComponentStaticProps<CarouselProps> & {
    Item: typeof CarouselItem;
    Navigation: typeof CarouselNavigation;
    NavigationItem: typeof CarouselNavigationItem;
    Paddle: typeof CarouselPaddle;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Carousel.displayName, context.telemetry);
  setStart();
  const {
    accessibility,
    items,
    circular,
    getItemPositionText,
    paddlePrevious,
    paddleNext,
    navigation,
    thumbnails,
    children,
    ariaRoleDescription,
    ariaLabel,
    className,
    design,
    styles,
    variables,
  } = props;

  const ElementType = getElementType(props);

  const { state, actions } = useStateManager<CarouselState, CarouselActions>(createCarouselManager, {
    mapPropsToInitialState: () => ({
      activeIndex: props.defaultActiveIndex,
    }),
    mapPropsToState: () => ({
      activeIndex: props.activeIndex,
    }),
  });

  const { prevActiveIndex, ariaLiveOn, shouldFocusContainer, isFromKeyboard, activeIndex } = state;

  const itemRefs = React.useMemo<React.RefObject<HTMLElement>[]>(
    () => Array.from({ length: items?.length }, () => React.createRef()),
    // As we are using "panels.length" it's fine to have dependency on them
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items?.length],
  );

  const unhandledProps = useUnhandledProps(Carousel.handledProps, props);
  const getA11yProps = useAccessibility<CarouselBehaviorProps>(accessibility, {
    debugName: Carousel.displayName,
    actionHandlers: {
      showNextSlideByKeyboardNavigation: e => {
        e.preventDefault();
        showNextSlide(e, true);
      },
      showPreviousSlideByKeyboardNavigation: e => {
        e.preventDefault();
        showPreviousSlide(e, true);
      },
      showNextSlideByPaddlePress: e => {
        e.preventDefault();
        showNextSlide(e, false);
        handleNextPaddleFocus();
      },
      showPreviousSlideByPaddlePress: e => {
        e.preventDefault();
        showPreviousSlide(e, false);
        handlePreviousPaddleFocus();
      },
    },
    mapPropsToBehavior: () => ({
      navigation,
      ariaLiveOn,
      ariaRoleDescription,
      ariaLabel,
    }),
  });

  const { classes } = useStyles<CarouselStylesProps>(Carousel.displayName, {
    className: carouselClassName,
    mapPropsToStyles: () => ({
      shouldFocusContainer,
      isFromKeyboard,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const paddleNextRef = React.useRef<HTMLElement>();
  const paddlePreviousRef = React.useRef<HTMLElement>();

  const focusItemAtIndex = React.useMemo(
    () =>
      _.debounce((index: number) => {
        itemRefs[index].current?.focus();
      }, 400),
    [itemRefs],
  );

  React.useEffect(() => {
    return () => {
      focusItemAtIndex.cancel();
    };
  }, [focusItemAtIndex, items]);

  const setActiveIndex = (e: React.SyntheticEvent, index: number, focusItem: boolean): void => {
    const lastItemIndex = items.length - 1;
    let nextActiveIndex = index;
    const lastActiveIndex = state.activeIndex;

    if (index < 0) {
      if (!circular) {
        return;
      }
      nextActiveIndex = lastItemIndex;
    }

    if (index > lastItemIndex) {
      if (!circular) {
        return;
      }
      nextActiveIndex = 0;
    }

    actions.setIndexes(nextActiveIndex, lastActiveIndex);

    _.invoke(props, 'onActiveIndexChange', e, props);

    if (focusItem) {
      focusItemAtIndex(nextActiveIndex);
    }
  };

  const overrideItemProps = predefinedProps => ({
    onFocus: (e, itemProps) => {
      actions.setShouldFocusContainer(e.currentTarget === e.target);
      actions.setIsFromKeyboard(isEventFromKeyboard());
      _.invoke(predefinedProps, 'onFocus', e, itemProps);
    },
    onBlur: (e, itemProps) => {
      actions.setShouldFocusContainer(e.currentTarget.contains(e.relatedTarget));
      actions.setIsFromKeyboard(false);
      _.invoke(predefinedProps, 'onBlur', e, itemProps);
    },
  });

  const renderContent = () => {
    return (
      <div
        {...getA11yProps('itemsContainerWrapper', {
          className: classes.itemsContainerWrapper,
        })}
      >
        <div
          {...getA11yProps('itemsContainer', {
            className: cx(carouselSlotClassNames.itemsContainer, classes.itemsContainer),
          })}
        >
          {items &&
            items.map((item, index) => {
              const itemRef = itemRefs[index];
              const active = activeIndex === index;
              let slideToNext = prevActiveIndex < activeIndex;

              const initialMounting = prevActiveIndex === -1;

              if (circular && prevActiveIndex === items.length - 1 && activeIndex === 0) {
                slideToNext = true;
              } else if (circular && prevActiveIndex === 0 && activeIndex === items.length - 1) {
                slideToNext = false;
              }

              return (
                <Animation
                  key={item['key'] || index}
                  mountOnEnter
                  unmountOnExit
                  visible={active}
                  name={
                    initialMounting || !active
                      ? ''
                      : slideToNext
                      ? 'carousel-slide-to-next-enter'
                      : 'carousel-slide-to-previous-enter'
                  }
                >
                  <Ref innerRef={itemRef}>
                    {CarouselItem.create(item, {
                      defaultProps: () => ({
                        active,
                        navigation: !!navigation,
                        ...(getItemPositionText && {
                          itemPositionText: getItemPositionText(index, items.length),
                        }),
                      }),
                      overrideProps: overrideItemProps,
                    })}
                  </Ref>
                </Animation>
              );
            })}
        </div>
      </div>
    );
  };

  const handleNextPaddleFocus = () => {
    // if 'next' paddle will disappear, will focus 'previous' one.
    if (!navigation && activeIndex >= props.items.length - 2 && !circular) {
      paddlePreviousRef.current.focus();
    }
  };

  const handlePreviousPaddleFocus = () => {
    // if 'previous' paddle will disappear, will focus 'next' one.
    if (!navigation && activeIndex <= 1 && !circular) {
      paddleNextRef.current.focus();
    }
  };

  const showPreviousSlide = (e: React.SyntheticEvent, focusItem: boolean) => {
    setActiveIndex(e, +activeIndex - 1, focusItem);
  };

  const showNextSlide = (e: React.SyntheticEvent, focusItem: boolean) => {
    setActiveIndex(e, +activeIndex + 1, focusItem);
  };

  const handlePaddleOverrides = (predefinedProps: CarouselPaddleProps, paddleName: string) => ({
    onClick: (e: React.SyntheticEvent, paddleProps: CarouselPaddleProps) => {
      _.invoke(predefinedProps, 'onClick', e, paddleProps);
      if (paddleName === 'paddleNext') {
        showNextSlide(e, false);
        handleNextPaddleFocus();
      } else if (paddleName === 'paddlePrevious') {
        showPreviousSlide(e, false);
        handlePreviousPaddleFocus();
      }
    },
    onBlur: (e: React.FocusEvent, paddleProps: CarouselPaddleProps) => {
      if (e.relatedTarget !== paddleNextRef.current) {
        actions.setAriaLiveOn(false);
      }
    },
    onFocus: (e: React.SyntheticEvent, paddleProps: CarouselPaddleProps) => {
      _.invoke(predefinedProps, 'onFocus', e, paddleProps);
      actions.setAriaLiveOn(true);
    },
  });

  const renderPaddles = () => {
    return (
      <>
        <Ref innerRef={paddlePreviousRef}>
          {CarouselPaddle.create(paddlePrevious, {
            defaultProps: () =>
              getA11yProps('paddlePrevious', {
                className: carouselSlotClassNames.paddlePrevious,
                previous: true,
                hidden: items !== undefined && !circular && activeIndex === 0,
              }),
            overrideProps: (predefinedProps: CarouselPaddleProps) =>
              handlePaddleOverrides(predefinedProps, 'paddlePrevious'),
          })}
        </Ref>
        <Ref innerRef={paddleNextRef}>
          {CarouselPaddle.create(paddleNext, {
            defaultProps: () =>
              getA11yProps('paddleNext', {
                className: carouselSlotClassNames.paddleNext,
                next: true,
                hidden: items !== undefined && !circular && activeIndex === items.length - 1,
              }),
            overrideProps: (predefinedProps: CarouselPaddleProps) =>
              handlePaddleOverrides(predefinedProps, 'paddleNext'),
          })}
        </Ref>
      </>
    );
  };

  const renderNavigation = () => {
    if (!items || !items.length) {
      return null;
    }

    return navigation ? (
      CarouselNavigation.create(navigation, {
        defaultProps: () => ({
          className: carouselSlotClassNames.navigation,
          iconOnly: true,
          activeIndex,
          thumbnails,
        }),
        overrideProps: (predefinedProps: CarouselNavigationItemProps) => ({
          onItemClick: (e: React.SyntheticEvent, itemProps: CarouselNavigationItemProps) => {
            const { index } = itemProps;

            setActiveIndex(e, index, true);

            _.invoke(predefinedProps, 'onClick', e, itemProps);
          },
        }),
      })
    ) : getItemPositionText ? (
      <Text
        aria-hidden="true"
        className={carouselSlotClassNames.pagination}
        content={getItemPositionText(+activeIndex, items.length)}
      />
    ) : null;
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? (
        children
      ) : (
        <>
          {renderContent()}
          {renderPaddles()}
          {renderNavigation()}
        </>
      )}
    </ElementType>
  );
  setEnd();
  return element;
};

Carousel.displayName = 'Carousel';

Carousel.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeIndex: PropTypes.number,
  ariaRoleDescription: PropTypes.string,
  ariaLabel: PropTypes.string,
  circular: PropTypes.bool,
  defaultActiveIndex: PropTypes.number,
  getItemPositionText: PropTypes.func,
  items: customPropTypes.collectionShorthand,
  navigation: PropTypes.oneOfType([customPropTypes.collectionShorthand, customPropTypes.itemShorthand]),
  navigationPosition: PropTypes.oneOf(['below', 'above', 'start', 'end']),
  onActiveIndexChange: PropTypes.func,
  paddleNext: customPropTypes.itemShorthand,
  paddlesPosition: PropTypes.oneOf(['inside', 'outside', 'inline']),
  paddlePrevious: customPropTypes.itemShorthand,
  thumbnails: PropTypes.bool,
};

Carousel.defaultProps = {
  accessibility: carouselBehavior,
  paddlePrevious: {},
  paddleNext: {},
};

Carousel.Item = CarouselItem;
Carousel.Navigation = CarouselNavigation;
Carousel.NavigationItem = CarouselNavigationItem;
Carousel.Paddle = CarouselPaddle;

Carousel.handledProps = Object.keys(Carousel.propTypes) as any;

Carousel.create = createShorthandFactory({
  Component: Carousel,
  mappedArrayProp: 'items',
});
