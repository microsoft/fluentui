import { handlesAccessibility, isConformant } from 'test/specs/commonTests';

import { Chat } from 'src/components/Chat/Chat';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { ChatItem } from 'src/components/Chat/ChatItem';

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat);

describe('Chat', () => {
  isConformant(Chat, {
    defaultAs: 'span',
    testPath: __filename,
    constructorName: 'Chat',
    skipAsPropTests: 'as-component',
  });
  chatImplementsCollectionShorthandProp('items', ChatItem, { mapsValueToProp: 'message' });

  describe('accessibility', () => {
    handlesAccessibility(Chat);
  });
});
