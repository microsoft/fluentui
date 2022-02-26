import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Radio } from './Radio';

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
