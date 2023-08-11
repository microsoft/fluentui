import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';

export const Placeholder = () => (
  <Field label="Textarea with placeholder">
    <Textarea placeholder="type here..." />
  </Field>
);
