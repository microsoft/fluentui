import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerButton } from '../TagPickerButton';
import { TagPickerList, tagPickerListClassNames } from './';

describe('TagPickerList', () => {
  it('renders stable classes while open', () => {
    const { getByRole } = render(
      <TagPicker open>
        <TagPickerButton>Tags</TagPickerButton>
        <TagPickerList className="consumer-class" />
      </TagPicker>,
    );

    expect(getByRole('listbox')).toHaveClass(tagPickerListClassNames.root, 'consumer-class');
  });
});
