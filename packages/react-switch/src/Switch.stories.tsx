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
  },
});

const useIosStyles = makeStyles({
  root: {
    width: '51px',
    height: '31px',
    '--switch-thumb-size': '27px',
    '--switch-thumb-offset': '.55',

    ':hover .ms-Switch-thumb': {
      background: 'white',
    },

    ':active .ms-Switch-thumb': {
      background: 'white',
    },

    ':hover .ms-Switch-track': {
      borderColor: '#c8c6c4',
    },
  },
  thumb: {
    background: 'white',
  },
  track: {
    background: '#4cd964',
    border: '2px solid #c8c6c4',
  },
});

export const BasicSwitchExample = (props: SwitchProps) => {
  const styles = useStyles();
  const [switchValue, setSwitchValue] = React.useState(false);

  const switchOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }) => {
    console.log('hello');
    setSwitchValue(data.checked);
  };
  return (
    <div className={styles.root}>
      <Label>Basic Example</Label>
      <Switch />
      <Label>Controlled Example</Label>
      <Switch checked={switchValue} onChange={switchOnChange} />
      <Label>Disabled Example</Label>
      <Switch disabled defaultChecked={true} />
      <Switch disabled defaultChecked={false} />
      <Switch className={styles.root} labelPosition="before">
        Label Example
      </Switch>
    </div>
  );
};

export const CustomSwitchExample = (props: SwitchProps) => {
  const [switchValue, setSwitchValue] = React.useState(false);

  const switchOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }) =>
    setSwitchValue(data.checked);

  const styles = useStyles();
  const iosStyles = useIosStyles();

  return (
    <div className={styles.root}>
      <Label>iOS Example</Label>
      <Switch
        className={iosStyles.root}
        track={{ className: iosStyles.track }}
        thumb={{ className: iosStyles.thumb }}
      />

      <Label>On/Off Example</Label>
      <Switch checked={switchValue} onChange={switchOnChange}>
        {switchValue ? 'On' : 'Off'}
      </Switch>
    </div>
  );
};

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta;
