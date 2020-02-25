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
  ShorthandFactory
} from '../../utils';
import { Accessibility, treeTitleBehavior } from '@fluentui/accessibility';
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types';

export interface TreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Whether or not the title has a subtree. */
  hasSubtree?: boolean;

  /** The index of the title among its siblings. Count starts at 1. */
  index?: number;

  /** Level of the tree/subtree that contains this title. */
  level?: number;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<TreeTitleProps>;

  /** Whether or not the subtree of the title is in the open state. */
  expanded?: boolean;

  /** Size of the tree containing this title without any children. */
  treeSize?: number;
}

class TreeTitle extends UIComponent<WithAsProp<TreeTitleProps>> {
  static create: ShorthandFactory<TreeTitleProps>;

  static className = 'ui-tree__title';

  static displayName = 'TreeTitle';

  static propTypes = {
    ...commonPropTypes.createCommon(),
    hasSubtree: PropTypes.bool,
    index: PropTypes.number,
    level: PropTypes.number,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    treeSize: PropTypes.number
  };

  static defaultProps = {
    as: 'a',
    accessibility: treeTitleBehavior
  };

  actionHandlers = {
    performClick: e => {
      e.preventDefault();
      this.handleClick(e);
    }
  };

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
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

TreeTitle.create = createShorthandFactory({
  Component: TreeTitle,
  mappedProp: 'content'
});

/**
 * A TreeTitle renders a title of TreeItem.
 */
export default withSafeTypeForAs<typeof TreeTitle, TreeTitleProps, 'a'>(TreeTitle);
