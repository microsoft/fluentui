import { isConformant } from '../../common/isConformant';
import { Card } from './Card';

describe('Card', () => {
  isConformant({
    Component: Card,
    displayName: 'Card',
  });
});
