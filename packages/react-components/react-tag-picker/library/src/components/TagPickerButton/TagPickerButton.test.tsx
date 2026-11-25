import * as React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerButton } from './TagPickerButton';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerList } from '../TagPickerList/TagPickerList';

describe('TagPickerButton', () => {
  it.each([
    [true, undefined, true],
    [true, false, true],
    [false, true, true],
    [false, false, false],
  ])('inherits disabled state (picker=%s, button=%s)', (pickerDisabled, buttonDisabled, expected) => {
    const { getByRole } = render(
      <TagPicker disabled={pickerDisabled}>
        <TagPickerButton disabled={buttonDisabled}>Select animals</TagPickerButton>
        <TagPickerList />
      </TagPicker>,
    );

    if (expected) {
      expect(getByRole('combobox')).toBeDisabled();
    } else {
      expect(getByRole('combobox')).not.toBeDisabled();
    }
  });

  isConformant({
    Component: TagPickerButton,
    displayName: 'TagPickerButton',
    disabledTests: [
      // root element does not contain all the classnames
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerButton>Default PickerButton</TagPickerButton>);
    expect(result.container).toMatchSnapshot();
  });
});
