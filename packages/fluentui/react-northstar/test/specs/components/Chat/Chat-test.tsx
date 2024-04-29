import * as React from 'react';

import { handlesAccessibility, isConformant, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';

import { Chat } from 'src/components/Chat/Chat';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { ChatItem } from 'src/components/Chat/ChatItem';

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat);

describe('Chat', () => {
  isConformant(Chat, {
    testPath: __filename,
    constructorName: 'Chat',
    skipAsPropTests: 'as-component',
  });
  chatImplementsCollectionShorthandProp('items', ChatItem, { mapsValueToProp: 'message' });

  describe('accessibility', () => {
    handlesAccessibility(Chat);
  });

  describe('child behaviors', () => {
    const items = [
      {
        key: 'item-1',
        message: <Chat.Message key="message-1" content="Hello" author="Robert Tolbert" timestamp="10:15 PM" mine />,
      },
    ];

    it('uses default when not overriden', () => {
      const chatMessage = mountWithProvider(<Chat items={items} />).find('ChatMessage');
      expect(getRenderedAttribute(chatMessage, 'role', '')).toBe(undefined);
    });

    it('uses child behavior for message', () => {
      const messageBehavior = () => ({
        attributes: {
          root: {
            role: 'button' as const,
          },
        },
      });
      const chatBehavior = () => ({
        childBehaviors: {
          message: messageBehavior,
        },
      });

      const chatMessage = mountWithProvider(<Chat accessibility={chatBehavior} items={items} />).find('ChatMessage');
      expect(getRenderedAttribute(chatMessage, 'role', '')).toBe('button');
    });
  });
});
