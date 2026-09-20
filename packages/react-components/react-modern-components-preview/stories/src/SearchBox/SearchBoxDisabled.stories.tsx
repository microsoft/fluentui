import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { SearchBox } from '@fluentui/react-modern-components-preview/search-box';

export const Disabled = (): React.ReactNode => {
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
