import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search';

const onChange: SearchBoxProps['onChange'] = (ev, data) => {
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  return (
    <Field label="Uncontrolled SearchBox with default value">
      <SearchBox defaultValue="default value" onChange={onChange} />
    </Field>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'By default, a SearchBox is uncontrolled: it tracks all updates internally. ' +
        'You can optionally provide a default value.',
    },
  },
};
