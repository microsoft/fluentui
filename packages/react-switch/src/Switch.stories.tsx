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
    '--switch-thumb-height': '26px',
    '--switch-thumb-width': '26px',
    '--switch-thumb-offset': '.56',
    '--switch-track-width': '50px',
    '--switch-track-height': '30px',

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
    boxShadow: `
      0px 3px 8px 0px rgba(0, 0, 0, 0.15),
      0px 3px 1px 0px rgba(0, 0, 0, 0.06)
    `,
  },

  track: {
    background: '#4cd964',
    border: 'none',
  },
});

export const BasicSwitchExample = (props: SwitchProps) => {
  const styles = useStyles();
  const [switchValue, setSwitchValue] = React.useState(false);

  const switchOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }) => {
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
        defaultChecked={true}
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
