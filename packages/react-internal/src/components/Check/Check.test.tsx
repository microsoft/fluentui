import { Check } from './Check';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  isConformant({
    Component: Check,
    displayName: 'Check',
    // Problem: Is FunctionComponent but missing `forwardRef`
    // Solution: add forwardRef and ref typing
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
