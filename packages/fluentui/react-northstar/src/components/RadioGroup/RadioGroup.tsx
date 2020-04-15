// TODO:
// vertical - padding variable?
import { Accessibility, radioGroupBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  AutoControlledComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils';
import RadioGroupItem, { RadioGroupItemProps } from './RadioGroupItem';
import { WithAsProp, ComponentEventHandler, withSafeTypeForAs, ShorthandCollection } from '../../types';

export interface RadioGroupSlotClassNames {
  item: string;
}

export interface RadioGroupProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Value of the currently checked radio item. */
  checkedValue?: number | string;

  /**
   * Called after radio group value is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All value props.
   */
  onCheckedValueChange?: ComponentEventHandler<RadioGroupItemProps>;

  /** Initial checkedValue value. */
  defaultCheckedValue?: number | string;

  /** Shorthand array of props for RadioGroup. */
  items?: ShorthandCollection<RadioGroupItemProps>;

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean;
}

class RadioGroup extends AutoControlledComponent<WithAsProp<RadioGroupProps>, any> {
  static displayName = 'RadioGroup';

  static deprecated_className = 'ui-radiogroup';

  static slotClassNames: RadioGroupSlotClassNames = {
    item: `${RadioGroup.deprecated_className}__item`,
  };

  static create: ShorthandFactory<RadioGroupProps>;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultCheckedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    items: customPropTypes.collectionShorthand,
    onCheckedValueChange: PropTypes.func,
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    as: 'div',
    accessibility: radioGroupBehavior as Accessibility,
  };

  static autoControlledProps = ['checkedValue'];

  static Item = RadioGroupItem;

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, vertical } = this.props;
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(vertical)}
      </ElementType>
    );
  }

  actionHandlers = {
    nextItem: event => this.setCheckedItem(event, 1),
    prevItem: event => this.setCheckedItem(event, -1),
  };

  getItemProps = (item): RadioGroupItemProps => {
    return (item as React.ReactElement<RadioGroupItemProps>).props || item;
  };

  setCheckedItem = (event, direction) => {
    const nextItem = this.findNextEnabledCheckedItem(direction);

    if (nextItem) {
      this.setCheckedValue({
        checkedValue: nextItem.value,
        shouldFocus: true,
        event,
        props: nextItem,
      });
    }
    event.preventDefault();
  };

  findNextEnabledCheckedItem = (direction): RadioGroupItemProps => {
    if (!this.props.items || !this.props.items.length) {
      return undefined;
    }

    const currentIndex =
      // if none of the values selected, set current index to the first item
      this.state.checkedValue !== undefined
        ? _.findIndex(this.props.items, item => this.getItemProps(item).value === this.state.checkedValue)
        : 0;

    for (let newIndex = currentIndex + direction; newIndex !== currentIndex; newIndex += direction) {
      if (newIndex < 0) {
        newIndex = this.props.items.length - 1;
      } else if (newIndex >= this.props.items.length) {
        newIndex = 0;
      }

      if (newIndex === currentIndex) {
        return undefined;
      }

      const itemProps = this.getItemProps(this.props.items[newIndex]);
      if (!itemProps.disabled) {
        return itemProps;
      }
    }
    return undefined;
  };

  handleItemOverrides = predefinedProps => ({
    checked: typeof this.state.checkedValue !== 'undefined' && this.state.checkedValue === predefinedProps.value,
    onClick: (event, itemProps) => {
      const { value, disabled } = itemProps;
      if (!disabled && value !== this.state.checkedValue) {
        this.setCheckedValue({ checkedValue: value, shouldFocus: false, event, props: itemProps });
      }
      _.invoke(predefinedProps, 'onClick', event, itemProps);
    },
    shouldFocus: this.state.shouldFocus,
  });

  renderItems = (vertical: boolean) => {
    const { items } = this.props;
    const isNoneValueSelected = this.state.checkedValue === undefined;

    return _.map(items, (item, index) =>
      RadioGroupItem.create(item, {
        defaultProps: () => ({
          className: RadioGroup.slotClassNames.item,
          vertical,
          ...(index === 0 && isNoneValueSelected && { tabIndex: 0 }),
        }),
        overrideProps: this.handleItemOverrides,
      }),
    );
  };

  setCheckedValue({
    checkedValue,
    shouldFocus,
    event,
    props,
  }: {
    checkedValue: number | string;
    shouldFocus: boolean;
    event: React.SyntheticEvent;
    props: RadioGroupItemProps;
  }) {
    this.setState({ checkedValue, shouldFocus });
    _.invoke(this.props, 'onCheckedValueChange', event, props);
  }
}

/**
 * A RadioGroup allows user to select a value from a small set of mutually exclusive options.
 *
 * @accessibility
 * Implements [ARIA Radio Group](https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton) design pattern.
 */
export default withSafeTypeForAs<typeof RadioGroup, RadioGroupProps>(RadioGroup);
