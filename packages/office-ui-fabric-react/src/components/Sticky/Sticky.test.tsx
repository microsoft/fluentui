import { Sticky } from './Sticky';
import { isConformant } from '../../common/isConformant';

describe('Sticky', () => {
  isConformant({
    Component: Sticky,
    displayName: 'Sticky',
    disabledTests: ['component-handles-classname'],
  });
});
