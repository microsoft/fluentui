import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
import { isConformant } from '../../common/isConformant';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    disabledTests: [
      'component-has-static-classname',
      'component-has-static-classname-exported',
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Spinner>Default Spinner</Spinner>);
    expect(result.container).toMatchSnapshot();
  });
});
