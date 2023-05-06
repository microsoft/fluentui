import { TagContent } from './TagContent';
import { isConformant } from '../../testing/isConformant';
import { TagContentProps } from './TagContent.types';

const requiredProps: TagContentProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('TagContent', () => {
  isConformant<TagContentProps>({
    Component: TagContent,
    displayName: 'TagContent',
    requiredProps,
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
});
