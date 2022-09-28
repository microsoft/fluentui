import { Persona } from './Persona';
import { isConformant } from '../../common/isConformant';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
    disabledTests: ['component-has-static-classnames-object'],
  });
});
