import { Accessibility, IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility'
import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils'

import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'

export interface ToolbarCustomItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A custom item can remove element padding, vertically or horizontally. */
  fitted?: boolean | 'horizontally' | 'vertically'

  /** A custom item can be focused. */
  focusable?: boolean

  /** A custom item can't be actionable. */
  onClick?: never

  /**
   * Called after user's focus. Will be called only if the item is focusable.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarCustomItemProps>

  /**
   * Called after item blur. Will be called only if the item is focusable.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarCustomItemProps>
}

class ToolbarCustomItem extends UIComponent<WithAsProp<ToolbarCustomItemProps>> {
  static displayName = 'ToolbarCustomItem'

  static className = 'ui-toolbar__customitem'

  static create: ShorthandFactory<ToolbarCustomItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),
    focusable: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  handleBlur = (e: React.SyntheticEvent) => {
    if (this.props.focusable) {
      _.invoke(this.props, 'onBlur', e, this.props)
    }
  }

  handleFocus = (e: React.SyntheticEvent) => {
    if (this.props.focusable) {
      _.invoke(this.props, 'onFocus', e, this.props)
    }
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children, content, focusable } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...{ [IS_FOCUSABLE_ATTRIBUTE]: focusable }}
        {...unhandledProps}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ToolbarCustomItem.create = createShorthandFactory({
  Component: ToolbarCustomItem,
  mappedProp: 'content',
})

/**
 * A ToolbarCustomItem renders Toolbar item as a non-actionable `div` with custom content inside.
 */
export default withSafeTypeForAs<typeof ToolbarCustomItem, ToolbarCustomItemProps>(
  ToolbarCustomItem,
)
