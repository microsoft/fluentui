import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';

export const Placeholder = (): React.ReactNode => (
  <Field label="Textarea with placeholder">
    <Textarea placeholder="type here..." />
  </Field>
);
