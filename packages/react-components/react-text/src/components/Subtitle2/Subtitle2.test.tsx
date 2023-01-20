import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle2 } from './Subtitle2';
import { isConformant } from '../../testing/isConformant';

describe('Subtitle2', () => {
  isConformant({
    Component: Subtitle2,
    displayName: 'Subtitle2',
  });

  it('renders a default state', () => {
    const result = render(<Subtitle2>Default Subtitle2</Subtitle2>);
    expect(result.container).toMatchSnapshot();
  });
});
