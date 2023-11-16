import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverHeader } from './TeachingPopoverHeader';

describe('TeachingPopoverHeader', () => {
  isConformant({
    Component: TeachingPopoverHeader,
    displayName: 'TeachingPopoverHeader',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverHeader>Default TeachingPopoverHeader</TeachingPopoverHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
