import * as React from 'react';
import { render } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  beforeEach(() => {
    resetIdsForTests();
  });

  it('renders a default state', () => {
    const result = render(<RadioGroup />);
    expect(result.container).toMatchSnapshot();
  });
});
