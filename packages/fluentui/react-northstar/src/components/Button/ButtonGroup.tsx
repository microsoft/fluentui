import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import { WithAsProp, withSafeTypeForAs, ShorthandCollection } from '../../types';
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ShorthandFactory,
  createShorthand,
} from '../../utils';
import Button, { ButtonProps } from './Button';

export interface ButtonGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** The buttons contained inside the ButtonGroup. */
  buttons?: ShorthandCollection<ButtonProps>;

  /** The buttons inside group can appear circular. */
  circular?: boolean;
}

export const buttonGroupClassName = 'ui-buttons';

class ButtonGroup extends UIComponent<WithAsProp<ButtonGroupProps>, any> {
  static create: ShorthandFactory<ButtonGroupProps>;

  static displayName = 'ButtonGroup';

  static deprecated_className = buttonGroupClassName;

  static propTypes = {
    ...commonPropTypes.createCommon(),
    buttons: customPropTypes.collectionShorthand,
    circular: PropTypes.bool,
  };

  static defaultProps = {
    as: 'div',
  };

  renderComponent({ ElementType, classes, accessibility, styles, unhandledProps }): React.ReactNode {
    const { children, buttons, circular, content } = this.props;
    if (_.isNil(buttons)) {
      return (
        <ElementType
          {...accessibility.attributes.root}
          {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
          {...unhandledProps}
          className={classes.root}
        >
          {childrenExist(children) ? children : content}
        </ElementType>
      );
    }

    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {_.map(buttons, (button, idx) =>
          createShorthand(Button, button, {
            defaultProps: () => ({
              circular,
              styles: this.getStyleForButtonIndex(styles, idx === 0, idx === buttons.length - 1),
            }),
          }),
        )}
      </ElementType>
    );
  }

  getStyleForButtonIndex = (styles, isFirst, isLast) => {
    let resultStyles = {};
    if (isFirst) {
      resultStyles = styles.firstButton;
    }
    if (isLast) {
      resultStyles = { ...resultStyles, ...styles.lastButton };
    }
    if (!isFirst && !isLast) {
      resultStyles = styles.middleButton;
    }
    return resultStyles;
  };
}

ButtonGroup.create = createShorthandFactory({
  Component: ButtonGroup,
  mappedProp: 'content',
  mappedArrayProp: 'buttons',
});

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof ButtonGroup, ButtonGroupProps>(ButtonGroup);
