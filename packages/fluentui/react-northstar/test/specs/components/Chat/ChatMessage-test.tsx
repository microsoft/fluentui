import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import { ChatMessage } from 'src/components/Chat/ChatMessage';
import { Text } from 'src/components/Text/Text';
import { Box } from 'src/components/Box/Box';
import { ChatMessageDetails } from 'src/components/Chat/ChatMessageDetails';

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
  chatMessageImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' });

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage);
  });
});
