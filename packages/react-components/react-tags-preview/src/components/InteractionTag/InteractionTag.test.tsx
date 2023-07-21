import { InteractionTag } from './InteractionTag';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  dismissible: true,
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });
});
