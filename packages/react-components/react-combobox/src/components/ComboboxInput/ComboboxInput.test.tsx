import * as React from 'react';
import { render } from '@testing-library/react';
import { ComboboxInput } from './ComboboxInput';
import { isConformant } from '../../common/isConformant';

describe('ComboboxInput', () => {
  isConformant({
    Component: ComboboxInput,
    displayName: 'ComboboxInput',
    primarySlot: 'input',
    // don't test deprecated className export on new components
    disabledTests: ['component-has-static-classname-exported'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ComboboxInput />);
    expect(result.container).toMatchSnapshot();
  });
});
