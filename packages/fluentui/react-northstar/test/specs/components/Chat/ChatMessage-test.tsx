import * as React from 'react';

import { LikeIcon } from '@fluentui/react-icons-northstar';

import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests';
import { mountWithProvider, EmptyThemeProvider } from 'test/utils';

import { ChatMessage } from 'src/components/Chat/ChatMessage';
import { Text } from 'src/components/Text/Text';
import { ChatMessageDetails } from 'src/components/Chat/ChatMessageDetails';
import { ChatMessageContent } from 'src/components/Chat/ChatMessageContent';
import * as positionerApi from 'src/utils/positioner';

const chatMessageImplementsShorthandProp = implementsShorthandProp(ChatMessage);

describe('ChatMessage', () => {
  isConformant(ChatMessage, {
    testPath: __filename,
    constructorName: 'ChatMessage',
    skipAsPropTests: 'as-component',
  });

  // Temporary disabled as implementsPopper() should be reimplemented
  // chatMessageImplementsShorthandProp('actionMenu', Menu, { implementsPopper: true });
  chatMessageImplementsShorthandProp('author', Text);
  chatMessageImplementsShorthandProp('timestamp', Text);
  chatMessageImplementsShorthandProp('details', ChatMessageDetails);
  chatMessageImplementsShorthandProp('content', ChatMessageContent);

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage);
  });

  describe.only('rtl', () => {
    let usePopperSpy;
    beforeEach(() => {
      jest.clearAllMocks();
      usePopperSpy = jest.spyOn(positionerApi, 'usePopper');
    });

    function render(wrappingComponent?: React.ComponentType) {
      const actionMenu = {
        iconOnly: true,
        items: [
          {
            key: 'like',
            icon: <LikeIcon />,
            title: 'Like',
          },
        ],
      };

      mountWithProvider(
        <ChatMessage
          actionMenu={actionMenu}
          key="message-1"
          content="Hello"
          author="Robert Tolbert"
          timestamp="10:15 PM"
          mine
        />,
        { wrappingComponent },
      );
    }
    it('should pass rtl parameter as true to usePopper in RTL', () => {
      const RTLProvider = props => <EmptyThemeProvider {...props} rtl={true} />;
      render(RTLProvider);

      expect(usePopperSpy).toHaveBeenCalledTimes(1);
      expect(usePopperSpy).toHaveBeenCalledWith(expect.objectContaining({ rtl: true }));
    });

    it('should pass rtl parameter as undefined to usePopper in LTR', () => {
      render();

      expect(usePopperSpy).toHaveBeenCalledTimes(1);
      expect(usePopperSpy).toHaveBeenCalledWith(expect.objectContaining({ rtl: undefined }));
    });
  });
});
