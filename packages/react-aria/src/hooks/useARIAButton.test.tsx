import * as React from 'react';
import { ARIAButtonShorthandProps, useARIAButton } from './useARIAButton';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, screen, render } from '@testing-library/react';
import { getSlots } from '@fluentui/react-utilities';

describe('useARIAButton', () => {
  it('should return by default shorthand props for a button', () => {
    const shorthand: ARIAButtonShorthandProps = { as: 'button' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('button');
    expect(shorthand.disabled).toBeUndefined();
    expect(shorthand['aria-disabled']).toBeUndefined();
    expect(shorthand.role).toBeUndefined();
    expect(shorthand.onClick).toBeUndefined();
    expect(shorthand.tabIndex).toBeUndefined();
    expect(shorthand.onKeyDown).toBeUndefined();
    expect(shorthand.onKeyUp).toBeUndefined();
  });
  it('should return handlers for anchor when anchor element is declared', () => {
    const shorthand: ARIAButtonShorthandProps = { as: 'a' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('a');
    expect(shorthand['aria-disabled']).toBe(false);
    expect(shorthand.role).toBe('button');
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.tabIndex).toBeUndefined();
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });
  it('should return handlers when shorthand props declares another semantic element', () => {
    const shorthand: ARIAButtonShorthandProps = { as: 'div' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('div');
    expect(shorthand.role).toBe('button');
    expect(shorthand['aria-disabled']).toBe(false);
    expect(shorthand.tabIndex).toBe(0);
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });

  it('should emit click events on Click', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }, { required: true }));
    const { slots, slotProps } = getSlots<{ root: ARIAButtonShorthandProps }>({ root: result.current }, ['root']);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.click(screen.getByTestId('div'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should emit click events on SpaceBar', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }, { required: true }));
    const { slots, slotProps } = getSlots({ root: result.current }, ['root']);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.keyUp(screen.getByTestId('div'), { key: Space });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should emit click events on Enter', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }, { required: true }));
    const { slots, slotProps } = getSlots({ root: result.current }, ['root']);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.keyDown(screen.getByTestId('div'), { key: Enter });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent default and stop propagation on disabled while clicking', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() =>
      useARIAButton({ as: 'div', 'aria-disabled': true, onClick: handleClick }, { required: true }),
    );
    const { slots, slotProps } = getSlots({ root: result.current }, ['root']);
    render(
      <div onClick={handleClick}>
        <slots.root data-testid="div" {...slotProps.root} />
      </div>,
    );
    fireEvent.click(screen.getByTestId('div'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('should prevent default and stop propagation on disabled while pressing SpaceBar', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() =>
      useARIAButton({ as: 'div', 'aria-disabled': true, onClick: handleClick }, { required: true }),
    );
    const { slots, slotProps } = getSlots({ root: result.current }, ['root']);
    render(
      <div onClick={handleClick}>
        <slots.root data-testid="div" {...slotProps.root} />
      </div>,
    );
    fireEvent.keyUp(screen.getByTestId('div'), { key: Space });
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('should prevent default and stop propagation on disabled while pressing Enter', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() =>
      useARIAButton({ as: 'div', 'aria-disabled': true, onClick: handleClick }, { required: true }),
    );
    const { slots, slotProps } = getSlots({ root: result.current }, ['root']);
    render(
      <div onClick={handleClick}>
        <slots.root data-testid="div" {...slotProps.root} />
      </div>,
    );
    fireEvent.keyDown(screen.getByTestId('div'), { key: Enter });
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
