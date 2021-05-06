import { ChatMessageReadStatus } from 'src/components/Chat/ChatMessageReadStatus';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessageReadStatus', () => {
  isConformant(ChatMessageReadStatus, {
    testPath: __filename,
    constructorName: 'ChatMessageReadStatus',
  });
});
