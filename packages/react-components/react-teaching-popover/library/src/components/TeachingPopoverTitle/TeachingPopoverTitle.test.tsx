import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';
import { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';

describe('TeachingPopoverTitle', () => {
  isConformant<TeachingPopoverTitleProps>({
    Component: TeachingPopoverTitle,
    displayName: 'TeachingPopoverTitle',
    requiredProps: {},
    disabledTests: [
      // Title dismiss is optionally rendered
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverTitle>Default TeachingPopoverTitle</TeachingPopoverTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
