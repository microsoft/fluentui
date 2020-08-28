import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { sharedIsConformant } from 'test/utils';
import { Slider } from 'src/components/Slider/Slider';

describe('Slider', () => {
  sharedIsConformant({ Component: Slider, displayName: 'Slider' }, __filename);

  isConformant(Slider, {
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
