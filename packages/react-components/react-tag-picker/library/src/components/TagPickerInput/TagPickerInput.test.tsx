import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerInput } from './TagPickerInput';

describe('TagPickerInput', () => {
  isConformant({
    Component: TagPickerInput,
    displayName: 'TagPickerInput',
    disabledTests: [
      // clearIcon and expandIcon are not rendered on the root component
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerInput />);
    expect(result.container).toMatchSnapshot();
  });
});
