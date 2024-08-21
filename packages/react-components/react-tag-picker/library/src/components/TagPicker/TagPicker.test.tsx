import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';

describe('TagPicker', () => {
  isConformant({
    Component: TagPicker,
    displayName: 'TagPicker',
    requiredProps: { children: <></> },
    disabledTests: [
      // TagPicker does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // TagPicker does not have own styles
      'make-styles-overrides-win',
    ],
  });

  it('sets expand label', () => {
    const { getByRole } = render(
      <TagPicker>
        <TagPickerControl>
          <TagPickerInput aria-label="Select Employees" aria-labelledby="Select Employees" />
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    const expandButton = getByRole('button');
    expect(expandButton.getAttribute('aria-labelledby')).toContain('Select Employees');
  });
});
