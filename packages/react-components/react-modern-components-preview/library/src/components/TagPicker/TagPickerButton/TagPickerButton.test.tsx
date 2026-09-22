import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerButton, tagPickerButtonClassNames } from './';

describe('TagPickerButton', () => {
  it('renders inherited size and stable classes', () => {
    const { getByRole } = render(
      <TagPicker noPopover size="extra-large">
        <TagPickerButton className="consumer-class">Select tags</TagPickerButton>
      </TagPicker>,
    );
    const root = getByRole('combobox');

    expect(root).toHaveClass(tagPickerButtonClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-size', 'extra-large');
  });
});
