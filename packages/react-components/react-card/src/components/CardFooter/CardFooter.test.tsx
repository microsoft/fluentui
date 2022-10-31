import * as React from 'react';
import { render } from '@testing-library/react';
import { CardFooter } from './CardFooter';
import { isConformant } from '../../testing/isConformant';

describe('CardFooter', () => {
  isConformant({
    Component: CardFooter,
    displayName: 'CardFooter',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            action: 'Test Action',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<CardFooter action={'Action slot'}>Default CardFooter</CardFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
