import { isConformant } from '../../testing/isConformant';
import { SliderField } from './SliderField';

describe('SliderField', () => {
  isConformant({
    Component: SliderField,
    displayName: 'SliderField',
    primarySlot: 'control',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'label text',
            validationState: 'error',
            validationMessage: 'validation message text',
            hint: 'hint text',
          },
        },
      ],
    },
    disabledTests: ['exported-top-level'], // TODO re-enable once component is exported without _unstable
  });

  // Most functionality is tested by Field.test.tsx, and Slider's tests
});
