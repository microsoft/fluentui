import * as React from 'react';
import { Label, LabelProps } from '@fluentui/react-label';
import { makeStyles } from '@fluentui/react-make-styles';
import { Checkbox, Dropdown, IDropdownOption, TextField } from '@fluentui/react';

const useStyles = makeStyles({
  exampleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  },

  labelContainer: {
    backgroundColor: 'whitesmoke',
    padding: '10px',
    alignSelf: 'center',
  },

  configurationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: 'whitesmoke',
    padding: '20px',
  },

  textField: {
    height: '20px',
    width: '150px',
  },

  checkbox: {
    display: 'flex',
    flexDirection: 'row',
  },

  multilineContainer: {
    width: '200px',
    padding: '20px',
  },
});

const SizeOptions = [
  { key: 'small', text: 'Small' },
  { key: 'medium', text: 'Medium' },
  { key: 'large', text: 'Large' },
];

export const CustomizableLabelExample = () => {
  const styles = useStyles();
  const [labelText, setLabelText] = React.useState("I'm a label");
  const [requiredText, setRequiredText] = React.useState<string | undefined>('*');
  const [strong, setStrong] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [size, setSize] = React.useState<LabelProps['size']>('medium');

  const updateLabelText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, val?: string) => {
    if (val) {
      setLabelText(val);
    }
  };

  const updateRequiredText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, val?: string) => {
    setRequiredText(val);
  };

  const updateStrong = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    setStrong(checked!);
  };

  const updateDisabled = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    setDisabled(checked!);
  };

  const updateRequired = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    setRequired(checked!);
  };

  const updateSize = (ev?: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
    if (item && typeof item.key === 'string') {
      setSize(item.key as LabelProps['size']);
    }
  };

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.configurationContainer}>
        <div>
          <Label strong>Text</Label>
          <TextField placeholder="I'm a label" onChange={updateLabelText} className={styles.textField} />
        </div>
        <div className={styles.checkbox}>
          <Checkbox onChange={updateStrong} />
          <Label strong>Strong</Label>
        </div>
        <div className={styles.checkbox}>
          <Checkbox onChange={updateDisabled} />
          <Label strong>Disabled</Label>
        </div>
        <div className={styles.checkbox}>
          <Checkbox onChange={updateRequired} />
          <Label strong>Required</Label>
        </div>
        <div>
          <Label strong>Required Text</Label>
          <TextField onChange={updateRequiredText} className={styles.textField} />
        </div>
        <div>
          <Label strong>Size</Label>
          <Dropdown defaultSelectedKey={'medium'} options={SizeOptions} onChange={updateSize} />
        </div>
      </div>
      <div className={styles.labelContainer}>
        <Label required={required && requiredText ? requiredText : ''} size={size} disabled={disabled} strong={strong}>
          {labelText}
        </Label>
      </div>
    </div>
  );
};

export const MultilineLabelExample = () => {
  const styles = useStyles();
  return (
    <div className={styles.multilineContainer}>
      <Label strong required>
        Super long label to show overflow into multiple lines
      </Label>
    </div>
  );
};
