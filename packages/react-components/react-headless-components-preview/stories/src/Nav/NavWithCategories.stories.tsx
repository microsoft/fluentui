import * as React from 'react';
import {
  Nav,
  NavItem,
  NavSubItem,
  NavCategory,
  NavCategoryItem,
  NavSubItemGroup,
  NavDivider,
  NavSectionHeader,
} from '@fluentui/react-headless-components-preview/nav';
import { ChevronDownFilled } from '@fluentui/react-icons';

import styles from './nav.module.css';

export const WithCategories = () => (
  <Nav defaultSelectedValue="overview" defaultOpenCategories={['components']} className={styles.nav}>
    <NavSectionHeader className={styles.sectionHeader}>Documentation</NavSectionHeader>
    <NavItem value="overview" className={styles.navItem}>
      Overview
    </NavItem>

    <NavDivider className={styles.divider} />

    <NavCategory value="components">
      <NavCategoryItem
        className={styles.navCategoryItem}
        expandIcon={{ children: <ChevronDownFilled />, className: styles.expandIcon }}
      >
        Components
      </NavCategoryItem>
      <NavSubItemGroup>
        <NavSubItem value="button" className={styles.navSubItem}>
          Button
        </NavSubItem>
        <NavSubItem value="input" className={styles.navSubItem}>
          Input
        </NavSubItem>
        <NavSubItem value="dialog" className={styles.navSubItem}>
          Dialog
        </NavSubItem>
      </NavSubItemGroup>
    </NavCategory>

    <NavCategory value="hooks">
      <NavCategoryItem
        className={styles.navCategoryItem}
        expandIcon={{ children: <ChevronDownFilled />, className: styles.expandIcon }}
      >
        Hooks
      </NavCategoryItem>
      <NavSubItemGroup>
        <NavSubItem value="useState" className={styles.navSubItem}>
          useState
        </NavSubItem>
        <NavSubItem value="useEffect" className={styles.navSubItem}>
          useEffect
        </NavSubItem>
      </NavSubItemGroup>
    </NavCategory>
  </Nav>
);
