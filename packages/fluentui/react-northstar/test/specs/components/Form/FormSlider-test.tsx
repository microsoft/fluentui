import { isConformant } from 'test/specs/commonTests';
import FormSlider from 'src/components/Form/FormSlider';

describe('FormSlider', () => {
  isConformant(FormSlider, {
    constructorName: 'FormSlider',
    passesUnhandledPropsTo: 'Slider',
    eventTargets: {
      onChange: 'input',
      onKeyDown: 'input',
      onKeyPress: 'input',
      onKeyUp: 'input',
    },
  });
});
