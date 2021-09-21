import * as React from 'react';
import { render } from '@testing-library/react';
import { CardFooter } from './CardFooter';
import { isConformant } from '../../common/isConformant';

describe('CardFooter', () => {
  isConformant({
    Component: CardFooter,
    displayName: 'CardFooter',
  });

  it('renders a default state', () => {
    const result = render(<CardFooter action={'Action slot'}>Default CardFooter</CardFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
