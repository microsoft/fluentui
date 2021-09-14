import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { teamsLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { Switch, SwitchProps } from './components/Switch/index';
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
    width: '50px',
    height: '30px',

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

const useMaterialStyles = makeStyles({
  root: {
    width: '34px',
    height: '14px',

    ':hover .ms-Switch-thumb': {
      background: 'white',
    },

    ':hover .ms-Switch-track': {
      background: '#9f9f9f',
    },

    '&.checked': {
      '& .ms-Switch-thumb': {
        background: '#f50057',
      },

      ':hover .ms-Switch-thumb': {
        background: '#f50057',
      },

      '& .ms-Switch-track': {
        background: '#fa80ab',
        border: 'none',
      },

      ':hover .ms-Switch-track': {
        background: '#fa80ab',
        border: 'none',
      },
    },
  },

  thumbWrapper: {
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    left: 'calc(20px * .4)',
    right: 'calc(20px * .4)',
  },

  thumb: {
    width: '20px',
    height: '20px',
    background: 'white',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },

  track: {
    background: '#9f9f9f',
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
    </div>
  );
};

export const CustomSwitchExample = (props: SwitchProps) => {
  const styles = useStyles();
  const iosStyles = useIosStyles();
  const materialStyles = useMaterialStyles();

  return (
    <div className={styles.root}>
      <Label>Teams Example</Label>
      <FluentProvider theme={teamsLightTheme}>
        <Switch defaultChecked={true} />
      </FluentProvider>
      <Label>iOS Example</Label>
      <Switch
        defaultChecked={true}
        className={iosStyles.root}
        track={{ className: iosStyles.track }}
        thumbWrapper={{ className: iosStyles.thumbWrapper }}
        thumb={{ className: iosStyles.thumb }}
      />
      <Label>Material UI Example</Label>
      <Switch
        defaultChecked={true}
        className={materialStyles.root}
        track={{ className: materialStyles.track }}
        thumbWrapper={{ className: materialStyles.thumbWrapper }}
        thumb={{ className: materialStyles.thumb }}
      />
    </div>
  );
};

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta;
