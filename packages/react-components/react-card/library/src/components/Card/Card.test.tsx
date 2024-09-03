import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('does not manage focus by default for non-interactive cards', () => {
    const { getByTestId } = render(
      <Card data-testid="card">
        Default Card
        <button data-testid="button">focusable</button>
      </Card>,
    );
    userEvent.tab();

    expect(getByTestId('card').getAttribute('tabindex')).toBeNull();
    expect(document.activeElement).toEqual(getByTestId('button'));
  });

  it('does tab-only focus by default for interactive cards', () => {
    const clickFn = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="card" onClick={clickFn}>
        Default Card
        <button data-testid="button">focusable</button>
      </Card>,
    );
    userEvent.tab();

    expect(getByTestId('card').getAttribute('tabindex')).toEqual('0');
    expect(document.activeElement).toEqual(getByTestId('card'));

    userEvent.tab();

    expect(document.activeElement).toEqual(getByTestId('button'));
  });

  it('allows explicit focusMode attribute to override default for interactive cards', () => {
    const clickFn = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="card" onClick={clickFn} focusMode="off">
        Default Card
        <button data-testid="button">focusable</button>
      </Card>,
    );
    userEvent.tab();

    expect(getByTestId('card').getAttribute('tabindex')).toBeNull();
    expect(document.activeElement).toEqual(getByTestId('button'));
  });
});
