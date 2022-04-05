import * as React from 'react';
import { render } from '@testing-library/react';
import { Body } from './Body';
import { isConformant } from '../../common/isConformant';

describe('Body', () => {
  isConformant({
    Component: Body,
    displayName: 'Body',
  });

  it('renders a default state', () => {
    const result = render(<Body>Default Body</Body>);
    expect(result.container).toMatchSnapshot();
  });
});
