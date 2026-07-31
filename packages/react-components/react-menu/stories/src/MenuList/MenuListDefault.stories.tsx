import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { MenuList, MenuItem } from '@fluentui/react-components';

import styles from './MenuListDefault.module.css';

export const Default = (): JSXElement => {
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </div>
  );
};
