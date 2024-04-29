import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import { Accessibility, tabBehavior, TabBehaviorProps } from '@fluentui/accessibility';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../utils';

import { ShorthandValue, ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import {
  useTelemetry,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface CarouselNavigationItemSlotClassNames {
  indicator: string;
  content: string;
}

export interface CarouselNavigationItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<TabBehaviorProps>;

  /** A menu item can be active. */
  active?: boolean;

  /** Indicator for the Carousel Navigation Item. */
  indicator?: ShorthandValue<BoxProps>;

  /** A Carousel Navigation may have just icons. */
  iconOnly?: boolean;

  /** CarouselNavigationIntem index inside CarouselNavigation. */
  index?: number;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<CarouselNavigationItemProps>;

  /** The carousel navigation item can have primary type. */
  primary?: boolean;

  /** The carousel navigation item can have secondary type. */
  secondary?: boolean;

  /** A vertical carousel navigation displays elements vertically. */
  vertical?: boolean;

  thumbnails?: boolean;

  /** A navigation may be clickable */
  disableClickableNav?: boolean;
}

export type CarouselNavigationItemStylesProps = Required<
  Pick<
    CarouselNavigationItemProps,
    'thumbnails' | 'vertical' | 'active' | 'iconOnly' | 'primary' | 'disableClickableNav'
  >
> & {
  hasContent: boolean;
  hasIndicator: boolean;
};

export const carouselNavigationItemClassName = 'ui-carousel__navigationitem';
export const carouselNavigationItemSlotClassNames: CarouselNavigationItemSlotClassNames = {
  indicator: `${carouselNavigationItemClassName}__indicator`,
  content: `${carouselNavigationItemClassName}__content`,
};

/**
 * A CarouselItem is an actionable item within a Carousel.
 */
export const CarouselNavigationItem = React.forwardRef<HTMLLIElement, CarouselNavigationItemProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CarouselNavigationItem.displayName, context.telemetry);
  setStart();

  const {
    children,
    thumbnails,
    vertical,
    active,
    content,
    iconOnly,
    primary,
    indicator,
    className,
    design,
    styles,
    variables,
    disableClickableNav,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CarouselNavigationItem.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CarouselNavigationItem.displayName,
    actionHandlers: {
      performClick: event => !event.defaultPrevented && handleClick(event),
    },
    mapPropsToBehavior: () => ({
      active,
    }),
  });

  const { classes, styles: resolvedStyles } = useStyles<CarouselNavigationItemStylesProps>(
    CarouselNavigationItem.displayName,
    {
      className: carouselNavigationItemClassName,
      mapPropsToStyles: () => ({
        thumbnails,
        vertical,
        active,
        hasContent: !!content,
        iconOnly,
        primary,
        hasIndicator: !!indicator,
        disableClickableNav,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    },
  );
  const renderContent = () => {
    return content
      ? Box.create(content, {
          defaultProps: () => ({
            as: 'span',
            className: carouselNavigationItemSlotClassNames.content,
            styles: resolvedStyles.content,
          }),
        })
      : Box.create(indicator, {
          defaultProps: () => ({
            className: carouselNavigationItemSlotClassNames.indicator,
            styles: resolvedStyles.indicator,
          }),
        });
  };

  const handleClick = (e: Event | React.SyntheticEvent) => {
    _.invoke(props, 'onClick', e, props);
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onBlur', e, props);
  };

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onClick: handleClick,
        ref,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children] })}
    >
      {childrenExist(children) ? children : renderContent()}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'li', HTMLLIElement, CarouselNavigationItemProps> &
  FluentComponentStaticProps<CarouselNavigationItemProps>;

CarouselNavigationItem.displayName = 'CarouselNavigationItem';

CarouselNavigationItem.propTypes = {
  ...commonPropTypes.createCommon(),
  active: PropTypes.bool,
  indicator: customPropTypes.shorthandAllowingChildren,
  iconOnly: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  vertical: PropTypes.bool,
  thumbnails: PropTypes.bool,
  disableClickableNav: PropTypes.bool,
};

CarouselNavigationItem.handledProps = Object.keys(CarouselNavigationItem.propTypes) as any;

CarouselNavigationItem.defaultProps = {
  accessibility: tabBehavior,
  as: 'li',
  indicator: {},
};

CarouselNavigationItem.create = createShorthandFactory({
  Component: CarouselNavigationItem,
  mappedArrayProp: 'content',
});
