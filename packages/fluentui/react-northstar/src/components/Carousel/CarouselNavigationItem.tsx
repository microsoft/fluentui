import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import { Accessibility, tabBehavior } from '@fluentui/accessibility';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  UIComponent,
} from '../../utils';
import { withSafeTypeForAs, WithAsProp, ShorthandValue, ComponentEventHandler } from '../../types';
import Box, { BoxProps } from '../Box/Box';

export interface CarouselNavigationItemSlotClassNames {
  indicator: string;
  content: string;
}

export interface CarouselNavigationItemProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
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
}

export const carouselNavigationItemClassName = 'ui-carousel__navigationitem';
export const carouselNavigationItemSlotClassNames: CarouselNavigationItemSlotClassNames = {
  indicator: `${carouselNavigationItemClassName}__indicator`,
  content: `${carouselNavigationItemClassName}__content`,
};

class CarouselNavigationItem extends UIComponent<WithAsProp<CarouselNavigationItemProps>> {
  static displayName = 'CarouselNavigationItem';

  static deprecated_className = carouselNavigationItemClassName;

  static create: ShorthandFactory<CarouselNavigationItemProps>;

  static propTypes = {
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
  };

  static defaultProps = {
    accessibility: tabBehavior as Accessibility,
    as: 'li',
    indicator: {},
  };

  renderContent({ content, indicator, styles }) {
    return content
      ? Box.create(content, {
          defaultProps: () => ({
            as: 'span',
            className: carouselNavigationItemSlotClassNames.content,
            styles: styles.content,
          }),
        })
      : Box.create(indicator, {
          defaultProps: () => ({
            className: carouselNavigationItemSlotClassNames.indicator,
            styles: styles.indicator,
          }),
        });
  }

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children, content, indicator } = this.props;

    return childrenExist(children) ? (
      children
    ) : (
      <ElementType
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...unhandledProps}
      >
        {this.renderContent({ content, indicator, styles })}
      </ElementType>
    );
  }

  handleClick = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onBlur', e, this.props);
  };

  handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props);
  };

  actionHandlers = {
    performClick: event => !event.defaultPrevented && this.handleClick(event),
  };
}

CarouselNavigationItem.create = createShorthandFactory({
  Component: CarouselNavigationItem,
  mappedArrayProp: 'content',
});

/**
 * A CarouselItem is an actionable item within a Carousel.
 */
export default withSafeTypeForAs<typeof CarouselNavigationItem, CarouselNavigationItemProps, 'li'>(
  CarouselNavigationItem,
);
