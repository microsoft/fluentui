import * as React from 'react';
import { Label, LabelProps } from '@fluentui/react-label';
import { makeStyles } from '@fluentui/react-make-styles';

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

  option: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
});

const sizeOptions = ['small', 'medium', 'large'];

export const CustomizableLabelExample = () => {
  const styles = useStyles();
  const [labelText, setLabelText] = React.useState("I'm a label");
  const [requiredText, setRequiredText] = React.useState<string | undefined>('*');
  const [strong, setStrong] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [size, setSize] = React.useState<LabelProps['size']>('medium');

  const updateLabelText = (ev: React.FormEvent<HTMLInputElement>) => {
    setLabelText(ev.currentTarget.value);
  };

  const updateRequiredText = (ev: React.FormEvent<HTMLInputElement>) => {
    setRequiredText(ev.currentTarget.value);
  };

  const updateStrong = (ev: React.FormEvent<HTMLInputElement>) => {
    setStrong(!strong);
  };

  const updateDisabled = (ev: React.FormEvent<HTMLInputElement>) => {
    setDisabled(!disabled);
  };

  const updateRequired = (ev: React.FormEvent<HTMLInputElement>) => {
    setRequired(!required);
  };

  const updateSize = (ev: React.FormEvent<HTMLSelectElement>) => {
    setSize(ev.currentTarget.value as LabelProps['size']);
  };

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.configurationContainer}>
        <div className={styles.option}>
          <Label strong>Text</Label>
          <input
            type="text"
            placeholder="I'm a label"
            onChange={e => updateLabelText(e)}
            className={styles.textField}
          />
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={e => updateStrong(e)} />
          <Label strong>Strong</Label>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={e => updateDisabled(e)} />
          <Label strong>Disabled</Label>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={e => updateRequired(e)} />
          <Label strong>Required</Label>
        </div>
        <div className={styles.option}>
          <Label strong>Required Text</Label>
          <input type="text" onChange={e => updateRequiredText(e)} className={styles.textField} />
        </div>
        <div className={styles.option}>
          <Label strong>Size</Label>
          <select defaultValue="medium" onChange={e => updateSize(e)}>
            {sizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
