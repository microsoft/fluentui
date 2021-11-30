import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Tab } from '../Tab/index';
import { TabList, TabListProps } from './index';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it.each([
    ['default', {}],
    ['subtle appearance', { appearance: 'subtle' }],
    ['vertical', { vertical: true }],
    ['small size', { size: 'small' }],
    ['small size and vertical', { size: 'small', vertical: true }],
    ['second selected', { selectedValue: '2' }],
    ['second selected (default)', { defaultSelectedValue: '2' }],
  ])('renders %s correctly', (_testName, props) => {
    const tabListProps = props as TabListProps;

    const result = render(
      <TabList {...tabListProps}>
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
});
