import { ChatMessageLegacy } from './ChatMessageLegacy';
import { isConformant } from '../../../testing/isConformant';

describe('ChatMessageLegacy', () => {
  isConformant({
    Component: ChatMessageLegacy,
    displayName: 'ChatMessageLegacy',
  });
});
