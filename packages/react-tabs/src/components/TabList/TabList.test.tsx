import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Tab } from '../Tab/index';
import { TabList } from './index';
import { ResizeObserver } from './__mocks__/mockResizeObserver';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  let oldResizeObserver: typeof window.ResizeObserver;

  beforeAll(() => {
    oldResizeObserver = window.ResizeObserver;
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    window.ResizeObserver = oldResizeObserver;
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
});
