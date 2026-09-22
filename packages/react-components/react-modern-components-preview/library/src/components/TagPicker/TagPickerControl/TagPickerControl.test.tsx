import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerControl, tagPickerControlClassNames } from './';

describe('TagPickerControl', () => {
  it('renders inherited visual state and stable classes', () => {
    const { container } = render(
      <TagPicker appearance="underline" noPopover size="large">
        <TagPickerControl className="consumer-class">
          <TagPickerInput aria-label="Tags" />
        </TagPickerControl>
      </TagPicker>,
    );
    const root = container.querySelector(`.${tagPickerControlClassNames.root}`);

    expect(root).toHaveClass(tagPickerControlClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-appearance', 'underline');
    expect(root).toHaveAttribute('data-size', 'large');
  });
});
