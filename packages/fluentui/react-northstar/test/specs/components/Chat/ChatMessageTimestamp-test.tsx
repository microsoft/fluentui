import { ChatMessageTimestamp } from 'src/components/Chat/ChatMessageTimestamp';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessage', () => {
  isConformant(ChatMessageTimestamp, {
    testPath: __filename,
    constructorName: 'ChatMessageTimestamp',
  });
});
