import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { validateBehavior, ComponentTestFacade, toggleButtonBehaviorDefinition } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonProps } from './ToggleButton.types';

describe('ToggleButton', () => {
  beforeAll(() => {
    // Reset body after behavioral checks are done
    document.body.innerHTML = '';
  });

  isConformant({
    Component: ToggleButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToggleButton',
  });

  xdescribe('AccesibilityButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(ToggleButton, {});
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });

  it('triggers a change in `aria-pressed` when clicked if it is uncontrolled', () => {
    const result = render(<ToggleButton>This is a toggle button</ToggleButton>);
    const toggleButton = result.getByRole('button');

    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
  });

  it('does not trigger a change in `aria-pressed` when clicked if it is controlled', () => {
    const result = render(<ToggleButton checked>This is a toggle button</ToggleButton>);
    const toggleButton = result.getByRole('button');

    expect(toggleButton.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('does not trigger a change in `aria-pressed` when clicked if it is disabled', () => {
    const result = render(<ToggleButton disabled>This is a toggle button</ToggleButton>);
    const toggleButton = result.getByRole('button');

    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
  });

  it('does not trigger a change in `aria-pressed` when clicked if it is disabledFocusable', () => {
    const result = render(<ToggleButton disabledFocusable>This is a toggle button</ToggleButton>);
    const toggleButton = result.getByRole('button');

    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
  });
});
