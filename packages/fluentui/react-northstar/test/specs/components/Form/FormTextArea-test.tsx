import { isConformant } from 'test/specs/commonTests';
import { FormTextArea, formTextAreaClassName } from 'src/components/Form/FormTextArea';

import { TextArea } from 'src/components/TextArea/TextArea';

describe('FormTextArea', () => {
  isConformant(FormTextArea, {
    testPath: __filename,
    constructorName: 'FormTextArea',
    forwardsRefTo: false,
    targetComponent: TextArea,
    getTargetElement: (result, attr) =>
      attr === 'className' ? result.container.querySelector(`.${formTextAreaClassName}`) : result.getByRole('textbox'),
  });
});
