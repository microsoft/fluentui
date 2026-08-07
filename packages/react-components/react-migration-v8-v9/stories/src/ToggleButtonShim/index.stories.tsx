import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { DefaultButton, Icon, initializeIcons } from '@fluentui/react';
import type { IIconProps } from '@fluentui/react';
import { FluentProvider, webLightThemeClassName, ToggleButton } from '@fluentui/react-components';
import { ToggleButtonShim } from '@fluentui/react-migration-v8-v9';

import styles from './index.module.css';

initializeIcons();

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

export const Default = (): JSXElement => {
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
      <FluentProvider themeClassName={webLightThemeClassName}>
        <ToggleButtonShim
          toggle
          checked={muted2}
          text="Toggle"
          iconProps={muted2 ? volume0Icon : volume3Icon}
          onClick={() => setMuted2(!muted2)}
        />
      </FluentProvider>
      <FluentProvider themeClassName={webLightThemeClassName}>
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
