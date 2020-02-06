import { Accessibility, checkboxBehavior } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
  createShorthandFactory,
  ChildrenComponentProps,
  commonPropTypes,
  UIComponentProps,
  ShorthandFactory,
} from '../../utils'
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import Icon, { IconProps } from '../Icon/Icon'
import Text, { TextProps } from '../Text/Text'
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils'

export interface CheckboxSlotClassNames {
  label: string
  indicator: string
}

export interface CheckboxProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** A checkbox can be checked by default. */
  defaultChecked?: SupportedIntrinsicInputProps['defaultChecked']

  /** A checkbox's checked state can be controlled. */
  checked?: SupportedIntrinsicInputProps['checked']

  /** A checkbox can appear disabled and be unable to change states. */
  disabled?: SupportedIntrinsicInputProps['disabled']

  /** A checkbox's indicator icon can be customized. */
  icon?: ShorthandValue<IconProps>

  /** A checkbox can render a label next to its indicator. */
  label?: ShorthandValue<TextProps>

  /** A checkbox's label can be rendered in different positions. */
  labelPosition?: 'start' | 'end'

  /**
   * Called after a checkbox's checked state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<CheckboxProps>

  /**
   * Called after a checkbox is clicked.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<CheckboxProps>

  /** A checkbox can be formatted to show an "on or off" choice. */
  toggle?: boolean
}

export interface CheckboxState {
  checked: CheckboxProps['checked']
}

class Checkbox extends AutoControlledComponent<WithAsProp<CheckboxProps>, CheckboxState> {
  static slotClassNames: CheckboxSlotClassNames

  static create: ShorthandFactory<CheckboxProps>

  static displayName = 'Checkbox'

  static className = 'ui-checkbox'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
    label: customPropTypes.itemShorthand,
    labelPosition: PropTypes.oneOf(['start', 'end']),
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    toggle: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: checkboxBehavior,
    icon: {},
    labelPosition: 'end',
  }

  static autoControlledProps = ['checked']

  actionHandlers = {
    performClick: (e: any /* TODO: use React.KeyboardEvent */) => {
      e.preventDefault()
      this.handleClick(e)
    },
  }

  getInitialAutoControlledState(): CheckboxState {
    return { checked: false }
  }

  handleChange = (e: React.ChangeEvent) => {
    // Checkbox component doesn't present any `input` component in markup, however all of our
    // components should handle events transparently.
    const { disabled } = this.props
    const checked = !this.state.checked

    if (!disabled) {
      this.setState({ checked })
      _.invoke(this.props, 'onChange', e, { ...this.props, checked })
    }
  }

  handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const { disabled } = this.props
    const checked = !this.state.checked

    if (!disabled) {
      this.setState({ checked })

      _.invoke(this.props, 'onClick', e, { ...this.props, checked })
      _.invoke(this.props, 'onChange', e, { ...this.props, checked })
    }
  }

  handleFocus = (e: React.FocusEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, accessibility }) {
    const { label, labelPosition, icon, toggle } = this.props

    const labelElement = Text.create(label, {
      defaultProps: () => ({
        styles: styles.label,
        className: Checkbox.slotClassNames.label,
      }),
    })

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {labelPosition === 'start' && labelElement}
        {Icon.create(icon, {
          defaultProps: () => ({
            outline: toggle && !this.state.checked,
            size: toggle ? 'medium' : 'smaller',
            className: Checkbox.slotClassNames.indicator,
            name: toggle ? 'icon-circle' : 'icon-checkmark',
            styles: toggle ? styles.toggle : styles.checkbox,
          }),
        })}
        {labelPosition === 'end' && labelElement}
      </ElementType>
    )
  }
}

Checkbox.slotClassNames = {
  label: `${Checkbox.className}__label`,
  indicator: `${Checkbox.className}__indicator`,
}

Checkbox.create = createShorthandFactory({
  Component: Checkbox,
  mappedProp: 'label',
})

/**
 * A Checkbox allows a user to make a choice between two mutually exclusive options.
 *
 * @accessibility
 * Implements [ARIA Checkbox](https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox) design pattern.
 */
export default withSafeTypeForAs<typeof Checkbox, CheckboxProps>(Checkbox)
