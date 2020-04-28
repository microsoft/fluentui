import { Accessibility, radioGroupItemBehavior } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import {
  AutoControlledComponent,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils';
import Box, { BoxProps } from '../Box/Box';
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';

export interface RadioGroupItemSlotClassNames {
  indicator: string;
}

export interface RadioGroupItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Whether or not radio item is checked. */
  checked?: boolean;

  /**
   * Called after radio item checked state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<RadioGroupItemProps>;

  /** The label of the radio item. */
  label?: ShorthandValue<BoxProps>;

  /** Initial checked value. */
  defaultChecked?: boolean;

  /** A radio item can appear disabled and be unable to change states. */
  disabled?: boolean;

  /** The radio item indicator can be customized. */
  indicator?: ShorthandValue<BoxProps>;

  /** The HTML input name. */
  name?: string;

  /**
   * Called after radio item is clicked.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<RadioGroupItemProps>;

  /** Whether should focus when checked */
  shouldFocus?: boolean; // TODO: RFC #306

  /** The HTML input value. */
  value?: string | number;

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean;
}

export interface RadioGroupItemState {
  checked: boolean;
}

export const radioGroupItemClassName = 'ui-radiogroup__item';
export const radioGroupItemSlotClassNames: RadioGroupItemSlotClassNames = {
  indicator: `${radioGroupItemClassName}__indicator`,
};

class RadioGroupItem extends AutoControlledComponent<WithAsProp<RadioGroupItemProps>, RadioGroupItemState> {
  elementRef = React.createRef<HTMLElement>();

  static create: ShorthandFactory<RadioGroupItemProps>;

  static displayName = 'RadioGroupItem';

  static deprecated_className = radioGroupItemClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    indicator: customPropTypes.shorthandAllowingChildren,
    label: customPropTypes.itemShorthand,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    shouldFocus: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    accessibility: radioGroupItemBehavior,
    indicator: {},
  };

  static autoControlledProps = ['checked'];

  actionHandlers = {
    performClick: e => {
      e.preventDefault();
      this.handleClick(e);
    },
  };

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  handleChange = (e: React.ChangeEvent) => {
    // RadioGroupItem component doesn't present any `input` component in markup, however all of our
    // components should handle events transparently.
    _.invoke(this.props, 'onChange', e, { ...this.props, checked: this.state.checked });
  };

  componentDidUpdate(prevProps, prevState) {
    const checked = this.state.checked;
    if (checked !== prevState.checked) {
      checked && this.props.shouldFocus && this.elementRef.current.focus();
      _.invoke(this.props, 'onChange', undefined, { ...this.props, checked });
    }
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, accessibility }) {
    const { label, indicator } = this.props;

    return (
      <Ref innerRef={this.elementRef}>
        <ElementType
          onClick={this.handleClick}
          onChange={this.handleChange}
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {Box.create(indicator, {
            defaultProps: () => ({
              className: radioGroupItemSlotClassNames.indicator,
              styles: styles.indicator,
            }),
          })}
          {Box.create(label, {
            defaultProps: () => ({
              as: 'span',
            }),
          })}
        </ElementType>
      </Ref>
    );
  }
}

RadioGroupItem.create = createShorthandFactory({ Component: RadioGroupItem, mappedProp: 'label' });

/**
 * A RadioGroupItem represents single input element within a RadioGroup.
 *
 * @accessibility
 * Radio items need to be grouped to correctly handle accessibility.
 */
export default withSafeTypeForAs<typeof RadioGroupItem, RadioGroupItemProps>(RadioGroupItem);
