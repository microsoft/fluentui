import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Field label="Disabled Textarea">
    <Textarea disabled />
  </Field>
);
