import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';

export const Disabled = (): React.ReactNode => (
  <Field label="Disabled Textarea">
    <Textarea disabled />
  </Field>
);
