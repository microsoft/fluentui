import * as React from 'react';
import { render } from '@testing-library/react';
import { Card } from './Card';
import { isConformant } from '../../testing/isConformant';
import { CardProps } from './Card.types';
import { cardClassNames } from './useCardStyles';

describe('Card', () => {
  isConformant<CardProps>({
    Component: Card,
    displayName: 'Card',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            select: 'Test Select',
          },
          expectedClassNames: {
            root: cardClassNames.root,
            select: cardClassNames.select,
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Card>Default Card</Card>);
    expect(result.container).toMatchSnapshot();
  });
});
