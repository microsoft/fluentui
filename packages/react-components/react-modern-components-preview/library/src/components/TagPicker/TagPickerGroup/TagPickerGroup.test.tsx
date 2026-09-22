import * as React from 'react';
import { render } from '@testing-library/react';
import { Tag } from '../../Tag';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerGroup, tagPickerGroupClassNames } from './';

describe('TagPickerGroup', () => {
  it('maps picker visuals to its group and child tags', () => {
    const { getByRole } = render(
      <TagPicker appearance="filled-darker" noPopover selectedOptions={['Selected']} size="large">
        <TagPickerGroup className="consumer-class">
          <Tag dismissible value="Selected">
            Selected
          </Tag>
        </TagPickerGroup>
      </TagPicker>,
    );
    const group = getByRole('listbox');
    const tag = getByRole('option');

    expect(group).toHaveClass(tagPickerGroupClassNames.root, 'consumer-class');
    expect(group).toHaveAttribute('data-picker-size', 'large');
    expect(tag).toHaveAttribute('data-appearance', 'outline');
    expect(tag).toHaveAttribute('data-size', 'small');
  });
});
