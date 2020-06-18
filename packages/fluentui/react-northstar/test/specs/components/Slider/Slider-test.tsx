import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { isConformant as newIsConformant } from '@fluentui/react-conformance';
import { mountWithProvider as mount } from 'test/utils';
import Slider from 'src/components/Slider/Slider';

describe('Slider', () => {
  newIsConformant({
    componentPath: __dirname.replace(/test.*/, 'src/components/Slider/Slider.tsx'),
    Component: Slider,
    displayName: 'Slider',
    isInternal: false,
    customMount: mount,
    disabledTests: ['has-docblock'],
  });

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
