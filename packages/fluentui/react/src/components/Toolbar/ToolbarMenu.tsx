import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import { toolbarMenuBehavior, toolbarMenuItemCheckboxBehavior } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'

import {
  createShorthandFactory,
  commonPropTypes,
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  ShorthandFactory,
  applyAccessibilityKeyHandlers,
} from '../../utils'
import { mergeComponentVariables } from '@fluentui/styles'

import {
  ComponentEventHandler,
  ShorthandCollection,
  withSafeTypeForAs,
  ShorthandValue,
} from '../../types'

import ToolbarMenuRadioGroup, { ToolbarMenuRadioGroupProps } from './ToolbarMenuRadioGroup'
import ToolbarMenuDivider from './ToolbarMenuDivider'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import { IconProps } from '../Icon/Icon'

export type ToolbarMenuItemShorthandKinds = 'divider' | 'item' | 'toggle'

export interface ToolbarMenuProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Shorthand array of props for ToolbarMenu. */
  items?: ShorthandCollection<ToolbarMenuItemProps, ToolbarMenuItemShorthandKinds>

  /**
   * Called on item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /** Indicates whether the menu is submenu. */
  submenu?: boolean

  /** Shorthand for the submenu indicator. */
  submenuIndicator?: ShorthandValue<IconProps>
}

class ToolbarMenu extends UIComponent<ToolbarMenuProps> {
  static displayName = 'ToolbarMenu'

  static className = 'ui-toolbar__menu'

  static create: ShorthandFactory<ToolbarMenuProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
    onItemClick: PropTypes.func,
    submenu: PropTypes.bool,
    submenuIndicator: customPropTypes.itemShorthandWithoutJSX,
  }

  static defaultProps = {
    accessibility: toolbarMenuBehavior,
    as: 'ul',
  }

  actionHandlers = {
    performClick: e => {
      _.invoke(this.props, 'onClick', e, this.props)
    },
  }

  handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, {
        ...itemProps,
        menuOpen: !!itemProps.menu,
      })
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  handleDividerOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  handleRadioGroupOverrides = variables => (predefinedProps: ToolbarMenuRadioGroupProps) => ({
    onItemClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onItemClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items, variables) {
    const { submenuIndicator, submenu } = this.props
    const itemOverridesFn = this.handleItemOverrides(variables)
    const dividerOverridesFn = this.handleDividerOverrides(variables)
    const radioGroupOverrides = this.handleRadioGroupOverrides(variables)

    return _.map(items, item => {
      const kind = _.get(item, 'kind', 'item')

      switch (kind) {
        case 'divider':
          return ToolbarMenuDivider.create(item, { overrideProps: dividerOverridesFn })

        case 'group':
          return ToolbarMenuRadioGroup.create(item, { overrideProps: radioGroupOverrides })

        case 'toggle':
          return ToolbarMenuItem.create(item, {
            defaultProps: () => ({ accessibility: toolbarMenuItemCheckboxBehavior }),
            overrideProps: itemOverridesFn,
          })

        default:
          return ToolbarMenuItem.create(item, {
            defaultProps: () => ({
              submenuIndicator,
              inSubmenu: submenu,
            }),
            overrideProps: itemOverridesFn,
          })
      }
    })
  }

  renderComponent({ ElementType, classes, accessibility, variables, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

ToolbarMenu.create = createShorthandFactory({ Component: ToolbarMenu, mappedArrayProp: 'items' })

/**
 * A ToolbarMenu creates a pop-up menu attached to a ToolbarItem.
 *
 * @accessibility
 * Implements pop-up menu (submenu) behavior of [ARIA Menu](https://www.w3.org/TR/wai-aria-practices-1.1/#menu) design pattern.
 */
export default withSafeTypeForAs<typeof ToolbarMenu, ToolbarMenuProps, 'ul'>(ToolbarMenu)
