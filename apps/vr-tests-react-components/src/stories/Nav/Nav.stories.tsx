import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import {
  AppItem,
  AppItemStatic,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav';
import {
  bundleIcon,
  Board20Filled,
  Board20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  PersonCircle32Filled,
  PersonCircle32Regular,
} from '@fluentui/react-icons';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const PersonCircle = bundleIcon(PersonCircle32Filled, PersonCircle32Regular);

export default {
  title: 'Nav Converged',

  parameters: {
    storyWright: { steps: new Steps().snapshot('default').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof NavDrawer>;

/*
 * S-J state-matrix stories (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * react-nav's bundled-icon rules fire on SELECTION, not hover — NavItem/NavCategoryItem
 * `useIconStyles.selected` shows the filled glyph (with an enter animation) while the base
 * half keeps it hidden, and AppItem/AppItemStatic carry the base half only. No VR story
 * existed for react-nav at all, so the whole package had no pixel evidence. One story pins
 * the full matrix: an UNSELECTED NavItem (regular glyph), a SELECTED NavItem (filled glyph),
 * a SELECTED-but-closed NavCategoryItem (filled glyph), and AppItem/AppItemStatic at rest
 * (regular glyph).
 */
export const Default = () => (
  <div style={{ width: '300px', height: '520px', display: 'flex' }}>
    <NavDrawer open type="inline" defaultSelectedValue="2" defaultSelectedCategoryValue="6">
      <NavDrawerBody>
        <AppItem icon={<PersonCircle />}>Contoso HR</AppItem>
        <AppItemStatic icon={<PersonCircle />}>Contoso Static</AppItemStatic>
        <NavItem icon={<Dashboard />} value="1">
          Dashboard
        </NavItem>
        <NavItem icon={<Announcements />} value="2">
          Announcements
        </NavItem>
        <NavCategory value="6">
          <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="7">Openings</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </NavDrawerBody>
    </NavDrawer>
  </div>
);

Default.storyName = 'bundled icon swap matrix';

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

/* Small density exercises the `.small` slices alongside the icon rules. */
export const SmallDensity = () => (
  <div style={{ width: '300px', height: '520px', display: 'flex' }}>
    <NavDrawer open type="inline" density="small" defaultSelectedValue="2" defaultSelectedCategoryValue="6">
      <NavDrawerBody>
        <AppItem icon={<PersonCircle />}>Contoso HR</AppItem>
        <AppItemStatic icon={<PersonCircle />}>Contoso Static</AppItemStatic>
        <NavItem icon={<Dashboard />} value="1">
          Dashboard
        </NavItem>
        <NavItem icon={<Announcements />} value="2">
          Announcements
        </NavItem>
        <NavCategory value="6">
          <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="7">Openings</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </NavDrawerBody>
    </NavDrawer>
  </div>
);

SmallDensity.storyName = 'bundled icon swap matrix - small density';
