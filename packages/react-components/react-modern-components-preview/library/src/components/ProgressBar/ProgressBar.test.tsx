import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { ProgressBar, progressBarClassNames } from './';
import { useProgressBar } from './useProgressBar';

describe('ProgressBar', () => {
  it('renders visual defaults and stable class names', () => {
    const { getByRole } = render(<ProgressBar value={0.5} />);
    const root = getByRole('progressbar');

    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(root).toHaveAttribute('data-thickness', 'medium');
    expect(root).toHaveAttribute('data-color', 'brand');
    expect(root).toHaveAttribute('data-transition');
    expect(root).toHaveClass(progressBarClassNames.root);
    expect(root.firstElementChild).toHaveClass(progressBarClassNames.bar);
  });

  it('does not transition values near zero', () => {
    const { getByRole } = render(<ProgressBar value={0.01} />);

    expect(getByRole('progressbar')).not.toHaveAttribute('data-transition');
  });

  it('maps visual props to data attributes and preserves a consumer class', () => {
    const { getByRole } = render(
      <ProgressBar className="consumer-class" color="success" shape="square" thickness="large" value={0.5} />,
    );
    const root = getByRole('progressbar');

    expect(root).toHaveAttribute('data-shape', 'square');
    expect(root).toHaveAttribute('data-thickness', 'large');
    expect(root).toHaveAttribute('data-color', 'success');
    expect(root).toHaveClass('consumer-class');
  });

  it('configures indeterminate motion by default', () => {
    const { result } = renderHook(() => useProgressBar({}, null));

    expect(result.current.indeterminateMotion).toBeDefined();
  });

  it('supports a custom indeterminate motion and disabling motion', () => {
    const customResult = render(
      <ProgressBar
        indeterminateMotion={{
          children: (_, props) => <div data-testid="custom-motion">{props.children}</div>,
        }}
      />,
    );
    expect(customResult.getByTestId('custom-motion')).toContainElement(
      customResult.getByRole('progressbar').querySelector(`.${progressBarClassNames.bar}`),
    );

    const disabledResult = render(<ProgressBar indeterminateMotion={null} />);
    expect(disabledResult.container.querySelector('[role="progressbar"]')?.firstElementChild).toHaveClass(
      progressBarClassNames.bar,
    );
  });
});
