import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@fluentui/react-proptypes'
import { Ref } from '@fluentui/react-component-ref'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils'
import { mergeComponentVariables } from '@fluentui/styles'

import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'
import {
  Accessibility,
  toolbarRadioGroupBehavior,
  toolbarRadioGroupItemBehavior,
} from '@fluentui/accessibility'

import ToolbarDivider from './ToolbarDivider'
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem'

export type ToolbarRadioGroupItemShorthandKinds = 'divider' | 'item'

export interface ToolbarRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Index of the currently active item. */
  activeIndex?: number

  /** Shorthand array of props for ToolbarRadioGroup. */
  items?: ShorthandCollection<ToolbarItemProps, ToolbarRadioGroupItemShorthandKinds>
}

class ToolbarRadioGroup extends UIComponent<WithAsProp<ToolbarRadioGroupProps>> {
  static displayName = 'ToolbarRadioGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: ShorthandFactory<ToolbarRadioGroupProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    activeIndex: PropTypes.number,
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: toolbarRadioGroupBehavior as Accessibility,
  }

  itemRefs: React.RefObject<HTMLElement>[] = []

  actionHandlers = {
    nextItem: event => this.setFocusedItem(event, 1),
    prevItem: event => this.setFocusedItem(event, -1),
  }

  setFocusedItem = (event, direction) => {
    const { items } = this.props

    // filter items which are not disabled
    const filteredRadioItems: React.RefObject<HTMLElement>[] = _.filter(
      this.itemRefs,
      (item, index) => {
        const currentItem = items[index] as ToolbarItemProps
        return currentItem && !currentItem.disabled
      },
    )

    // get the index of currently focused element (w/ tabindex = 0) or the first one as default
    const currentFocusedIndex =
      _.findIndex(filteredRadioItems, (item: React.RefObject<HTMLElement>) => {
        return item.current.tabIndex === 0
      }) || 0

    const itemsLength = filteredRadioItems.length
    let nextIndex = currentFocusedIndex + direction

    if (nextIndex >= itemsLength) {
      nextIndex = 0
    }

    if (nextIndex < 0) {
      nextIndex = itemsLength - 1
    }

    const nextItemToFocus = filteredRadioItems[nextIndex].current
    if (nextItemToFocus) {
      nextItemToFocus.focus()
    }

    if (this.context.target.activeElement === nextItemToFocus) {
      event.stopPropagation()
    }
    event.preventDefault()
  }

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(variables) {
    const { activeIndex, items } = this.props
    const itemOverridesFn = this.handleItemOverrides(variables)
    this.itemRefs = []

    return _.map(items, (item, index) => {
      const kind = _.get(item, 'kind', 'item')

      const ref = React.createRef<HTMLElement>()
      this.itemRefs[index] = ref

      if (kind === 'divider') {
        return ToolbarDivider.create(item, { overrideProps: itemOverridesFn })
      }

      const toolbarItem = ToolbarItem.create(item, {
        defaultProps: () => ({
          accessibility: toolbarRadioGroupItemBehavior,
          active: activeIndex === index,
        }),
        overrideProps: itemOverridesFn,
      })

      return (
        <Ref innerRef={ref} key={toolbarItem.key}>
          {toolbarItem}
        </Ref>
      )
    })
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

ToolbarRadioGroup.create = createShorthandFactory({
  Component: ToolbarRadioGroup,
  mappedProp: 'content',
})

/**
 * A ToolbarRadioGroup renders Toolbar item as a group of mutually exclusive options.
 * Component doesn't implement mutual exclusiveness, it just serves accessibility purposes.
 *
 * @accessibility
 * Implements [ARIA RadioGroup](https://www.w3.org/TR/wai-aria-practices/#radiobutton) design pattern.
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(
  ToolbarRadioGroup,
)
