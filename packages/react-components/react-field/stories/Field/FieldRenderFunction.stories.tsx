import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';
import { AnimalCat24Regular } from '@fluentui/react-icons';

export const RenderFunction = () => (
  <Field label="Field with a render function">
    {inputProps => (
      <div>
        <AnimalCat24Regular style={{ verticalAlign: 'middle' }} />
        <Input {...inputProps} />
      </div>
    )}
  </Field>
);

RenderFunction.storyName = 'Complex content in a Field';
RenderFunction.parameters = {
  docs: {
    description: {
      story:
        'Normally, the child of Field must be a single form control that can take `FieldChildProps` to associate it ' +
        'with its label and message text. If the props need to be spread on a different element, use a render ' +
        'function as the child of Field. See the code in this example for more details.',
    },
  },
};
