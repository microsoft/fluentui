import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Flex, FlexItem, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Flex as FlexShim } from '@fluentui/react-migration-v0-v9';

import styles from './index.module.css';

export const Default = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex>Flex content</Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <FlexShim>Flex Shim Content</FlexShim>
      </div>
    </Provider>
  );
};

export const FlexItemAlign = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex column>
          <FlexItem align="end">
            <div>Flex content</div>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <FlexShim column>
          <div className={styles.v0Align}>Flex Shim Content</div>
        </FlexShim>
      </div>
    </Provider>
  );
};

export const FlexItemPush = (): JSXElement => {
  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex>
          <button>Button 1</button>
          <FlexItem push>
            <div>Flex content</div>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <button>Button 1</button>
        <FlexShim>
          <div className={styles.v0Push}>Flex Shim Content</div>
        </FlexShim>
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/FlexShim',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
