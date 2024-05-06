import { isConformant } from '../../testing/isConformant';
import { Hamburger } from './Hamburger';

describe('Hamburger', () => {
  isConformant({
    Component: Hamburger,
    displayName: 'Hamburger',
  });
});
