import { ChatMessageReadStatusIndicator } from 'src/components/Chat/ChatMessageReadStatusIndicator';
import { isConformant } from 'test/specs/commonTests';

describe('ChatMessageReadStatusIndicator', () => {
  isConformant(ChatMessageReadStatusIndicator, {
    constructorName: 'ChatMessageReadStatusIndicator',
  });
});
