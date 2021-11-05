import * as React from 'react';
import { render } from '@testing-library/react';
import { TabList } from './TabList';
import { isConformant } from '../../common/isConformant';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TabList>Default TabList</TabList>);
    expect(result.container).toMatchSnapshot();
  });
});
