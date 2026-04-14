import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TabList } from './TabList';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
  });

  it('renders a default state', () => {
    const result = render(<TabList>Default TabList</TabList>);
    expect(result.container).toMatchSnapshot();
  });
});
