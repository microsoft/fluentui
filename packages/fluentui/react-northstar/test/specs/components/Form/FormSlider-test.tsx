import { isConformant } from 'test/specs/commonTests';
import { FormSlider } from 'src/components/Form/FormSlider';
import { Slider } from 'src/components/Slider/Slider';

describe('FormSlider', () => {
  isConformant(FormSlider, {
    constructorName: 'FormSlider',
    passesUnhandledPropsTo: Slider,
    // TODO: point to correct once Slider will be using compose
    forwardsRefTo: false,
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
  });
});
