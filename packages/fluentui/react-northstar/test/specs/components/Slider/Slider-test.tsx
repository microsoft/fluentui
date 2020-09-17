import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { Slider } from 'src/components/Slider/Slider';

describe('Slider', () => {
  isConformant(Slider, {
    testPath: __filename,
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
