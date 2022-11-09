import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { SliderField } from './SliderField';

describe('SliderField', () => {
  isConformant({
    Component: SliderField,
    displayName: 'SliderField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and Slider's tests
});
