import { Check } from './Check';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  isConformant({
    Component: Check,
    displayName: 'Check',
    // Problem: Doesn’t pass ref to root element.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
