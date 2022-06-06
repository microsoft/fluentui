import * as React from 'react';
import { render } from '@testing-library/react';
import { Title2 } from './Title2';
import { isConformant } from '../../common/isConformant';

describe('Title2', () => {
  isConformant({
    Component: Title2,
    displayName: 'Title2',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Title2>Default Title2</Title2>);
    expect(result.container).toMatchSnapshot();
  });
});
