import { ChatMessageDetails } from 'src/components/Chat/ChatMessageDetails';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessage', () => {
  isConformant(ChatMessageDetails, {
    testPath: __filename,
    constructorName: 'ChatMessageDetails',
  });
});
