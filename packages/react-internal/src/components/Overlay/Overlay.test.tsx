import { Overlay } from './Overlay';
import { isConformant } from '../../common/isConformant';

describe('Overlay', () => {
  isConformant({
    Component: Overlay,
    displayName: 'Overlay',
    // Problem: Doesn’t apply ref to the root element.
    // Solution: Ensure that the ref is applied to the root element.
    disabledTests: ['component-has-root-ref'],
  });
});
