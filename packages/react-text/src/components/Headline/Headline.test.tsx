import * as React from 'react';
import { render } from '@testing-library/react';
import { Headline } from './Headline';
import { isConformant } from '../../common/isConformant';

describe('Headline', () => {
  isConformant({
    Component: Headline,
    displayName: 'Headline',
  });

  it('renders a default state', () => {
    const result = render(<Headline>Default Headline</Headline>);
    expect(result.container).toMatchSnapshot();
  });
});
