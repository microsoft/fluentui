import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

import { isConformant } from '../../testing/isConformant';

import { Card } from './Card';
import type { CardProps } from './Card.types';

describe('Card', () => {
  isConformant<CardProps>({
    Component: Card,
    displayName: 'Card',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onSelectionChange'],
      },
    },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format and that every value appears in the rendered DOM.
    // D16.1 removes those statics: `cardClassNames` is retained but re-pointed to the
    // `group/fui-card` marker and narrowed to `{ root: string }` (D16.5), so all three of
    // its sub-assertions are now false by construction. The rule is retired from the
    // default set repo-wide as the sweep completes (D16.6); until then converted packages
    // opt out here. `component-has-group-marker` (now a default test) is its replacement — it asserts the
    // marker IS stamped and, critically, that it is never `classList[0]` (D15.1 / D16.2).
    disabledTests: [
      'component-has-static-classname-exported',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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
