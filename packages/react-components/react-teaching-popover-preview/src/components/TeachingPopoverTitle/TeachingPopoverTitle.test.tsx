import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';

describe('TeachingPopoverTitle', () => {
  isConformant({
    Component: TeachingPopoverTitle,
    displayName: 'TeachingPopoverTitle',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverTitle>Default TeachingPopoverTitle</TeachingPopoverTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
