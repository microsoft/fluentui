import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, SearchBox } from '@fluentui/react-components';

export const Disabled = (): JSXElement => {
  return (
    <Field label="Disabled SearchBox">
      <SearchBox disabled defaultValue="disabled value" />
    </Field>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can be disabled.',
    },
  },
};
