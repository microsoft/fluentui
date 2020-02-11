import { Accessibility, chatBehavior } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  UIComponent,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../utils'
import ChatItem, { ChatItemProps } from './ChatItem'
import ChatMessage from './ChatMessage'
import { WithAsProp, withSafeTypeForAs, ShorthandCollection } from '../../types'
import { UIComponentProps, ChildrenComponentProps } from '../../utils/commonPropInterfaces'

export interface ChatSlotClassNames {
  item: string
}

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandCollection<ChatItemProps>
}

class Chat extends UIComponent<WithAsProp<ChatProps>, any> {
  static displayName = 'Chat'

  static className = 'ui-chat'

  static slotClassNames: ChatSlotClassNames = {
    item: `${Chat.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),
  }

  static defaultProps = {
    accessibility: chatBehavior,
    as: 'ul',
  }

  static Item = ChatItem
  static Message = ChatMessage

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, items } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children)
          ? children
          : _.map(items, item =>
              ChatItem.create(item, {
                defaultProps: () => ({ className: Chat.slotClassNames.item }),
              }),
            )}
      </ElementType>
    )
  }
}

/**
 * A Chat displays messages from a conversation between multiple users.
 */
export default withSafeTypeForAs<typeof Chat, ChatProps, 'ul'>(Chat)
