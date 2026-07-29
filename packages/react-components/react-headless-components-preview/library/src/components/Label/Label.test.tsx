import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Label } from './Label';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
  });

  it('renders as a label tag', () => {
    const { getByText } = render(<Label>Default Label</Label>);
    const label = getByText('Default Label');

    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('renders required asterisk when required prop is true', () => {
    const { getByText } = render(<Label required>Required Label</Label>);
    const label = getByText('Required Label');
    const asterisk = getByText('*');

    expect(label).toBeInTheDocument();
    expect(asterisk).toBeInTheDocument();
  });

  it('renders custom required indicator when required prop is a string', () => {
    const { getByText } = render(<Label required="(required)">Custom Required Label</Label>);
    const label = getByText('Custom Required Label');
    const customIndicator = getByText('(required)');

    expect(label).toBeInTheDocument();
    expect(customIndicator).toBeInTheDocument();
  });

  it('renders a disabled label when disabled prop is true', () => {
    const { getByText } = render(<Label disabled>Disabled Label</Label>);
    const label = getByText('Disabled Label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('data-disabled');
  });
});
