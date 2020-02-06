import { Accessibility, iconBehavior } from '@fluentui/accessibility'
import { callable } from '@fluentui/styles'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  SizeValue,
  ShorthandFactory,
} from '../../utils'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export type IconXSpacing = 'none' | 'before' | 'after' | 'both'

export interface IconProps extends UIComponentProps, ColorComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Icon can appear with rectangular border. */
  bordered?: boolean

  /** Icon can appear as circular. */
  circular?: boolean

  /** An icon can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name of the icon. */
  name: string

  /** An icon can provide an outline variant. */
  outline?: boolean

  /** An icon can be rotated by the degree specified as number. */
  rotate?: number

  /** Size of the icon. */
  size?: SizeValue

  /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
  xSpacing?: IconXSpacing
}

class Icon extends UIComponent<WithAsProp<IconProps>, any> {
  static create: ShorthandFactory<IconProps>

  static className = 'ui-icon'

  static displayName = 'Icon'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
      color: true,
    }),
    bordered: PropTypes.bool,
    circular: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    rotate: PropTypes.number,
    size: customPropTypes.size,
    xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),
  }

  static defaultProps = {
    as: 'span',
    size: 'medium',
    accessibility: iconBehavior,
    rotate: 0,
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility, theme, rtl, styles }) {
    const { name } = this.props
    const { icons = {} } = theme || {}

    const maybeIcon = icons[name]
    const isSvgIcon = maybeIcon && maybeIcon.isSvg

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {isSvgIcon && callable(maybeIcon.icon)({ classes, rtl, props: this.props })}
      </ElementType>
    )
  }
}

Icon.create = createShorthandFactory({ Component: Icon, mappedProp: 'name', allowsJSX: false })

/**
 * An Icon displays a pictogram with semantic meaning.
 */
export default withSafeTypeForAs<typeof Icon, IconProps, 'span'>(Icon)
