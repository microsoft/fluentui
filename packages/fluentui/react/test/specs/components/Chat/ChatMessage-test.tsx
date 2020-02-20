import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests';

import ChatMessage from 'src/components/Chat/ChatMessage';
import Text from 'src/components/Text/Text';
import Box from 'src/components/Box/Box';

const chatMessageImplementsShorthandProp = implementsShorthandProp(ChatMessage);

describe('ChatMessage', () => {
  isConformant(ChatMessage, {
    constructorName: 'ChatMessage'
  });

  chatMessageImplementsShorthandProp('author', Text);
  chatMessageImplementsShorthandProp('timestamp', Text);
  chatMessageImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' });

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage);
  });
});
