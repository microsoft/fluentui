import * as React from 'react';
import { render } from '@testing-library/react';
import { Display } from './Display';
import { isConformant } from '../../common/isConformant';

describe('Display', () => {
  isConformant({
    Component: Display,
    displayName: 'Display',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Display>Default Display</Display>);
    expect(result.container).toMatchSnapshot();
  });
});
