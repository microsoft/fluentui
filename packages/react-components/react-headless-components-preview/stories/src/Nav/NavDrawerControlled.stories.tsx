import * as React from 'react';
import type { NavItemValue, OnNavItemSelectData } from '@fluentui/react-headless-components-preview/nav';
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

import styles from './nav.module.css';
import { ChevronDownFilled, NavigationFilled } from '@fluentui/react-icons';

type NavItemValueCombo = { parent: string; children: string[] };

const navItemValueList: NavItemValueCombo[] = [
  { parent: '1', children: [] },
  { parent: '2', children: [] },
  { parent: '3', children: [] },
  { parent: '4', children: [] },
  { parent: '5', children: [] },
  { parent: '6', children: ['7', '8'] },
  { parent: '9', children: [] },
  { parent: '10', children: [] },
  { parent: '11', children: ['12', '13'] },
  { parent: '14', children: [] },
  { parent: '15', children: [] },
  { parent: '16', children: ['17', '18'] },
  { parent: '19', children: [] },
  { parent: '20', children: [] },
];

const getRandomPage = () => {
  const randomIndex = Math.floor(Math.random() * navItemValueList.length);
  const randomItem = navItemValueList[randomIndex];

  if (randomItem.children.length === 0) {
    return { newSelectedCategory: undefined, newSelectedValue: randomItem.parent };
  } else {
    const randomChildIndex = Math.floor(Math.random() * randomItem.children.length);
    return { newSelectedCategory: randomItem.parent, newSelectedValue: randomItem.children[randomChildIndex] };
  }
};

export const NavDrawerControlled = () => {
  const [openCategories, setOpenCategories] = React.useState<NavItemValue[]>(['6', '11']);
  const [selectedCategoryValue, setSelectedCategoryValue] = React.useState<string | undefined>('6');
  const [selectedValue, setSelectedValue] = React.useState<string>('7');
  const [isMultiple, setIsMultiple] = React.useState(true);

  const handleCategoryToggle = (_: Event | React.SyntheticEvent<Element, Event>, data: OnNavItemSelectData) => {
    if (data.value === undefined && data.categoryValue) {
      setOpenCategories([data.categoryValue as string]);
    }

    if (isMultiple) {
      if (openCategories.includes(data.categoryValue as string)) {
        setOpenCategories(openCategories.filter(category => category !== data.categoryValue));
      } else {
        setOpenCategories([...openCategories, data.categoryValue as string]);
      }
    } else {
      if (openCategories.includes(data.categoryValue as string)) {
        setOpenCategories([]);
      } else {
        setOpenCategories([data.categoryValue as string]);
      }
    }
  };

  const handleItemSelect = (_: Event | React.SyntheticEvent<Element, Event>, data: OnNavItemSelectData) => {
    setSelectedCategoryValue(data.categoryValue as string);
    setSelectedValue(data.value as string);
  };

  const handleNavigationClick = () => {
    const { newSelectedCategory, newSelectedValue } = getRandomPage();
    setSelectedCategoryValue(newSelectedCategory);
    setSelectedValue(newSelectedValue);
  };

  const handleMultipleChange = (checked: boolean) => {
    setIsMultiple(checked);
    if (checked) {
      setOpenCategories(['6', '11']);
    } else {
      setOpenCategories(['6']);
    }
  };

  return (
    <div className={styles.drawerRoot}>
      <NavDrawer
        onNavCategoryItemToggle={handleCategoryToggle}
        onNavItemSelect={handleItemSelect}
        openCategories={openCategories}
        selectedValue={selectedValue}
        selectedCategoryValue={selectedCategoryValue}
        type="inline"
        open={true}
        className={styles.drawerNav}
      >
        <NavDrawerHeader className={styles.drawerHeader}>
          <button className={styles.hamburgerButton} title="Navigation">
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
              expandIcon={{ className: styles.expandIcon, children: <ChevronDownFilled /> }}
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
              expandIcon={{ className: styles.expandIcon, children: <ChevronDownFilled /> }}
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
              expandIcon={{ className: styles.expandIcon, children: <ChevronDownFilled /> }}
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
        <div className={styles.controlGroup}>
          <button className={styles.navigateButton} onClick={handleNavigationClick}>
            Navigate to random page
          </button>
          <label>
            <input type="checkbox" checked={isMultiple} onChange={e => handleMultipleChange(e.target.checked)} /> Allow
            multiple expanded categories
          </label>
          <p className={styles.status}>
            Selected: <strong>{selectedValue}</strong>
            {selectedCategoryValue && (
              <>
                {' '}
                (Category: <strong>{selectedCategoryValue}</strong>)
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
