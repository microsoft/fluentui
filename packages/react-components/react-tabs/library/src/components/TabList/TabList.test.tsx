import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tab } from '../Tab/index';
import { TabList } from './index';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onTabSelect'],
      },
    },
  });

  it('renders with tabs', () => {
    const result = render(
      <TabList>
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('renders with no tabs', () => {
    const result = render(<TabList />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders tabs with default selected tab', () => {
    const result = render(
      <TabList defaultSelectedValue="2">
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('renders tabs when disabled', () => {
    const result = render(
      <TabList defaultSelectedValue="2" disabled>
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });
});
