import { Accessibility, statusBehavior } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Icon, { IconProps } from '../Icon/Icon'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
  ShorthandFactory,
} from '../../utils'
import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'

export interface StatusProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue<IconProps>

  /** Size multiplier */
  size?: SizeValue

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

class Status extends UIComponent<WithAsProp<StatusProps>, any> {
  static create: ShorthandFactory<StatusProps>

  static className = 'ui-status'

  static displayName = 'Status'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    color: PropTypes.string,
    icon: customPropTypes.itemShorthandWithoutJSX,
    size: customPropTypes.size,
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
  }

  static defaultProps = {
    accessibility: statusBehavior,
    as: 'span',
    size: 'medium',
    state: 'unknown',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, variables, styles }) {
    const { icon } = this.props as StatusProps
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {Icon.create(icon, {
          defaultProps: () => ({
            size: 'smallest',
            styles: styles.icon,
            variables: variables.icon,
            xSpacing: 'none',
          }),
        })}
      </ElementType>
    )
  }
}

Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' })

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
export default withSafeTypeForAs<typeof Status, StatusProps, 'span'>(Status)
