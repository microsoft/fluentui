import { VerticalDivider } from './VerticalDivider';
import { isConformant } from '../../common/isConformant';

describe('VerticalDivider', () => {
  isConformant({
    Component: VerticalDivider,
    displayName: 'VerticalDivider',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['has-top-level-file', 'component-handles-ref', 'component-has-root-ref'],
  });
});
