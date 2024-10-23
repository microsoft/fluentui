import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from './InteractionTagPrimary';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('InteractionTagPrimary', () => {
  isConformant({
    Component: InteractionTagPrimary,
    displayName: 'InteractionTagPrimary',
    requiredProps,
  });
});
