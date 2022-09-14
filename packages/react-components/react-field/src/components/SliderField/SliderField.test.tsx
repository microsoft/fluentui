import { isConformant } from '../../common/isConformant';
import { SliderField } from './SliderField';

describe('SliderField', () => {
  isConformant({
    Component: SliderField,
    displayName: 'SliderField',
  });

  // Most functionality is tested by Field.test.tsx, and Slider's tests
});
