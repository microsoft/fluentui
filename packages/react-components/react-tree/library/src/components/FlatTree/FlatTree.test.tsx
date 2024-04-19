import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { FlatTree } from './FlatTree';

describe('FlatTree', () => {
  isConformant({
    Component: FlatTree,
    displayName: 'FlatTree',
    disabledTests: ['consistent-callback-args'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<FlatTree>Default FlatTree</FlatTree>);
    expect(result.container).toMatchSnapshot();
  });
});
