import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverHeader } from './TeachingPopoverHeader';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';

describe('TeachingPopoverHeader', () => {
  isConformant<TeachingPopoverHeaderProps>({
    Component: TeachingPopoverHeader,
    displayName: 'TeachingPopoverHeader',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverHeader>Default TeachingPopoverHeader</TeachingPopoverHeader>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('TeachingPopoverHeader DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <TeachingPopoverHeader icon={<span />} dismissButton={<span />}>
        Header
      </TeachingPopoverHeader>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });

  it('does not forward dangerouslySetInnerHTML to the root, which renders composed children', () => {
    const { container } = render(
      <TeachingPopoverHeader dangerouslySetInnerHTML={{ __html: 'Injected' }}>Header</TeachingPopoverHeader>,
    );

    expect((container.firstElementChild as HTMLElement).textContent).toBe('Header');
  });
});
