import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';
import type { SplitButtonProps } from './SplitButton.types';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton as React.FunctionComponent<SplitButtonProps>,
    displayName: 'SplitButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because D16.1 removed this
    // package's BEM statics: `splitButtonClassNames` now holds only `root`, pointed at the
    // group marker, and the default test hard-codes the `fui-<Component>__<slot>` format.
    // `component-has-group-marker` (now a default test) is its replacement (DECISIONS.md D16.2 / D16.6).
    // SplitButton's root is its own `<div>`, so it carries exactly one marker.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders correctly', () => {
    const { queryAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = queryAllByRole('button');

    expect(primaryActionButton).toBeTruthy();
    expect(menuButton).toBeTruthy();
  });

  it('primary action button and menu button can both be focused', () => {
    const { getAllByRole } = render(<SplitButton>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(menuButton);
  });

  it(`neither primary action button nor menu button can be focused when disabled has been passed to the
      component`, () => {
    const { getAllByRole } = render(<SplitButton disabled>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
  });

  it(`primary action button and menu button can both be focused when disabledFocusable has been passed to the
      component`, () => {
    const { getAllByRole } = render(<SplitButton disabledFocusable>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(menuButton);
  });

  it('menu button can still be focused when disabled has been passed to the primary action button slot', () => {
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabled: true }}>This is a button</SplitButton>,
    );
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).toEqual(menuButton);
  });

  it('primary action button can still be focused when disabled has been passed to the menu button slot', () => {
    const { getAllByRole } = render(<SplitButton menuButton={{ disabled: true }}>This is a button</SplitButton>);
    const [primaryActionButton, menuButton] = getAllByRole('button');

    expect(document.activeElement).not.toEqual(primaryActionButton);
    expect(document.activeElement).not.toEqual(menuButton);
    userEvent.tab();
    expect(document.activeElement).toEqual(primaryActionButton);
    userEvent.tab();
    expect(document.activeElement).not.toEqual(menuButton);
  });

  it('can trigger a function by being clicked', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(<SplitButton onClick={onClick}>This is a button</SplitButton>);
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton disabled primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton disabledFocusable primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('can trigger a function by being clicked even when disabled has been passed to the menu button slot', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton menuButton={{ disabled: true }} primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it(`can trigger a function by being clicked even when disabledFocusable has been passed to the menu button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton menuButton={{ disabledFocusable: true }} primaryActionButton={{ onClick }}>
        This is a button
      </SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).toHaveBeenCalled();
  });

  it(`cannot trigger a function by being clicked when disabled has been passed to the primary action button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabled: true, onClick }}>This is a button</SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it(`cannot trigger a function by being clicked when disabledFocusable has been passed to the primary action button
      slot`, () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <SplitButton primaryActionButton={{ disabledFocusable: true, onClick }}>This is a button</SplitButton>,
    );
    const [primaryActionButton] = getAllByRole('button');

    userEvent.click(primaryActionButton);
    expect(onClick).not.toHaveBeenCalled();
  });
});
