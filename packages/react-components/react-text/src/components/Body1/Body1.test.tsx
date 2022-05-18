import * as React from 'react';
import { render } from '@testing-library/react';
import { Body1 } from './Body1';
import { isConformant } from '../../common/isConformant';

describe('Body1', () => {
  isConformant({
    Component: Body1,
    displayName: 'Body1',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Body1>Default Body1</Body1>);
    expect(result.container).toMatchSnapshot();
  });
});
