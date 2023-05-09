import { TagButton } from './TagButton';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  dismissible: true,
};

describe('TagButton', () => {
  isConformant({
    Component: TagButton,
    displayName: 'TagButton',
    requiredProps,
  });
});
