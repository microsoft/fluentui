import * as React from 'react';
import { render } from '@testing-library/react';
import { Progress } from './Progress';
import { isConformant } from '../../common/isConformant';

describe('Progress', () => {
  isConformant({
    Component: Progress,
    displayName: 'Progress',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Progress>Default Progress</Progress>);
    expect(result.container).toMatchSnapshot();
  });
});
