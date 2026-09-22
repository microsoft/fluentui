import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerButton } from '../TagPickerButton';
import { TagPickerList } from '../TagPickerList';
import { TagPickerOptionGroup, tagPickerOptionGroupClassNames } from './';

describe('TagPickerOptionGroup', () => {
  it('renders stable classes on root and label', () => {
    const { getByRole, getByText } = render(
      <TagPicker open>
        <TagPickerButton>Tags</TagPickerButton>
        <TagPickerList>
          <TagPickerOptionGroup className="consumer-class" label="Group" />
        </TagPickerList>
      </TagPicker>,
    );

    expect(getByRole('group')).toHaveClass(tagPickerOptionGroupClassNames.root, 'consumer-class');
    expect(getByText('Group')).toHaveClass(tagPickerOptionGroupClassNames.label);
  });
});
