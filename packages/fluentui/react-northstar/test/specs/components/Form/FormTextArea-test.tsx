import { isConformant } from 'test/specs/commonTests';
import { FormTextArea } from 'src/components/Form/FormTextArea';

import { TextArea } from 'src/components/TextArea/TextArea';

describe('FormTextArea', () => {
  isConformant(FormTextArea, {
    testPath: __filename,
    constructorName: 'FormTextArea',
    forwardsRefTo: false,
    targetComponent: TextArea,
  });
});
