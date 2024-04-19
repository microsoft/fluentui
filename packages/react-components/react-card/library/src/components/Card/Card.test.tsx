import * as React from 'react';
import { render } from '@testing-library/react';
import { Card } from './Card';
import { isConformant } from '../../testing/isConformant';
import { CardProps } from './Card.types';
import { cardClassNames } from './useCardStyles.styles';

describe('Card', () => {
  isConformant<CardProps>({
    Component: Card,
    displayName: 'Card',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            floatingAction: '<button>Button</button>',
          },
          expectedClassNames: {
            root: cardClassNames.root,
            floatingAction: cardClassNames.floatingAction,
          },
        },
        {
          props: {
            selected: true,
          },
          expectedClassNames: {
            root: cardClassNames.root,
            checkbox: cardClassNames.checkbox,
          },
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onSelectionChange'],
      },
    },
    disabledTests: ['component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Card>Default Card</Card>);
    expect(result.container).toMatchSnapshot();
  });
});
