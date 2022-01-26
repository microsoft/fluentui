import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption } from './Caption';
import { isConformant } from '../../common/isConformant';

describe('Caption', () => {
  isConformant({
    Component: Caption,
    displayName: 'Caption',
  });

  it('renders a default state', () => {
    const result = render(<Caption>Default Caption</Caption>);
    expect(result.container).toMatchSnapshot();
  });
});
