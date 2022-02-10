import * as React from 'react';
import { render } from '@testing-library/react';
import { Option } from './Option';
import { isConformant } from '../../common/isConformant';

describe('Option', () => {
  isConformant({
    Component: Option,
    displayName: 'Option',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Option>Default Option</Option>);
    expect(result.container).toMatchSnapshot();
  });
});
