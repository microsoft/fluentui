import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';

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

  it('exposes the dismiss button to assistive technology', () => {
    render(
      <TeachingPopover open>
        <TeachingPopoverSurface>
          <TeachingPopoverTitle dismissButton={{}}>Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(screen.getByRole('button', { name: 'dismiss' })).toBeDefined();
  });
});
