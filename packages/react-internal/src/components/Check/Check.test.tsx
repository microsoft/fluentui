import { Check } from './Check';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  isConformant({
    Component: Check,
    displayName: 'Check',
    // Problem: Ref isn't passed.
    // Solution: Ref should be added and passed onto the root.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
