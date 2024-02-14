import * as React from 'react';
import { Field, SearchBox } from '@fluentui/react-components';

export const Placeholder = () => {
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
