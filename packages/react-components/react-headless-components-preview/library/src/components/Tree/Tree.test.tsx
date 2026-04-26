import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from './Tree';

describe('Tree', () => {
  it('renders without crashing', () => {
    const { container } = render(<Tree />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies className', () => {
    const { container } = render(<Tree className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
