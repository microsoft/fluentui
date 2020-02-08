import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import Slider from 'src/components/Slider/Slider';

describe('Slider', () => {
  isConformant(Slider, {
    constructorName: 'Slider',
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input'
    }
  });

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' });
  });
});
