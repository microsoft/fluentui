import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverPageCount } from './TeachingPopoverPageCount';

describe('TeachingPopoverPageCount', () => {
  isConformant({
    Component: TeachingPopoverPageCount,
    displayName: 'TeachingPopoverPageCount',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverPageCount>Default TeachingPopoverPageCount</TeachingPopoverPageCount>);
    expect(result.container).toMatchSnapshot();
  });
});
