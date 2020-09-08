import { Check } from './Check';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  isConformant({
    Component: Check,
    displayName: 'Check',
    disabledTests: ['component-has-displayname'],
  });
});
