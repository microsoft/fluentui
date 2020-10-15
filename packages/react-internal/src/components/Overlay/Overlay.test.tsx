import { Overlay } from './Overlay';
import { isConformant } from '../../common/isConformant';

describe('Overlay', () => {
  isConformant({
    Component: Overlay,
    displayName: 'Overlay',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
