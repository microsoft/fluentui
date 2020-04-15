import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ColorComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';

import { WithAsProp, withSafeTypeForAs } from '../../types';

export interface DividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** A divider can be fitted, without any space above or below it. */
  fitted?: boolean;

  /** A divider can be resized using this multiplier. (default: 0) */
  size?: number;

  /** A divider can be emphasized to draw a user's attention. */
  important?: boolean;

  /** A divider can be positioned vertically. */
  vertical?: boolean;
}

class Divider extends UIComponent<WithAsProp<DividerProps>, any> {
  static displayName = 'Divider';

  static create: ShorthandFactory<DividerProps>;

  static deprecated_className = 'ui-divider';

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    fitted: PropTypes.bool,
    size: PropTypes.number,
    important: PropTypes.bool,
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    size: 0,
  };

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children, content } = this.props;

    return (
      <ElementType
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

Divider.create = createShorthandFactory({ Component: Divider, mappedProp: 'content' });

/**
 * A Divider visually segments content.
 */
export default withSafeTypeForAs<typeof Divider, DividerProps>(Divider);
