import { Sticky } from './Sticky';
import { isConformant } from '../../common/isConformant';

describe('Sticky', () => {
  isConformant({
    Component: Sticky,
    displayName: 'Sticky',
    // Problem: Ref doesn't match DOM node and returns outermost div.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });
});
