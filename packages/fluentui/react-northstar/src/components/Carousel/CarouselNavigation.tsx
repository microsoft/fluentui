import { tabListBehavior, Accessibility } from '@fluentui/accessibility';
import {
  useTelemetry,
  mergeVariablesOverrides,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import { ShorthandCollection, ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import { CarouselNavigationItem, CarouselNavigationItemProps } from './CarouselNavigationItem';

export interface CarouselNavigationProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Index of the currently active item. */
  activeIndex?: number | string;

  /** A navigation may have just icons. */
  iconOnly?: boolean;

  /** A navigation may have thumbnails. */
  thumbnails?: boolean;

  /** Shorthand array of props for Navigation. */
  items?: ShorthandCollection<CarouselNavigationItemProps>;

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<CarouselNavigationItemProps>;

  /** The carousel navigation can have primary type. */
  primary?: boolean;

  /** The carousel navigation can have secondary type. */
  secondary?: boolean;

  /** A vertical carousel navigation displays elements vertically. */
  vertical?: boolean;

  /** A navigation may be clickable */
  disableClickableNav?: boolean;
}

export type CarouselNavigationStylesProps = Required<
  Pick<CarouselNavigationProps, 'activeIndex' | 'iconOnly' | 'primary' | 'vertical' | 'thumbnails'>
>;

export const carouselNavigationClassName = 'ui-carousel__navigation';

/**
 * A Carousel navigation helps switching between Carousel items.
 */
export const CarouselNavigation = React.forwardRef<HTMLUListElement, CarouselNavigationProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CarouselNavigation.displayName, context.telemetry);
  setStart();
  const {
    accessibility,
    variables,
    children,
    className,
    design,
    activeIndex,
    iconOnly,
    items,
    primary,
    secondary,
    vertical,
    thumbnails,
    styles,
    disableClickableNav,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CarouselNavigation.handledProps, props);

  const getA11yProps = useAccessibility(accessibility, {
    debugName: CarouselNavigation.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CarouselNavigationStylesProps>(CarouselNavigation.displayName, {
    className: carouselNavigationClassName,
    mapPropsToStyles: () => ({
      activeIndex,
      iconOnly,
      primary,
      vertical,
      thumbnails,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(props, 'onItemClick', e, itemProps);
      _.invoke(predefinedProps, 'onClick', e, itemProps);
    },
    variables: mergeVariablesOverrides(variables, predefinedProps.variables),
  });

  const renderItems = () => {
    return _.map(items, (item, index) =>
      CarouselNavigationItem.create(item, {
        defaultProps: () =>
          getA11yProps('item', {
            active: index === activeIndex,
            iconOnly,
            index,
            primary,
            secondary,
            vertical,
            thumbnails,
            disableClickableNav,
          }),
        overrideProps: handleItemOverrides(variables),
      }),
    );
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children] })}
    >
      {childrenExist(children) ? children : renderItems()}
    </ElementType>,
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'ul', HTMLUListElement, CarouselNavigationProps> &
  FluentComponentStaticProps<CarouselNavigationProps>;

CarouselNavigation.displayName = 'CarouselNavigation';

CarouselNavigation.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconOnly: PropTypes.bool,
  thumbnails: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  onItemClick: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  vertical: PropTypes.bool,
  disableClickableNav: PropTypes.bool,
};

CarouselNavigation.defaultProps = {
  accessibility: tabListBehavior,
  as: 'ul',
};

CarouselNavigation.handledProps = Object.keys(CarouselNavigation.propTypes) as any;

CarouselNavigation.create = createShorthandFactory({
  Component: CarouselNavigation,
  mappedArrayProp: 'items',
});
