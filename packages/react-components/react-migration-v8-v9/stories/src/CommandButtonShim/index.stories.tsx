import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './Description.md';

import { CommandButton, Icon } from '@fluentui/react';
import type { IIconProps } from '@fluentui/react';
import { FluentProvider, Button, webLightTheme } from '@fluentui/react-components';
import { CommandButtonShim } from '@fluentui/react-migration-v8-v9';

import styles from './index.module.css';

const addIcon: IIconProps = { iconName: 'Add' };

export const Default = (): JSXElement => {
  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <CommandButton iconProps={addIcon}>Command</CommandButton>
      <FluentProvider theme={webLightTheme}>
        <CommandButtonShim iconProps={addIcon}>Command</CommandButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Button appearance="transparent" icon={<Icon {...addIcon} />}>
          Command
        </Button>
      </FluentProvider>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Button/CommandButtonShim',
  component: CommandButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
