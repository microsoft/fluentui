import { fieldConformanceTestOptions } from '@fluentui/react-field';
import { isConformant } from '../../common/isConformant';
import { TextareaField } from './TextareaField';

describe('TextareaField', () => {
  isConformant({
    Component: TextareaField,
    displayName: 'TextareaField',
    primarySlot: 'control',
    testOptions: fieldConformanceTestOptions,
  });

  // Most functionality is tested by Field.test.tsx, and Textarea's tests
});
