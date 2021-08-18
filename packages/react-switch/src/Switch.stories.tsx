import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Switch, SwitchProps } from './index';
import { Label } from '@fluentui/react-label';
import { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '400px',
  },
});

export const BasicSwitchExample = (props: SwitchProps) => {
  const [switchValue, setSwitchValue] = React.useState(false);

  const switchOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { value: boolean }) =>
    setSwitchValue(data.value);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Switch />
      <Label>Controlled Example</Label>
      <Switch checked={switchValue} onChange={switchOnChange} />
      <Label>Disabled Example</Label>
      <Switch disabled />
    </div>
  );
};

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta;
