import { ChatMyMessageLegacy } from './ChatMyMessageLegacy';
import { isConformant } from '../../../testing/isConformant';

describe('ChatMyMessageLegacy', () => {
  isConformant({
    Component: ChatMyMessageLegacy,
    displayName: 'ChatMyMessageLegacy',
  });
});
