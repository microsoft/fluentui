import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ColorComponentProps,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import Box, { BoxProps } from '../Box/Box';

export interface SegmentProps
  extends UIComponentProps<SegmentProps>,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** An segment can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean;
}

class Segment extends UIComponent<WithAsProp<SegmentProps>, any> {
  static deprecated_className = 'ui-segment';

  static displayName = 'Segment';

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
      color: true,
    }),
    disabled: PropTypes.bool,
    inverted: PropTypes.bool,
    rtlAttributes: PropTypes.func,
  };

  static defaultProps = {
    as: 'div',
  };

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children, content } = this.props;

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : Box.create(content)}
      </ElementType>
    );
  }
}

/**
 * A Segment visually groups related content.
 */
export default withSafeTypeForAs<typeof Segment, SegmentProps>(Segment);
