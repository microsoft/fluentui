import * as React from 'react';
import { render } from '@testing-library/react';
import { Caption1 } from './Caption1';
import { isConformant } from '../../common/isConformant';

describe('Caption1', () => {
  isConformant({
    Component: Caption1,
    displayName: 'Caption1',
  });

  it('renders a default state', () => {
    const result = render(<Caption1>Default Caption1</Caption1>);
    expect(result.container).toMatchSnapshot();
  });
});
