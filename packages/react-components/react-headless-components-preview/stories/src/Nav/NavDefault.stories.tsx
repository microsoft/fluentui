import * as React from 'react';
import { Nav, NavItem, NavDivider, NavSectionHeader } from '@fluentui/react-headless-components-preview/nav';

import styles from './nav.module.css';

export const Default = () => (
  <Nav defaultSelectedValue="item1" className={styles.nav}>
    <NavSectionHeader className={styles.sectionHeader}>Getting Started</NavSectionHeader>
    <NavItem value="item1" className={styles.navItem}>
      Overview
    </NavItem>
    <NavItem value="item2" className={styles.navItem}>
      Installation
    </NavItem>
    <NavDivider className={styles.divider} />
    <NavSectionHeader className={styles.sectionHeader}>Components</NavSectionHeader>
    <NavItem value="item3" className={styles.navItem}>
      Button
    </NavItem>
    <NavItem value="item4" className={styles.navItem}>
      Input
    </NavItem>
  </Nav>
);
