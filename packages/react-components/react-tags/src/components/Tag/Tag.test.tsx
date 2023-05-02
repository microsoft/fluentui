import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  dismissable: true,
};

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
  });
});
