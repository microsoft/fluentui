import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Chat, Divider, Avatar, Props } from '@fluentui/react-northstar';

import { ChatData, ChatItemTypes, generateChatProps } from './services';
import chatProtoStyle from './chatProtoStyle';

export type ChatPaneContainerProps = Props<{ chat: ChatData }>;

class ChatPaneContainer extends React.PureComponent<ChatPaneContainerProps> {
  render() {
    const { chat } = this.props;
    const items = this.generateChatItems(chat);

    return (
      items.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <div
            role="main"
            aria-label="Message list. In forms mode: press Enter to explore message content, then use Escape to shift focus back to the message"
          >
            <div
              id="chat-pane-reader-text"
              style={chatProtoStyle.screenReaderContainerStyles}
              role="heading"
              aria-level={2}
            >
              Message list.
            </div>
            <Chat items={items} styles={{ padding: '0 32px' }} />
          </div>
        </Scrollbars>
      )
    );
  }

  generateChatItems(chat: ChatData): JSX.Element[] {
    return generateChatProps(chat).map(({ mine, gutter, message: { itemType, ...props } }, index) => {
      const ElementType = this.getElementType(itemType);
      const maybeAttributesForDivider =
        itemType === ChatItemTypes.divider
          ? {
              role: 'heading',
              'aria-level': 3,
            }
          : {};
      return (
        <Chat.Item
          key={`chat-item-${index}`}
          contentPosition={mine ? 'end' : 'start'}
          gutter={gutter && <Avatar {...gutter} />}
          message={
            <>
              {itemType === ChatItemTypes.message && (
                <div style={chatProtoStyle.screenReaderContainerStyles} role="heading" aria-level={4}>
                  {this.getMessagePreviewForScreenReader(props)}
                </div>
              )}
              <ElementType {...props} {...maybeAttributesForDivider} />
            </>
          }
        />
      );
    });
  }

  getElementType = (itemType: ChatItemTypes): React.ElementType => {
    switch (itemType) {
      case ChatItemTypes.message:
        return Chat.Message;
      case ChatItemTypes.divider:
        return Divider;
    }
  };

  handleScrollRef(scrollRef: Scrollbars) {
    if (scrollRef) {
      scrollRef.scrollToBottom();
    }
  }

  getMessagePreviewForScreenReader(props) {
    /*  Show the first 44 characters from the message, reasons:
          - as NVDA splits it into 2 lines if more is shown
          - for announcements feature, messaging team went with 44 characters but that was not based on loc issues but some UI real estate issue.  */
    const messageText = props.text || '';
    return `${messageText.slice(0, 44)} ..., by ${
      typeof props.author === 'object' ? props.author.content : props.author
    }`;
  }
}

export default ChatPaneContainer;
