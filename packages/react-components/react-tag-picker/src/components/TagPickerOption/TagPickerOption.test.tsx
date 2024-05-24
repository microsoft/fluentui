import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOption } from './TagPickerOption';
import { TagPickerOptionProps } from './TagPickerOption.types';

describe('TagPickerOption', () => {
  isConformant<TagPickerOptionProps>({
    Component: TagPickerOption,
    displayName: 'TagPickerOption',
    requiredProps: { value: 'value', media: <></>, secondaryContent: <></> },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerOption value="value">Default TagPickerOption</TagPickerOption>);
    expect(result.container).toMatchSnapshot();
  });
});
