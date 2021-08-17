import * as React from 'react';
import { render } from '@testing-library/react';
import { Switch } from './Switch';
// import { isConformant } from '../../common/isConformant';

describe('Switch', () => {
  // isConformant({
  //   Component: Switch,
  //   displayName: 'Switch',
  // });

  it('renders a default state', () => {
    const result = render(<Switch>Default Switch</Switch>);
    expect(result.container).toMatchSnapshot();
  });
});
