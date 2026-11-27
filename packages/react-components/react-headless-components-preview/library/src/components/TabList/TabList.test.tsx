import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TabList } from './TabList';
import { Tab } from './Tab';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  it('renders a default state', () => {
    const { getByRole, getAllByRole } = render(
      <TabList defaultSelectedValue="1">
        <Tab value="1">Tab 1</Tab>
        <Tab value="2">Tab 2</Tab>
        <Tab value="3">Tab 3</Tab>
      </TabList>,
    );
    const tablist = getByRole('tablist');

    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveAttribute('data-orientation', 'horizontal');
    expect(tablist).toHaveAttribute('focusgroup', 'tablist inline wrap nomemory');

    const tabs = getAllByRole('tab');

    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('data-selected');
  });

  it('renders with vertical orientation', () => {
    const { getByRole } = render(
      <TabList vertical>
        <Tab value="1">Tab 1</Tab>
        <Tab value="2">Tab 2</Tab>
        <Tab value="3">Tab 3</Tab>
      </TabList>,
    );
    const tablist = getByRole('tablist');

    expect(tablist).toHaveAttribute('data-orientation', 'vertical');
    expect(tablist).toHaveAttribute('focusgroup', 'tablist block wrap nomemory');
  });

  it('renders with data-disabled when disabled', () => {
    const { getByRole } = render(
      <TabList disabled>
        <Tab value="1">Tab 1</Tab>
        <Tab value="2">Tab 2</Tab>
      </TabList>,
    );

    expect(getByRole('tablist')).toHaveAttribute('data-disabled');
  });

  it('does not render data-disabled by default', () => {
    const { getByRole } = render(
      <TabList>
        <Tab value="1">Tab 1</Tab>
        <Tab value="2">Tab 2</Tab>
      </TabList>,
    );

    expect(getByRole('tablist')).not.toHaveAttribute('data-disabled');
  });
});
