import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  applyAccessibilityKeyHandlers,
  UIComponent,
} from '../../utils'
import {
  ComponentEventHandler,
  ShorthandCollection,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types'
import {
  Accessibility,
  toolbarMenuRadioGroupBehavior,
  toolbarMenuItemRadioBehavior,
} from '@fluentui/accessibility'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import { mergeComponentVariables } from '@fluentui/styles'
import Box, { BoxProps } from '../Box/Box'

export interface ToolbarMenuRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Index of the currently active item. */
  activeIndex?: number

  /** Shorthand array of props for ToolbarMenuRadioGroup. */
  items?: ShorthandCollection<ToolbarMenuItemProps>

  /**
   * Called on item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>
}

export interface ToolbarMenuRadioGroupSlotClassNames {
  wrapper: string
}

class ToolbarMenuRadioGroup extends UIComponent<WithAsProp<ToolbarMenuRadioGroupProps>> {
  static displayName = 'ToolbarMenuRadioGroup'

  static create: ShorthandFactory<ToolbarMenuRadioGroupProps>

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static slotClassNames: ToolbarMenuRadioGroupSlotClassNames = {
    wrapper: `${ToolbarMenuRadioGroup.className}__wrapper`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon(),
    activeIndex: PropTypes.number,
    items: customPropTypes.collectionShorthand,
    onItemClick: PropTypes.func,
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: toolbarMenuRadioGroupBehavior,
    wrapper: {},
  }

  handleItemOverrides = variables => (
    predefinedProps: ToolbarMenuItemProps,
  ): ToolbarMenuItemProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
    wrapper: null,
  })

  renderComponent({ ElementType, classes, unhandledProps, accessibility, styles }) {
    const { activeIndex, items, variables, wrapper } = this.props

    const content = (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {_.map(items, (item, index) =>
          ToolbarMenuItem.create(item, {
            defaultProps: () => ({
              accessibility: toolbarMenuItemRadioBehavior,
              as: 'li',
              active: activeIndex === index,
              index,
            }),
            overrideProps: this.handleItemOverrides(variables),
          }),
        )}
      </ElementType>
    )

    return Box.create(wrapper, {
      defaultProps: () => ({
        as: 'li',
        className: ToolbarMenuRadioGroup.slotClassNames.wrapper,
        styles: styles.wrapper,
        ...accessibility.attributes.wrapper,
        ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
      }),
      overrideProps: {
        children: content,
      },
    })
  }
}

ToolbarMenuRadioGroup.create = createShorthandFactory({
  Component: ToolbarMenuRadioGroup,
})

/**
 * A ToolbarMenuRadioGroup renders ToolbarMenuItem as a group of mutually exclusive options.
 */
export default withSafeTypeForAs<typeof ToolbarMenuRadioGroup, ToolbarMenuRadioGroupProps, 'ul'>(
  ToolbarMenuRadioGroup,
)
