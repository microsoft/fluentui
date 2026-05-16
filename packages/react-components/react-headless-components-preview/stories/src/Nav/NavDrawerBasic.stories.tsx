import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-headless-components-preview/nav';
import { ChevronDownFilled, NavigationFilled } from '@fluentui/react-icons';

import styles from './nav.module.css';

export const NavDrawerBasic = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<'inline' | 'overlay'>('inline');
  const [isMultiple, setIsMultiple] = React.useState(true);

  return (
    <div className={styles.drawerRoot}>
      <NavDrawer
        defaultSelectedValue="2"
        open={isOpen}
        onOpenChange={(_, data) => setIsOpen(data.open)}
        type={type}
        multiple={isMultiple}
        className={styles.drawerNav}
      >
        <NavDrawerHeader className={styles.drawerHeader}>
          <button className={styles.hamburgerButton} onClick={() => setIsOpen(!isOpen)} title="Close Navigation">
            <NavigationFilled />
          </button>
        </NavDrawerHeader>

        <NavDrawerBody className={styles.drawerBody}>
          <NavItem value="1" className={styles.navItem}>
            Dashboard
          </NavItem>
          <NavItem value="2" className={styles.navItem}>
            Announcements
          </NavItem>
          <NavItem value="3" className={styles.navItem}>
            Employee Spotlight
          </NavItem>
          <NavItem value="4" className={styles.navItem}>
            Profile Search
          </NavItem>
          <NavItem value="5" className={styles.navItem}>
            Performance Reviews
          </NavItem>

          <NavSectionHeader className={styles.sectionHeader}>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem
              className={styles.navCategoryItem}
              expandIcon={{ children: <ChevronDownFilled />, className: styles.expandIcon }}
            >
              Job Postings
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="7" className={styles.navSubItem}>
                Openings
              </NavSubItem>
              <NavSubItem value="8" className={styles.navSubItem}>
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem value="9" className={styles.navItem}>
            Interviews
          </NavItem>

          <NavSectionHeader className={styles.sectionHeader}>Benefits</NavSectionHeader>
          <NavItem value="10" className={styles.navItem}>
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem
              className={styles.navCategoryItem}
              expandIcon={{ children: <ChevronDownFilled />, className: styles.expandIcon }}
            >
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="13" className={styles.navSubItem}>
                Plan Information
              </NavSubItem>
              <NavSubItem value="14" className={styles.navSubItem}>
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader className={styles.sectionHeader}>Learning</NavSectionHeader>
          <NavItem value="15" className={styles.navItem}>
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem
              className={styles.navCategoryItem}
              expandIcon={{ children: <ChevronDownFilled />, className: styles.expandIcon }}
            >
              Career Development
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="17" className={styles.navSubItem}>
                Career Paths
              </NavSubItem>
              <NavSubItem value="18" className={styles.navSubItem}>
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider className={styles.divider} />
          <NavItem value="19" className={styles.navItem}>
            Workforce Data
          </NavItem>
          <NavItem value="20" className={styles.navItem}>
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>

      <div className={styles.drawerContent}>
        <button
          className={styles.hamburgerButton}
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle navigation pane"
          aria-expanded={isOpen}
        >
          <NavigationFilled />
        </button>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Type</label>
          <div>
            <label>
              <input
                type="radio"
                name="drawer-type"
                value="overlay"
                checked={type === 'overlay'}
                onChange={() => setType('overlay')}
              />{' '}
              Overlay
            </label>{' '}
            <label>
              <input
                type="radio"
                name="drawer-type"
                value="inline"
                checked={type === 'inline'}
                onChange={() => setType('inline')}
              />{' '}
              Inline
            </label>
          </div>

          <label>
            <input type="checkbox" checked={isMultiple} onChange={e => setIsMultiple(e.target.checked)} /> Allow
            multiple expanded categories
          </label>
        </div>
      </div>
    </div>
  );
};
