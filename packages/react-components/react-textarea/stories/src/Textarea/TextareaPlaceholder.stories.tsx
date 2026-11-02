import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

export const Placeholder = (): JSXElement => (
  <Field label="Textarea with placeholder">
    <Textarea placeholder="type here..." />
  </Field>
);
