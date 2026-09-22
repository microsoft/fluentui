import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerButton } from '../TagPickerButton';
import { TagPickerList } from '../TagPickerList';
import { TagPickerOption, tagPickerOptionClassNames } from './';

describe('TagPickerOption', () => {
  it('renders slots, stable classes, and consumer classes', () => {
    const { getByRole } = render(
      <TagPicker open>
        <TagPickerButton>Tags</TagPickerButton>
        <TagPickerList>
          <TagPickerOption className="consumer-class" media="M" secondaryContent="Secondary" value="one">
            One
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    expect(getByRole('option')).toHaveClass(tagPickerOptionClassNames.root, 'consumer-class');
    expect(getByRole('option').querySelector(`.${tagPickerOptionClassNames.media}`)).not.toBeNull();
  });
});
