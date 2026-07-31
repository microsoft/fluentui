import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Flex, Provider, teamsTheme } from '@fluentui/react-northstar';
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

// Griffel → Tailwind + CSS Modules migration (S-H, DECISIONS.md D19): the `FlexItemAlign` /
// `FlexItemPush` stories are retired with the `flexItem` Griffel mixin they demonstrated.
// The FlexShim component itself is unaffected and keeps its Default story.

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
