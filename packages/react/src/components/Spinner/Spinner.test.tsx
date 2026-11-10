import * as React from 'react';
import { render, act } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';

import { Spinner, SpinnerBase, SpinnerSize } from './index';

describe('Spinner', () => {
  it('renders Spinner correctly', () => {
    const { container } = render(<Spinner label="Standard spinner" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    // Problem: Doesn't handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });

  it('uses default documented properties', () => {
    const { container, unmount } = render(<SpinnerBase />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <div />
        </div>
      </div>
    `);

    unmount();
  });

  it('uses specified properties when provided', () => {
    jest.useFakeTimers();
    const { container, getByText, unmount } = render(
      <SpinnerBase
        size={SpinnerSize.large}
        ariaLive="assertive"
        labelPosition="top"
        label="Spinner label"
        ariaLabel="Aria spinner label"
      />,
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Verify the label is rendered
    expect(getByText('Spinner label')).toBeTruthy();

    // Verify aria attributes
    const spinnerElement = container.querySelector('[role="status"]');
    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement?.getAttribute('aria-live')).toBe('assertive');

    // Verify screen reader text
    expect(getByText('Aria spinner label')).toBeTruthy();

    unmount();
  });
});
