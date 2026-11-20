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

describe('TeachingPopoverBody DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <TeachingPopoverBody mediaLength="tall" media={<img alt="" />}>
        Body
      </TeachingPopoverBody>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
