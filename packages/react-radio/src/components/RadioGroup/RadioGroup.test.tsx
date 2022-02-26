import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { RadioGroup } from './RadioGroup';

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
