import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
    disabledTests: ['consistent-callback-args'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tree>Default Tree</Tree>);
    expect(result.container).toMatchSnapshot();
  });
});
