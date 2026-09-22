import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Option } from '../Option/Option';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { 'aria-label': 'Options' },
    primarySlot: 'button',
  });

  it('applies visual defaults and preserves a custom class name', () => {
    const { container } = render(<Dropdown aria-label="Options" className="custom-class" />);
    const root = container.firstElementChild;

    expect(root).toHaveClass('fui-Dropdown', 'custom-class');
    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
  });

  it('maps visual props to data attributes', () => {
    const { container } = render(<Dropdown aria-label="Options" appearance="underline" size="small" />);

    expect(container.firstElementChild).toHaveAttribute('data-appearance', 'underline');
    expect(container.firstElementChild).toHaveAttribute('data-size', 'small');
  });

  it('renders the shared modern Listbox when open', () => {
    const { getByRole } = render(
      <Dropdown aria-label="Options" defaultOpen>
        <Option>Option</Option>
      </Dropdown>,
    );

    expect(getByRole('listbox')).toHaveClass('fui-Listbox');
    expect(getByRole('option')).toHaveClass('fui-Option');
  });
});
