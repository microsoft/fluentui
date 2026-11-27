import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverFooter } from './TeachingPopoverFooter';

describe('TeachingPopoverFooter', () => {
  isConformant({
    Component: TeachingPopoverFooter,
    displayName: 'TeachingPopoverFooter',

    requiredProps: {
      primary: 'Primary',
      secondary: 'Secondary',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverFooter primary="Primary" secondary="Secondary">
        Default TeachingPopoverFooter
      </TeachingPopoverFooter>,
    );
    expect(result.container).toMatchSnapshot();
  });
});

describe('TeachingPopoverFooter DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <TeachingPopoverFooter footerLayout="vertical" primary="Primary" secondary="Secondary" />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
