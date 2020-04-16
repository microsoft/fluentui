import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';

import { WithAsProp, withSafeTypeForAs } from '../../types';

export interface HeaderDescriptionProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;
}

class HeaderDescription extends UIComponent<WithAsProp<HeaderDescriptionProps>, any> {
  static create: ShorthandFactory<HeaderDescriptionProps>;

  static deprecated_className = 'ui-header__description';

  static displayName = 'HeaderDescription';

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
  };

  static defaultProps = {
    as: 'p',
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

HeaderDescription.create = createShorthandFactory({
  Component: HeaderDescription,
  mappedProp: 'content',
});

/**
 * A HeaderDescription provides more detailed information about the Header.
 */
export default withSafeTypeForAs<typeof HeaderDescription, HeaderDescriptionProps, 'p'>(HeaderDescription);
