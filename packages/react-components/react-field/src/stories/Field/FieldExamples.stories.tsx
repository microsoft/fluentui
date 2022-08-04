import * as React from 'react';
import {
  Checkbox,
  Input,
  makeStyles,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  tokens,
} from '@fluentui/react-components';
import { Combobox, Option } from '@fluentui/react-combobox';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '480px',
  },
});

export const Examples = () => {
  const styles = useStyles();
  const [radioValue, setRadioValue] = React.useState('one');
  return (
    <div className={styles.stack}>
      <Field label="Input" labelPosition="before">
        <Input />
      </Field>
      <Field label="Combobox" labelPosition="before">
        <Combobox>
          <Option>Option one</Option>
          <Option>Option two</Option>
          <Option>Option three</Option>
        </Combobox>
      </Field>
      <Field
        label="Radio"
        labelPosition="before"
        status={radioValue !== 'three' ? 'error' : 'success'}
        statusText={radioValue !== 'three' ? 'Please select option three' : 'Great!'}
      >
        <RadioGroup value={radioValue} onChange={(_ev, data) => setRadioValue(data.value)}>
          <Radio value="one" label="Option one" />
          <Radio value="two" label="Option two" />
          <Radio value="three" label="Option three" />
        </RadioGroup>
      </Field>
      <Field labelPosition="before" helperText="Prefer Checkbox's built-in label instead of the Field label">
        <Checkbox label="Checkbox" />
      </Field>
      <Field labelPosition="before" helperText="Prefer Switch's built-in label instead of the Field label">
        <Switch label="Switch" />
      </Field>
      <Field label="Slider" labelPosition="before">
        <Slider defaultValue={20} />
      </Field>
      <Field label="Spin button" labelPosition="before">
        <SpinButton min={1} max={99} />
      </Field>
    </div>
  );
};

Examples.parameters = {
  docs: {
    description: {
      story: 'Field can be used with any form input',
    },
  },
};
