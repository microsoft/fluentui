import * as React from 'react';
import { SearchBox } from '@fluentui/react-search-preview';
import { Field } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search-preview';

export const Controlled = () => {
  const [value, setValue] = React.useState('initial value');
  const [valid, setValid] = React.useState(true);

  const onChange: SearchBoxProps['onChange'] = (ev, data) => {
    if (data.value.length <= 20) {
      setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <Field
      label="Controlled SearchBox limiting the value to 20 characters"
      validationState={valid ? 'none' : 'warning'}
      validationMessage={valid ? '' : 'Input is limited to 20 characters.'}
    >
      <SearchBox value={value} onChange={onChange} />
    </Field>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        "A SearchBox can be controlled: the consuming component tracks the SearchBox's value in its state " +
        'and manually handles all updates.',
    },
  },
};
