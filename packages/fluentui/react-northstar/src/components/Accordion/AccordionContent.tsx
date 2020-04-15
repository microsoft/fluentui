import { accordionContentBehavior } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';
import { WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types';
import { accordionClassName } from './Accordion';

export interface AccordionContentProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Id of the title it belongs to. */
  accordionTitleId?: string;

  /** Whether or not the content is visible. */
  active?: boolean;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<AccordionContentProps>;
}

class AccordionContent extends UIComponent<WithAsProp<AccordionContentProps>, any> {
  static displayName = 'AccordionContent';

  static create: ShorthandFactory<AccordionContentProps>;

  static propTypes = {
    ...commonPropTypes.createCommon(),
    accordionTitleId: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    accessibility: accordionContentBehavior,
    as: 'dd',
  };

  handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { children, content } = this.props;

    return (
      <ElementType
        onClick={this.handleClick}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
  }
}

export const accordionContentClassName = `${accordionClassName}__content`;

AccordionContent.create = createShorthandFactory({
  Component: AccordionContent,
  mappedProp: 'content',
});

/**
 * An AccordionContent displays content hosted in an Accordion.
 */
export default withSafeTypeForAs<typeof AccordionContent, AccordionContentProps>(AccordionContent);
