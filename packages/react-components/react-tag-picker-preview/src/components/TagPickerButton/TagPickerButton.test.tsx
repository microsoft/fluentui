import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerButton } from './TagPickerButton';

describe('TagPickerButton', () => {
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
