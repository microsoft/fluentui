import * as React from 'react';
import { render } from '@testing-library/react';
import { LargeTitle } from './LargeTitle';
import { isConformant } from '../../common/isConformant';

describe('LargeTitle', () => {
  isConformant({
    Component: LargeTitle,
    displayName: 'LargeTitle',
  });

  it('renders a default state', () => {
    const result = render(<LargeTitle>Default LargeTitle</LargeTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
