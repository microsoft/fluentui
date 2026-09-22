import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Option } from '../Dropdown/Option/Option';
import { Combobox } from './Combobox';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { 'aria-label': 'Options' },
    primarySlot: 'input',
  });

  it('applies visual defaults and preserves a custom class name', () => {
    const { container } = render(<Combobox aria-label="Options" className="custom-class" />);
    const root = container.firstElementChild;

    expect(root).toHaveClass('fui-Combobox', 'custom-class');
    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
  });

  it('maps visual props to data attributes', () => {
    const { container } = render(<Combobox aria-label="Options" appearance="filled-darker" size="large" />);

    expect(container.firstElementChild).toHaveAttribute('data-appearance', 'filled-darker');
    expect(container.firstElementChild).toHaveAttribute('data-size', 'large');
  });

  it('renders the shared modern Listbox when open', () => {
    const { getByRole } = render(
      <Combobox aria-label="Options" defaultOpen>
        <Option>Option</Option>
      </Combobox>,
    );

    expect(getByRole('listbox')).toHaveClass('fui-Listbox');
    expect(getByRole('option')).toHaveClass('fui-Option');
  });
});
