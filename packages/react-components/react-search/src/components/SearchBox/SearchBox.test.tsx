import * as React from 'react';
import { render } from '@testing-library/react';
import { SearchBox } from './SearchBox';
import { isConformant } from '../../testing/isConformant';

describe('SearchBox', () => {
  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SearchBox>Default SearchBox</SearchBox>);
    expect(result.container).toMatchSnapshot();
  });
});
