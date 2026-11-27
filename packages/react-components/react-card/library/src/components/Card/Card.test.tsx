import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../testing/isConformant';

import { Card } from './Card';
import type { CardProps } from './Card.types';
import { cardClassNames } from './useCardStyles.styles';
import { useCardBase_unstable } from './useCard';

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

  it('applies disabled state correctly', () => {
    const { getByTestId } = render(
      <Card data-testid="card" disabled>
        Default Card
      </Card>,
    );

    expect(getByTestId('card').getAttribute('aria-disabled')).toEqual('true');
  });

  it('does not respond to clicks when disabled', () => {
    const clickFn = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="card" disabled onClick={clickFn}>
        Default Card
      </Card>,
    );

    fireEvent.click(getByTestId('card'));
    expect(clickFn).not.toHaveBeenCalled();
  });

  it('disables selection when disabled', () => {
    const onSelectionChange = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="card" disabled selected={false} onSelectionChange={onSelectionChange}>
        Default Card
      </Card>,
    );

    fireEvent.click(getByTestId('card'));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('disables checkbox when card is disabled', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <Card disabled selected={false} onSelectionChange={onSelectionChange}>
        Default Card
      </Card>,
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toHaveAttribute('disabled');
  });

  it('does not apply tabindex when disabled', () => {
    const clickFn = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="card" disabled onClick={clickFn}>
        Default Card
        <button data-testid="button">focusable</button>
      </Card>,
    );

    expect(getByTestId('card').getAttribute('tabindex')).toBeNull();
  });
});

describe('Card DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Card
        appearance="outline"
        disabled
        focusMode="off"
        onSelectionChange={jest.fn()}
        orientation="horizontal"
        selected
        size="large"
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-disabled',
      'class',
      'role',
    ]);
  });

  it('forwards native attributes not in the old allow-list', () => {
    const { container } = render(<Card autoCapitalize="off" />);

    expect((container.firstElementChild as HTMLElement).getAttribute('autocapitalize')).toBe('off');
  });
});

describe('useCardBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() =>
      useCardBase_unstable(
        {
          checkbox: {},
          defaultSelected: true,
          disabled: false,
          floatingAction: {},
          focusMode: 'off',
          onSelectionChange: jest.fn(),
          selected: true,
          shouldRestrictTriggerAction: () => false,
        },
        React.createRef(),
      ),
    );

    expect(result.current.root).not.toHaveProperty('checkbox');
    expect(result.current.root).not.toHaveProperty('defaultSelected');
    expect(result.current.root).not.toHaveProperty('disabled');
    expect(result.current.root).not.toHaveProperty('floatingAction');
    expect(result.current.root).not.toHaveProperty('focusMode');
    expect(result.current.root).not.toHaveProperty('onSelectionChange');
    expect(result.current.root).not.toHaveProperty('selected');
    expect(result.current.root).not.toHaveProperty('shouldRestrictTriggerAction');
  });
});
