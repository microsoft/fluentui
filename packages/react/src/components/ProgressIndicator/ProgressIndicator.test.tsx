import * as React from 'react';
import { render } from '@testing-library/react';
import { ProgressIndicator } from './ProgressIndicator';
import { isConformant } from '../../common/isConformant';

describe('ProgressIndicator', () => {
  it('renders ProgressIndicator correctly', () => {
    const { container } = render(<ProgressIndicator label="Test" description="Test" percentComplete={0.75} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders indeterminate ProgressIndicator correctly', () => {
    const { container } = render(<ProgressIndicator label="Test" description="Test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with no progress', () => {
    const { container } = render(<ProgressIndicator label="Test" description="Test" progressHidden={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with no label or description', () => {
    const { container } = render(<ProgressIndicator />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with ariaLabel', () => {
    const { container } = render(<ProgressIndicator ariaLabel="Test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders React content', () => {
    const { container } = render(<ProgressIndicator label={<span>Test</span>} description={<span>Test</span>} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: ProgressIndicator,
    displayName: 'ProgressIndicator',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
