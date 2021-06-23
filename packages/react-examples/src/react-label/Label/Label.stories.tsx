import * as React from 'react';
import { Label, LabelProps } from '@fluentui/react-label';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  exampleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
  },

  labelContainer: {
    backgroundColor: 'whitesmoke',
    padding: '10px',
    alignSelf: 'center',
  },

  columnOrder: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: 'whitesmoke',
    padding: '20px',
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
  },

  option: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
});

const sizeOptions = ['small', 'medium', 'large'];

export const BasicLabelExamples = () => {
  const styles = useStyles();
  return (
    <div className={styles.exampleContainer}>
      <div className={styles.columnOrder}>
        <Label>I'm a simple Label</Label>
        <Label disabled>I'm a disabled Label</Label>
        <Label required>I'm a required Label</Label>
        <Label required="***">I'm a required Label with custom text</Label>
        <div className={styles.multilineContainer}>
          <Label required>Super long label to show overflow into multiple lines</Label>
        </div>
      </div>
      <div className={styles.columnOrder}>
        <Label size="small">I'm a small Label</Label>
        <Label size="medium">I'm a medium Label</Label>
        <Label size="large">I'm a Large Label</Label>
      </div>
    </div>
  );
};

export const CustomizableLabelExample = () => {
  const styles = useStyles();
  const [labelText, setLabelText] = React.useState("I'm a label");
  const [requiredText, setRequiredText] = React.useState<string>('');
  const [strong, setStrong] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [size, setSize] = React.useState<LabelProps['size']>('medium');

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.configurationContainer}>
        <div className={styles.option}>
          <Label htmlFor="txtbox1" strong>
            Text
          </Label>
          <input
            id="txtbox1"
            type="text"
            placeholder="I'm a label"
            onChange={e => setLabelText(e.currentTarget.value)}
            className={styles.textField}
          />
        </div>
        <div className={styles.checkbox}>
          <input id="cbox1" type="checkbox" onChange={() => setStrong(!strong)} />
          <Label htmlFor="cbox1" strong>
            Strong
          </Label>
        </div>
        <div className={styles.checkbox}>
          <input id="cbox2" type="checkbox" onChange={() => setDisabled(!disabled)} />
          <Label htmlFor="cbox2" strong>
            Disabled
          </Label>
        </div>
        <div className={styles.checkbox}>
          <input id="cbox3" type="checkbox" onChange={() => setRequired(!required)} />
          <Label htmlFor="cbox3" strong>
            Required
          </Label>
        </div>
        <div className={styles.option}>
          <Label htmlFor="textbox2" strong>
            Required Text
          </Label>
          <input
            id="textbox2"
            type="text"
            onChange={e => setRequiredText(e.currentTarget.value)}
            className={styles.textField}
          />
        </div>
        <div className={styles.option}>
          <Label htmlFor="ddown1" strong>
            Size
          </Label>
          <select
            id="ddown1"
            defaultValue="medium"
            onChange={e => setSize(e.currentTarget.value as LabelProps['size'])}
          >
            {sizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.labelContainer}>
        <Label
          required={required && requiredText !== '' ? requiredText : required}
          size={size}
          disabled={disabled}
          strong={strong}
        >
          {labelText}
        </Label>
      </div>
    </div>
  );
};
