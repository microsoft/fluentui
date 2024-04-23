import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverBody } from './TeachingPopoverBody';

describe('TeachingPopoverBody', () => {
  isConformant({
    Component: TeachingPopoverBody,
    displayName: 'TeachingPopoverBody',
    requiredProps: { media: <img src={'./test'} /> },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverBody>Default TeachingPopoverBody</TeachingPopoverBody>);
    expect(result.container).toMatchSnapshot();
  });
});
