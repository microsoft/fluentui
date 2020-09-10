import { VerticalDivider } from './VerticalDivider';
import { isConformant } from '../../common/isConformant';

describe('VerticalDivider', () => {
  isConformant({
    Component: VerticalDivider,
    displayName: 'VerticalDivider',
    disabledTests: ['has-top-level-file'],
  });
});
