import * as React from 'react';
import { Nav, NavItem } from '@fluentui/react-headless-components-preview/nav';

import styles from './nav.module.css';

export const Controlled = () => {
  const [selectedValue, setSelectedValue] = React.useState('item1');

  return (
    <div>
      <p className={styles.status}>
        Selected: <strong>{selectedValue}</strong>
      </p>
      <Nav
        selectedValue={selectedValue}
        onNavItemSelect={(_, data) => setSelectedValue(data.value)}
        className={styles.nav}
      >
        <NavItem value="item1" className={styles.navItem}>
          Home
        </NavItem>
        <NavItem value="item2" className={styles.navItem}>
          Settings
        </NavItem>
        <NavItem value="item3" className={styles.navItem}>
          Profile
        </NavItem>
      </Nav>
    </div>
  );
};
