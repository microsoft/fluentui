import { ChatMessageHeader } from 'src/components/Chat/ChatMessageHeader';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessageHeader', () => {
  isConformant(ChatMessageHeader, {
    testPath: __filename,
    constructorName: 'ChatMessageHeader',
  });
});
