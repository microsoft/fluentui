import { shorthands, makeStyles } from '@griffel/react';
import { Label } from '@fluentui/react-label';
import { Meta } from '@storybook/react';
import * as React from 'react';

import { Switch, SwitchProps } from './components/Switch/index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const BasicSwitchExample = (props: SwitchProps) => {
  const styles = useStyles();
  const [switchValue, setSwitchValue] = React.useState(true);

  const switchOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { checked: boolean },
  ) => setSwitchValue(data.checked);

  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Switch />
      <Label>Controlled Example</Label>
      <Switch checked={switchValue} onChange={switchOnChange} />
      <Switch checked={switchValue} onChange={switchOnChange} />
      <Label>Disabled Example</Label>
      <Switch disabled defaultChecked={true} />
      <Switch disabled defaultChecked={false} />
    </div>
  );
};

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta;
