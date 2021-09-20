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
      ':before': {
        background: 'white',
      },
    },

    ':active .ms-Switch-thumb': {
      ':before': {
        background: 'white',
      },
    },

    ':hover .ms-Switch-track': {
      // Unchecked
      ':before': {
        borderColor: 'none',
      },

      // Checked
      ':after': {
        background: '#4cd964',
      },
    },

    ':active .ms-Switch-track': {
      ':before': {
        borderColor: 'none',
      },
      ':after': {
        background: '#4cd964',
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
    boxShadow: `
      0px 3px 8px 0px rgba(0, 0, 0, 0.15),
      0px 3px 1px 0px rgba(0, 0, 0, 0.06)
    `,
    ':before': {
      opacity: 1,
      background: 'white',
    },
    ':after': {
      opacity: 1,
      background: 'white',
    },
  },

  track: {
    ':after': {
      background: '#4cd964',
      border: 'none',
    },
    ':before': {
      background: 'white',
      border: '1px solid #e0e0e0',
    },
  },
});

const useMaterialStyles = makeStyles({
  root: {
    width: '34px',
    height: '14px',

    ':hover .ms-Switch-thumb': {
      ':before': {
        background: 'white',
      },
      ':after': {
        background: '#f50057',
      },
    },

    ':hover .ms-Switch-track': {
      ':before': {
        background: '#9f9f9f',
      },
      ':after': {
        background: '#fa80ab',
        border: 'none',
      },
    },

    ':active .ms-Switch-track': {
      ':before': {
        background: '#9f9f9f',
      },
      ':after': {
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
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    ':before': {
      background: 'white',
    },
    ':after': {
      background: '#f50057',
    },
  },

  track: {
    ':before': {
      background: '#9f9f9f',
      border: 'none',
    },
    ':after': {
      background: '#fa80ab',
      border: 'none',
    },
  },
});

export const BasicSwitchExample = (props: SwitchProps) => {
  const styles = useStyles();
  const [switchValue, setSwitchValue] = React.useState(false);

  const switchOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean },
  ) => setSwitchValue(data.checked);

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
