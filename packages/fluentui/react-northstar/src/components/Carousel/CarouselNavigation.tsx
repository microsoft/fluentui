import { tabListBehavior } from '@fluentui/accessibility';
import { ReactAccessibilityBehavior } from '@fluentui/react-bindings';
import { ComponentVariablesObject, mergeComponentVariables } from '@fluentui/styles';
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
  ShorthandFactory,
  UIComponent,
} from '../../utils';
import { withSafeTypeForAs, WithAsProp, ShorthandCollection, ComponentEventHandler } from '../../types';
import CarouselNavigationItem, { CarouselNavigationItemProps } from './CarouselNavigationItem';

export interface CarouselNavigationProps extends UIComponentProps, ChildrenComponentProps {
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
}

class CarouselNavigation extends UIComponent<WithAsProp<CarouselNavigationProps>> {
  static displayName = 'CarouselNavigation';

  static deprecated_className = 'ui-carousel__navigation';

  static create: ShorthandFactory<CarouselNavigationProps>;

  static propTypes = {
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
  };

  static defaultProps = {
    accessibility: tabListBehavior,
    as: 'ul',
  };

  handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(this.props, 'onItemClick', e, itemProps);
      _.invoke(predefinedProps, 'onClick', e, itemProps);
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  });

  renderItems = (variables: ComponentVariablesObject, accessibility: ReactAccessibilityBehavior) => {
    const { activeIndex, iconOnly, items, primary, secondary, vertical, thumbnails } = this.props;

    return _.map(items, (item, index) =>
      CarouselNavigationItem.create(item, {
        defaultProps: () => ({
          active: index === activeIndex,
          iconOnly,
          index,
          primary,
          secondary,
          vertical,
          thumbnails,
          accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.item : undefined,
        }),
        overrideProps: this.handleItemOverrides(variables),
      }),
    );
  };

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children } = this.props;
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderItems(variables, accessibility)}
      </ElementType>
    );
  }
}

CarouselNavigation.create = createShorthandFactory({
  Component: CarouselNavigation,
  mappedArrayProp: 'items',
});

/**
 * A Carousel navigation helps switching between Carousel items.
 */
export default withSafeTypeForAs<typeof CarouselNavigation, CarouselNavigationProps, 'ul'>(CarouselNavigation);
