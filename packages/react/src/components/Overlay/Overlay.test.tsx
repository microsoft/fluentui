import { Overlay } from './Overlay';
import { isConformant } from '../../common/isConformant';

describe('Overlay', () => {
  isConformant({
    Component: Overlay,
    displayName: 'Overlay',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
