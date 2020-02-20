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

export interface ToolbarDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility
}

class ToolbarDivider extends UIComponent<WithAsProp<ToolbarDividerProps>> {
  static displayName = 'ToolbarDivider'

  static create: ShorthandFactory<ToolbarDividerProps>

  static className = 'ui-toolbar__divider'

  static propTypes = {
    ...commonPropTypes.createCommon(),
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

ToolbarDivider.create = createShorthandFactory({ Component: ToolbarDivider, mappedProp: 'content' })

/**
 * A ToolbarDivider is a non-actionable element that visually segments Toolbar items.
 */
export default withSafeTypeForAs<typeof ToolbarDivider, ToolbarDividerProps>(ToolbarDivider)
