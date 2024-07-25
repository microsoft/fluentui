import { isConformant } from '../../testing/isConformant';
import { AppItem } from './AppItem';

describe('AppItem', () => {
  isConformant({
    Component: AppItem,
    displayName: 'AppItem',
  });
});
