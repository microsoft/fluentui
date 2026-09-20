import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Tab } from '../Tab';
import { TabList } from './TabList';
import { tabListClassNames } from './useTabListStyles.styles';

describe('TabList', () => {
  it('renders visual defaults and composes headless selection behavior', () => {
    const onTabSelect = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TabList defaultSelectedValue="first" onTabSelect={onTabSelect}>
        <Tab value="first">First</Tab>
        <Tab value="second">Second</Tab>
      </TabList>,
    );
    const tabList = getByRole('tablist');
    const tabs = getAllByRole('tab');

    expect(tabList).toHaveClass(tabListClassNames.root);
    expect(tabList).toHaveAttribute('data-appearance', 'transparent');
    expect(tabList).toHaveAttribute('data-size', 'medium');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(tabs[1]);
    expect(onTabSelect).toHaveBeenCalledWith(expect.anything(), { value: 'second' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('provides visual variants to tabs', () => {
    const { getByRole } = render(
      <TabList appearance="filled-circular" size="large" vertical>
        <Tab value="first">First</Tab>
      </TabList>,
    );
    const tab = getByRole('tab');

    expect(tab).toHaveAttribute('data-appearance', 'filled-circular');
    expect(tab).toHaveAttribute('data-size', 'large');
    expect(tab).toHaveAttribute('data-orientation', 'vertical');
  });
});
