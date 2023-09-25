import { ChatMessageContent } from 'src/components/Chat/ChatMessageContent';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessageContent', () => {
  isConformant(ChatMessageContent, {
    testPath: __filename,
    constructorName: 'ChatMessageContent',
  });
});
