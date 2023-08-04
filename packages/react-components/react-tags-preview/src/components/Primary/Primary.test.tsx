import { isConformant } from '../../testing/isConformant';
import { Primary } from './Primary';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('Primary', () => {
  isConformant({
    Component: Primary,
    displayName: 'Primary',
    requiredProps,
  });
});
