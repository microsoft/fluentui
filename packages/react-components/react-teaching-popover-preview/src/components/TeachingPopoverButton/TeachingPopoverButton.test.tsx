import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverButton } from './TeachingPopoverButton';

describe('TeachingPopoverButton', () => {
  isConformant({
    Component: TeachingPopoverButton,
    displayName: 'TeachingPopoverButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverButton>Default TeachingPopoverButton</TeachingPopoverButton>);
    expect(result.container).toMatchSnapshot();
  });
});
