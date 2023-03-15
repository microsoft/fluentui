import { isConformant } from '../../../testing/isConformant';
import { ChatLegacy } from './ChatLegacy';

describe('ChatLegacy', () => {
  isConformant({
    Component: ChatLegacy,
    displayName: 'ChatLegacy',
  });
});
