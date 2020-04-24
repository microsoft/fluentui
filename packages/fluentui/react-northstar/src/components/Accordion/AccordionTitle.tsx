import { accordionTitleBehavior, indicatorBehavior } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
  ShorthandConfig,
} from '../../utils';
import { WithAsProp, ComponentEventHandler, ShorthandValue, withSafeTypeForAs } from '../../types';
import Box, { BoxProps } from '../Box/Box';

export interface AccordionTitleSlotClassNames {
  contentWrapper: string;
}

export interface AccordionTitleProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>>,
    ChildrenComponentProps {
  /** Id of the content it owns. */
  accordionContentId?: string;

  /** Whether or not the title is in the open state. */
  active?: boolean;

  /** If at least one panel needs to stay active and this title does not correspond to the last active one. */
  canBeCollapsed?: boolean;

  /** Shorthand for the content wrapper element. */
  contentWrapper?: ShorthandValue<BoxProps>;

  /** An accordion title can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** AccordionTitle index inside Accordion. */
  index?: number;

  /** Ref to the clickable element that contains the title. */
  contentRef?: React.Ref<HTMLElement>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<AccordionTitleProps>;

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<AccordionTitleProps>;

  /** Shorthand for the active indicator. */
  indicator?: ShorthandValue<BoxProps>;
}

export const accordionTitleClassName = 'ui-accordion__title';
export const accordionTitleSlotClassNames: AccordionTitleSlotClassNames = {
  contentWrapper: `${accordionTitleClassName}__content-wrapper`,
};

class AccordionTitle extends UIComponent<WithAsProp<AccordionTitleProps>, any> {
  static displayName = 'AccordionTitle';

  static create: ShorthandFactory<AccordionTitleProps>;
  static shorthandConfig: ShorthandConfig<AccordionTitleProps> = {
    mappedProp: 'content',
  };

  static deprecated_className = accordionTitleClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    accordionContentId: PropTypes.string,
    active: PropTypes.bool,
    contentRef: customPropTypes.ref,
    contentWrapper: customPropTypes.wrapperShorthand,
    canBeCollapsed: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
    indicator: customPropTypes.shorthandAllowingChildren,
  };

  static defaultProps = {
    accessibility: accordionTitleBehavior,
    as: 'dt',
    contentRef: _.noop,
    indicator: {},
    contentWrapper: {},
  };

  actionHandlers = {
    performClick: e => {
      e.preventDefault();
      this.handleClick(e);
    },
  };

  handleClick = (e: React.SyntheticEvent) => {
    if (!this.props.disabled) {
      _.invoke(this.props, 'onClick', e, this.props);
    }
  };

  handleFocus = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    _.invoke(this.props, 'onFocus', e, this.props);
  };

  handleWrapperOverrides = predefinedProps => ({
    onFocus: (e: React.FocusEvent) => {
      this.handleFocus(e);
      _.invoke(predefinedProps, 'onFocus', e, this.props);
    },
    onClick: (e: React.MouseEvent) => {
      this.handleClick(e);
      _.invoke(predefinedProps, 'onClick', e, this.props);
    },
  });

  renderComponent({ ElementType, classes, unhandledProps, styles, accessibility }) {
    const { contentRef, children, content, indicator, contentWrapper } = this.props;

    const contentWrapperElement = (
      <Ref innerRef={contentRef}>
        {Box.create(contentWrapper, {
          defaultProps: () => ({
            className: accordionTitleSlotClassNames.contentWrapper,
            styles: styles.contentWrapper,
            ...accessibility.attributes.content,
            ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.content, unhandledProps),
          }),
          overrideProps: predefinedProps => ({
            children: (
              <>
                {Box.create(indicator, {
                  defaultProps: () => ({
                    styles: styles.indicator,
                    accessibility: indicatorBehavior,
                  }),
                })}
                {Box.create(content, {
                  defaultProps: () => ({
                    styles: styles.content,
                  }),
                })}
              </>
            ),
            ...this.handleWrapperOverrides(predefinedProps),
          }),
        })}
      </Ref>
    );

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : contentWrapperElement}
      </ElementType>
    );
  }
}

AccordionTitle.create = createShorthandFactory({ Component: AccordionTitle, mappedProp: 'content' });

/**
 * An AccordionTitle represents the title of Accordion's item that can be interacted with to expand or collapse the item's content.
 */
export default withSafeTypeForAs<typeof AccordionTitle, AccordionTitleProps>(AccordionTitle);
