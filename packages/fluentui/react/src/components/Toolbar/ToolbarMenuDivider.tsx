import * as React from 'react'
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils'
import { Accessibility } from '@fluentui/accessibility'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface ToolbarMenuDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility
}

class ToolbarMenuDivider extends UIComponent<WithAsProp<ToolbarMenuDividerProps>> {
  static displayName = 'ToolbarMenuDivider'

  static create: ShorthandFactory<ToolbarMenuDividerProps>

  static className = 'ui-toolbar__menudivider'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  static defaultProps = {
    as: 'li',
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      />
    )
  }
}

ToolbarMenuDivider.create = createShorthandFactory({
  Component: ToolbarMenuDivider,
  mappedProp: 'content',
})

/**
 * A ToolbarMenuDivider adds non-actionable separator between items of ToolbarMenu.
 */
export default withSafeTypeForAs<typeof ToolbarMenuDivider, ToolbarMenuDividerProps, 'li'>(
  ToolbarMenuDivider,
)
