import {
  Accessibility,
  IS_FOCUSABLE_ATTRIBUTE,
  chatMessageBehavior,
  menuAsToolbarBehavior,
} from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import { Ref } from '@fluentui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import * as _ from 'lodash'
import { Popper } from '../../utils/positioner'

import {
  childrenExist,
  createShorthandFactory,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils'
import {
  WithAsProp,
  ShorthandValue,
  ComponentEventHandler,
  withSafeTypeForAs,
  ShorthandCollection,
} from '../../types'

import Box, { BoxProps } from '../Box/Box'
import Label, { LabelProps } from '../Label/Label'
import Menu, { MenuProps } from '../Menu/Menu'
import { MenuItemProps } from '../Menu/MenuItem'
import Text, { TextProps } from '../Text/Text'
import Reaction, { ReactionProps } from '../Reaction/Reaction'
import { ReactionGroupProps } from '../Reaction/ReactionGroup'
import { ComponentSlotStylesResolved } from '@fluentui/styles'

export interface ChatMessageSlotClassNames {
  actionMenu: string
  author: string
  timestamp: string
  badge: string
  content: string
  reactionGroup: string
}

export interface ChatMessageProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Menu with actions of the message. */
  actionMenu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom'

  /** Author of the message. */
  author?: ShorthandValue<TextProps>

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<TextProps>

  /** Badge attached to the message. */
  badge?: ShorthandValue<LabelProps>

  /** A message can format the badge to appear at the start or the end of the message. */
  badgePosition?: 'start' | 'end'

  /**
   * Called after user's blur.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<ChatMessageProps>

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ChatMessageProps>

  /**
   * Called after user enters by mouse.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMouseEnter?: ComponentEventHandler<ChatMessageProps>

  /** Allows suppression of action menu positioning for performance reasons */
  positionActionMenu?: boolean

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end'

  /** Positions an actionMenu slot in "fixed" mode. */
  unstable_overflow?: boolean
}

export interface ChatMessageState {
  focused: boolean
  messageNode: HTMLElement
}

class ChatMessage extends UIComponent<WithAsProp<ChatMessageProps>, ChatMessageState> {
  static className = 'ui-chat__message'

  static create: ShorthandFactory<ChatMessageProps>

  static slotClassNames: ChatMessageSlotClassNames

  static displayName = 'ChatMessage'

  static __isChatMessage = true

  static isTypeOfElement = element => _.get(element, `type.__isChatMessage`)

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    actionMenu: customPropTypes.itemShorthand,
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    author: customPropTypes.itemShorthand,
    badge: customPropTypes.itemShorthand,
    badgePosition: PropTypes.oneOf(['start', 'end']),
    mine: PropTypes.bool,
    timestamp: customPropTypes.itemShorthand,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    positionActionMenu: PropTypes.bool,
    reactionGroup: PropTypes.oneOfType([
      customPropTypes.collectionShorthand,
      customPropTypes.itemShorthand,
    ]),
    reactionGroupPosition: PropTypes.oneOf(['start', 'end']),
    unstable_overflow: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: chatMessageBehavior,
    as: 'div',
    badgePosition: 'end',
    positionActionMenu: true,
    reactionGroupPosition: 'start',
  }

  updateActionsMenuPosition = () => {}

  state = {
    focused: false,
    messageNode: null,
  }

  menuRef = React.createRef<HTMLElement>()

  actionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys
    // as navigation (only Tab key should work)
    preventDefault: event => {
      // preventDefault only if event coming from inside the message
      if (event.currentTarget !== event.target) {
        event.preventDefault()
      }
    },

    focus: event => {
      if (this.state.messageNode) {
        this.state.messageNode.focus()
        event.stopPropagation()
      }
    },
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.updateActionsMenuPosition()

    this.setState({ focused: true })
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    // `this.state.focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', (e as any).relatedTarget)

    this.setState({ focused: shouldPreserveFocusState })
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleMouseEnter = (e: React.SyntheticEvent) => {
    this.updateActionsMenuPosition()
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  handleMessageRef = (node: HTMLElement) => this.setState({ messageNode: node })

  renderActionMenu(
    actionMenu: ChatMessageProps['actionMenu'],
    styles: ComponentSlotStylesResolved,
  ) {
    const { unstable_overflow: overflow, positionActionMenu } = this.props
    const { messageNode } = this.state

    const actionMenuElement = Menu.create(actionMenu, {
      defaultProps: () => ({
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        accessibility: menuAsToolbarBehavior,
        className: ChatMessage.slotClassNames.actionMenu,
        styles: styles.actionMenu,
      }),
    })

    if (!actionMenuElement) {
      return actionMenuElement
    }

    const menuRect: DOMRect = (positionActionMenu &&
      _.invoke(this.menuRef.current, 'getBoundingClientRect')) || {
      height: 0,
    }
    const messageRect: DOMRect = (positionActionMenu &&
      _.invoke(messageNode, 'getBoundingClientRect')) || { height: 0 }

    return (
      <Popper
        enabled={positionActionMenu}
        align="end"
        modifiers={
          positionActionMenu && {
            // https://popper.js.org/popper-documentation.html#modifiers..flip.behavior
            // Forces to flip only in "top-*" positions
            flip: { behavior: ['top'] },
            preventOverflow: {
              escapeWithReference: false,
              // https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.priority
              // Forces to stop prevent overflow on bottom and bottom
              priority: ['left', 'right'],

              // Is required to properly position action items
              ...(overflow && {
                boundariesElement: 'scrollParent',
                escapeWithReference: true,
                padding: { top: messageRect.height - menuRect.height },
              }),
            },
          }
        }
        position="above"
        positionFixed={overflow}
        targetRef={messageNode}
      >
        {({ scheduleUpdate }) => {
          this.updateActionsMenuPosition = scheduleUpdate

          return <Ref innerRef={this.menuRef}>{actionMenuElement}</Ref>
        }}
      </Popper>
    )
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatMessageProps>) {
    const {
      actionMenu,
      author,
      badge,
      badgePosition,
      children,
      content,
      timestamp,
      reactionGroup,
      reactionGroupPosition,
    } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root
    const badgeElement = Label.create(badge, {
      defaultProps: () => ({
        className: ChatMessage.slotClassNames.badge,
        styles: styles.badge,
      }),
    })

    const reactionGroupElement = Reaction.Group.create(reactionGroup, {
      defaultProps: () => ({
        className: ChatMessage.slotClassNames.reactionGroup,
        styles: styles.reactionGroup,
      }),
    })

    const actionMenuElement = this.renderActionMenu(actionMenu, styles)

    const authorElement = Text.create(author, {
      defaultProps: () => ({
        size: 'small',
        styles: styles.author,
        className: ChatMessage.slotClassNames.author,
      }),
    })

    const timestampElement = Text.create(timestamp, {
      defaultProps: () => ({
        size: 'small',
        styles: styles.timestamp,
        timestamp: true,
        className: ChatMessage.slotClassNames.timestamp,
      }),
    })

    const messageContent = Box.create(content, {
      defaultProps: () => ({
        className: ChatMessage.slotClassNames.content,
        styles: styles.content,
      }),
    })

    return (
      <Ref innerRef={this.handleMessageRef}>
        <ElementType
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseEnter={this.handleMouseEnter}
          className={className}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
        >
          {childrenPropExists ? (
            children
          ) : (
            <>
              {actionMenuElement}
              {badgePosition === 'start' && badgeElement}
              {authorElement}
              {timestampElement}
              {reactionGroupPosition === 'start' && reactionGroupElement}
              {messageContent}
              {reactionGroupPosition === 'end' && reactionGroupElement}
              {badgePosition === 'end' && badgeElement}
            </>
          )}
        </ElementType>
      </Ref>
    )
  }
}

ChatMessage.create = createShorthandFactory({ Component: ChatMessage, mappedProp: 'content' })
ChatMessage.slotClassNames = {
  actionMenu: `${ChatMessage.className}__actions`,
  author: `${ChatMessage.className}__author`,
  timestamp: `${ChatMessage.className}__timestamp`,
  badge: `${ChatMessage.className}__badge`,
  content: `${ChatMessage.className}__content`,
  reactionGroup: `${ChatMessage.className}__reactions`,
}

/**
 * A ChatMessage represents a single message in chat.
 */
export default withSafeTypeForAs<typeof ChatMessage, ChatMessageProps>(ChatMessage)
