import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Field, makeStyles, Option } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',
  },
});

export const WithField = (props: Partial<DropdownProps>): JSXElement => {
  const styles = useStyles();
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];
  return (
    <Field label="Best pet" required hint="Try picking 'Cat'" className={styles.root}>
      <Dropdown placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};

WithField.parameters = {
  docs: {
    description: {
      story: 'Field can be used with Dropdown to provide a label, description, error message, and more.',
    },
  },
};
