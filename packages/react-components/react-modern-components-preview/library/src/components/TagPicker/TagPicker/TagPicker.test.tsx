import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from './TagPicker';
import { TagPickerControl, tagPickerControlClassNames } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';

describe('TagPicker', () => {
  it('provides default visual state to descendants', () => {
    const { container } = render(
      <TagPicker noPopover>
        <TagPickerControl>
          <TagPickerInput aria-label="Tags" />
        </TagPickerControl>
      </TagPicker>,
    );

    expect(TagPicker.displayName).toBe('TagPicker');
    expect(container.querySelector(`.${tagPickerControlClassNames.root}`)).toHaveAttribute(
      'data-appearance',
      'outline',
    );
    expect(container.querySelector(`.${tagPickerControlClassNames.root}`)).toHaveAttribute('data-size', 'medium');
  });

  it('provides configured visual state to descendants', () => {
    const { container, getByRole } = render(
      <TagPicker appearance="filled-darker" noPopover size="extra-large">
        <TagPickerControl>
          <TagPickerInput aria-label="Tags" />
        </TagPickerControl>
      </TagPicker>,
    );

    expect(container.querySelector(`.${tagPickerControlClassNames.root}`)).toHaveAttribute(
      'data-appearance',
      'filled-darker',
    );
    expect(getByRole('combobox')).toHaveAttribute('data-size', 'extra-large');
  });
});
