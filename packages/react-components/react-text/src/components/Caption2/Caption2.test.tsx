import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption2 } from './Caption2';
import { isConformant } from '../../common/isConformant';

describe('Caption2', () => {
  isConformant({
    Component: Caption2,
    displayName: 'Caption2',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Caption2>Default Caption2</Caption2>);
    expect(result.container).toMatchSnapshot();
  });
});
