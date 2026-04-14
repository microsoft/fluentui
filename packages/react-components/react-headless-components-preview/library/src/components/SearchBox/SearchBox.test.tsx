import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<SearchBox placeholder="Search..." />);
    expect(result.container).toMatchSnapshot();
  });
});
