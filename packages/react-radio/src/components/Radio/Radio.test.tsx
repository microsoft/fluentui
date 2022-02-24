import * as React from 'react';
import { render } from '@testing-library/react';
import { Radio } from './Radio';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

describe('Radio', () => {
  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  beforeEach(() => {
    resetIdsForTests();
  });

  it('renders a default state', () => {
    const result = render(<Radio label="Default Radio" />);
    expect(result.container).toMatchSnapshot();
  });
});
