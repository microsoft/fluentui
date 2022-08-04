import * as React from 'react';
import { Input, makeStyles, Slider, tokens } from '@fluentui/react-components';
import { Combobox, Option } from '@fluentui/react-combobox';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Size = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Small input" size="small">
        <Input />
      </Field>
      <Field label="Small slider" size="small">
        <Slider defaultValue={20} />
      </Field>
      <Field label="Medium input" size="medium">
        <Input />
      </Field>
      <Field label="Medium slider" size="medium">
        <Slider defaultValue={20} />
      </Field>
      <Field label="Large input" size="large">
        <Input />
      </Field>
      <Field label="Large ComboBox" size="large">
        <Combobox>
          <Option>Option one</Option>
          <Option>Option two</Option>
          <Option>Option three</Option>
        </Combobox>
      </Field>
    </div>
  );
};
