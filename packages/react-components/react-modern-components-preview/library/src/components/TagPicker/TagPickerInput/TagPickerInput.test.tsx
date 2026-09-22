import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerInput, tagPickerInputClassNames } from './';

describe('TagPickerInput', () => {
  it('renders inherited size, stable classes, and forwards its ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(
      <TagPicker noPopover size="large">
        <TagPickerInput aria-label="Tags" className="consumer-class" ref={ref} />
      </TagPicker>,
    );
    const root = getByRole('combobox');

    expect(ref.current).toBe(root);
    expect(root).toHaveClass(tagPickerInputClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-size', 'large');
  });
});
