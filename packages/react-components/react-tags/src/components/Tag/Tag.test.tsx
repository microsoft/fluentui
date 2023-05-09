import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  dismissible: true,
  icon: 'i',
  media: 'media',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
  });
});
