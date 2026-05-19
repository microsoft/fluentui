import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tag } from './Tag';

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
  });

  it('renders a default span', () => {
    const result = render(<Tag>Default tag</Tag>);
    const tag = result.getByText('Default tag');
    expect(tag.closest('span')).toBeInTheDocument();
  });

  it('renders a button with state data attributes when dismissible', () => {
    const result = render(<Tag dismissible>Dismiss me</Tag>);
    const button = result.getByRole('button');
    expect(button).toHaveAttribute('data-dismissible');
  });

  it('sets data-disabled when disabled', () => {
    const result = render(<Tag disabled>Disabled tag</Tag>);
    const tag = result.getByText('Disabled tag');
    expect(tag.closest('[data-disabled]')).not.toBeNull();
  });

  it('sets data-selected when selected', () => {
    const result = render(<Tag selected>Selected tag</Tag>);
    const tag = result.getByText('Selected tag');
    expect(tag.closest('[data-selected]')).not.toBeNull();
  });
});
