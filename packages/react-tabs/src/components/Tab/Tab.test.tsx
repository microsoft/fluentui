import * as React from 'react';
import { render } from '@testing-library/react';
import { Tab } from './Tab';
import { isConformant } from '../../common/isConformant';

describe('Tab', () => {
  isConformant({
    Component: Tab,
    displayName: 'Tab',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tab>Default Tab</Tab>);
    expect(result.container).toMatchSnapshot();
  });
});
