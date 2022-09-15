import * as React from 'react';
import { render } from '@testing-library/react';
import { Subtitle1 } from './Subtitle1';
import { isConformant } from '../../common/isConformant';

describe('Subtitle1', () => {
  isConformant({
    Component: Subtitle1,
    displayName: 'Subtitle1',
  });

  it('renders a default state', () => {
    const result = render(<Subtitle1>Default Subtitle1</Subtitle1>);
    expect(result.container).toMatchSnapshot();
  });
});
