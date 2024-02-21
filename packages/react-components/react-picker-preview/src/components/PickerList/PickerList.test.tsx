import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PickerList } from './PickerList';

describe('PickerList', () => {
  isConformant({
    Component: PickerList,
    displayName: 'PickerList',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PickerList>Default PickerList</PickerList>);
    expect(result.container).toMatchSnapshot();
  });
});
