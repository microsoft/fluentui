import * as React from 'react';
import { FluentProvider, Nav, NavDivider, NavItem, NavSectionHeader } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Nav as GriffelNav,
  NavDivider as GriffelNavDivider,
  NavItem as GriffelNavItem,
  NavSectionHeader as GriffelNavSectionHeader,
  webLightTheme,
} from '@fluentui/react-components';
import { HomeFilled, HomeRegular } from '@fluentui/react-icons/headless/svg/home';
import {
  bundleIcon as griffelBundleIcon,
  HomeFilled as GriffelHomeFilled,
  HomeRegular as GriffelHomeRegular,
} from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const Home = bundleIcon(HomeFilled, HomeRegular);
const GriffelHome = griffelBundleIcon(GriffelHomeFilled, GriffelHomeRegular);

type Variant = {
  label: string;
  density?: 'small' | 'medium';
  selected?: boolean;
  icon?: boolean;
  href?: boolean;
  chrome?: boolean;
};

const variants: Variant[] = [
  { label: 'medium', density: 'medium' },
  { label: 'small', density: 'small' },
  { label: 'icon', icon: true },
  { label: 'selected', selected: true },
  { label: 'selected icon', selected: true, icon: true },
  { label: 'small selected icon', density: 'small', selected: true, icon: true },
  { label: 'anchor', href: true },
  { label: 'header + divider', chrome: true },
];

const nav: React.CSSProperties = { width: 260 };

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <div className={styles.header}>Variant</div>
    <div className={styles.header}>Windmod</div>
    <div className={styles.header}>Griffel</div>

    {variants.map(variant => (
      <React.Fragment key={variant.label}>
        <div className={styles.label}>{variant.label}</div>

        <FluentProvider>
          <Nav density={variant.density} selectedValue={variant.selected ? 'home' : undefined} style={nav}>
            {variant.chrome && <NavSectionHeader>Section</NavSectionHeader>}
            <NavItem value="home" icon={variant.icon ? <Home /> : undefined} href={variant.href ? '#a' : undefined}>
              Home
            </NavItem>
            {variant.chrome && <NavDivider />}
          </Nav>
        </FluentProvider>

        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelNav density={variant.density} selectedValue={variant.selected ? 'home' : undefined} style={nav}>
            {variant.chrome && <GriffelNavSectionHeader>Section</GriffelNavSectionHeader>}
            <GriffelNavItem
              value="home"
              icon={variant.icon ? <GriffelHome /> : undefined}
              href={variant.href ? '#a' : undefined}
            >
              Home
            </GriffelNavItem>
            {variant.chrome && <GriffelNavDivider />}
          </GriffelNav>
        </GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
