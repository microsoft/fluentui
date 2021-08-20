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

const useTeamsStyles = makeStyles({
  root: {
    ':hover .ms-Switch-thumb': {
      background: 'white',
    },

    '&.checked': {
      '& .ms-Switch-thumb': {
        border: 'none',
      },

      '& .ms-Switch-track': {
        background: '#6264a7',
        border: 'none',
      },

      ':hover .ms-Switch-track': {
        background: '#5e60a1',
        border: 'none',
      },
    },
  },

  thumb: {
    background: 'white',
    border: '1px solid #4c4a48',
  },

  track: {
    background: 'white',
    border: '1px solid #4c4a48',
  },
});

const useIosStyles = makeStyles({
  root: {
    ':hover .ms-Switch-thumb': {
      background: 'white',
    },

    ':active .ms-Switch-thumb': {
      background: 'white',
    },

    ':hover .ms-Switch-track': {
      borderColor: 'none',
    },

    '&.checked': {
      ':hover .ms-Switch-track': {
        background: '#4cd964',
      },

      '& .ms-Switch-track': {
        background: '#4cd964',
        border: 'none',
      },
    },
  },

  switchWrapper: {
    width: '50px',
    height: '30px',
  },

  thumbWrapper: {
    left: 'calc(26px * .56)',
    right: 'calc(26px * .56)',
  },

  thumb: {
    width: '27px',
    height: '27px',
    background: 'white',
    boxShadow: `
      0px 3px 8px 0px rgba(0, 0, 0, 0.15),
      0px 3px 1px 0px rgba(0, 0, 0, 0.06)
    `,
  },

  track: {
    background: 'white',
    border: '1px solid #e0e0e0',
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
  const teamsStyles = useTeamsStyles();
  const iosStyles = useIosStyles();

  return (
    <div className={styles.root}>
      <Label>Teams Example</Label>
      <Switch
        defaultChecked={true}
        className={teamsStyles.root}
        track={{ className: teamsStyles.track }}
        thumb={{ className: teamsStyles.thumb }}
      />
      <Label>iOS Example</Label>
      <Switch
        defaultChecked={true}
        className={iosStyles.root}
        switchWrapper={{ className: iosStyles.switchWrapper }}
        track={{ className: iosStyles.track }}
        thumbWrapper={{ className: iosStyles.thumbWrapper }}
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
