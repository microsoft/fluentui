import { isConformant as isConformantBase, handlesAccessibility } from 'test/specs/commonTests';
import { isConformant } from 'test/utils';
import { Slider } from 'src/components/Slider/Slider';

describe('Slider', () => {
  isConformant({ Component: Slider, displayName: 'Slider' }, __filename);

  isConformantBase(Slider, {
    constructorName: 'Slider',
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
    autoControlledProps: ['value'],
  });

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' });
  });
});
