import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { Nav, NavItem, NavCategory, NavCategoryItem, NavSubItem, NavSubItemGroup } from '@fluentui/react-nav';
import { Board20Regular, Person20Regular } from '@fluentui/react-icons';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Nav Converged',
  parameters: {
    storyWright: { steps: new Steps().snapshot('normal').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Nav>;

const SampleNav = (props: { density?: 'medium' | 'small'; selectedValue: string }) => (
  <div style={{ width: '260px' }}>
    <Nav density={props.density} defaultSelectedValue={props.selectedValue} defaultOpenCategories={['category-1']}>
      <NavItem icon={<Board20Regular />} value="top-item-1">
        Dashboard
      </NavItem>
      <NavCategory value="category-1">
        <NavCategoryItem icon={<Person20Regular />}>Job Postings</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="sub-item-1">Interviews</NavSubItem>
          <NavSubItem value="sub-item-2">Openings</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
    </Nav>
  </div>
);

export const SelectedItemAndSubItem = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h3>Medium Density - Top Item Selected</h3>
        <SampleNav density="medium" selectedValue="top-item-1" />
      </div>
      <div>
        <h3>Medium Density - Sub Item Selected</h3>
        <SampleNav density="medium" selectedValue="sub-item-1" />
      </div>
    </div>
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h3>Small Density - Top Item Selected</h3>
        <SampleNav density="small" selectedValue="top-item-1" />
      </div>
      <div>
        <h3>Small Density - Sub Item Selected</h3>
        <SampleNav density="small" selectedValue="sub-item-1" />
      </div>
    </div>
  </div>
);

SelectedItemAndSubItem.storyName = 'selected item and sub item';

export const SelectedItemAndSubItemDarkMode = getStoryVariant(SelectedItemAndSubItem, DARK_MODE);
export const SelectedItemAndSubItemHighContrast = getStoryVariant(SelectedItemAndSubItem, HIGH_CONTRAST);
export const SelectedItemAndSubItemRTL = getStoryVariant(SelectedItemAndSubItem, RTL);
