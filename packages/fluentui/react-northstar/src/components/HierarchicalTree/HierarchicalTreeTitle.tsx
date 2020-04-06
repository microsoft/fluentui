import { Accessibility, hierarchicalTreeTitleBehavior } from '@fluentui/accessibility';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types';

export interface HierarchicalTreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<HierarchicalTreeTitleProps>;

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean;

  /** Whether or not the item has a subtree. */
  hasSubtree?: boolean;
}

class HierarchicalTreeTitle extends UIComponent<WithAsProp<HierarchicalTreeTitleProps>> {
  static create: ShorthandFactory<HierarchicalTreeTitleProps>;

  static className = 'ui-hierarchicaltree__title';

  static displayName = 'HierarchicalTreeTitle';

  static propTypes = {
    ...commonPropTypes.createCommon(),
    onClick: PropTypes.func,
    open: PropTypes.bool,
    hasSubtree: PropTypes.bool,
  };

  static defaultProps = {
    as: 'a',
    accessibility: hierarchicalTreeTitleBehavior,
  };

  actionHandlers = {
    performClick: e => {
      e.preventDefault();
      this.handleClick(e);
    },
  };

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children, content } = this.props;

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
  }
}

HierarchicalTreeTitle.create = createShorthandFactory({
  Component: HierarchicalTreeTitle,
  mappedProp: 'content',
});

/**
 * A TreeTitle renders a title of TreeItem.
 */
export default withSafeTypeForAs<typeof HierarchicalTreeTitle, HierarchicalTreeTitleProps, 'a'>(HierarchicalTreeTitle);
