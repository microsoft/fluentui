import * as React from 'react';

import descriptionMd from './Description.md';

import { DefaultButton, Icon, initializeIcons } from '@fluentui/react';
import type { IIconProps } from '@fluentui/react';
import { FluentProvider, webLightTheme, makeStyles, ToggleButton } from '@fluentui/react-components';
import { ToggleButtonShim } from '@fluentui/react-migration-v8-v9';

initializeIcons();

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr',
    width: 'fit-content',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
  },
  componentName: {
    justifySelf: 'end',
    margin: '0 10px 0 0',
  },
});

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

export const Default = () => {
  const styles = useStyles();

  const [muted1, setMuted1] = React.useState(false);
  const [muted2, setMuted2] = React.useState(false);
  const [muted3, setMuted3] = React.useState(false);

  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <DefaultButton
        toggle
        checked={muted1}
        text="Toggle"
        iconProps={muted1 ? volume0Icon : volume3Icon}
        onClick={() => setMuted1(!muted1)}
      />
      <FluentProvider theme={webLightTheme}>
        <ToggleButtonShim
          toggle
          checked={muted2}
          text="Toggle"
          iconProps={muted2 ? volume0Icon : volume3Icon}
          onClick={() => setMuted2(!muted2)}
        />
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <ToggleButton
          checked={muted3}
          icon={muted3 ? <Icon {...volume0Icon} /> : <Icon {...volume3Icon} />}
          onClick={() => setMuted3(!muted3)}
        >
          Toggle
        </ToggleButton>
      </FluentProvider>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Button/ToggleButtonShim',
  component: ToggleButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
