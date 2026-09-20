import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { SearchBox } from '@fluentui/react-modern-components-preview/search-box';

export const Placeholder = (): React.ReactNode => {
  return (
    <Field label="SearchBox with a placeholder">
      <SearchBox placeholder="This is a placeholder" />
    </Field>
  );
};

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox can have placeholder text. If using the placeholder as a label (which is not ' +
        'recommended for usability), be sure to provide an `aria-label` for screen reader users.',
    },
  },
};
