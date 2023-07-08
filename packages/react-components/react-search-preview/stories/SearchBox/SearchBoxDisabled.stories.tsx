import * as React from 'react';
import { SearchBox } from '@fluentui/react-search-preview';
import { Field } from '@fluentui/react-components';

export const Disabled = () => {
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
