import { isConformant } from 'test/specs/commonTests';
import { FormSlider, formSliderClassName } from 'src/components/Form/FormSlider';
import { Slider, sliderClassName } from 'src/components/Slider/Slider';

describe('FormSlider', () => {
  isConformant(FormSlider, {
    testPath: __filename,
    constructorName: 'FormSlider',
    targetComponent: Slider,
    // TODO: point to correct once Slider will be using compose
    forwardsRefTo: false,
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
    getTargetElement: (result, attr) =>
      attr === 'className'
        ? result.container.querySelector(`.${formSliderClassName}`)
        : result.container.querySelector(`.${sliderClassName}`),
  });
});
