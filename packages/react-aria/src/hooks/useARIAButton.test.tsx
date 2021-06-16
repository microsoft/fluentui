import * as React from 'react';
import { useARIAButton } from './useARIAButton';
import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, screen, render } from '@testing-library/react';
import { getSlots, ObjectShorthandProps } from '@fluentui/react-utilities';

describe('useARIAButton', () => {
  it('should return by default shorthand props for a button', () => {
    const shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> = {};
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
    const shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> = { as: 'a' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('a');
    expect(shorthand.disabled).toBeUndefined();
    expect(shorthand['aria-disabled']).toBe(false);
    expect(shorthand.children).toBe(null);
    expect(shorthand.children).toBe(null);
    expect(shorthand.role).toBe('button');
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.tabIndex).toBeUndefined();
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });
  it('should return handlers when shorthand props declares another semantic element', () => {
    const shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> = { as: 'div' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('div');
    expect(shorthand.role).toBe('button');
    expect(shorthand.disabled).toBeUndefined();
    expect(shorthand['aria-disabled']).toBe(false);
    expect(shorthand.children).toBe(null);
    expect(shorthand.tabIndex).toBe(0);
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });

  it('should emit click events on Click', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.click(screen.getByTestId('div'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should emit click events on SpaceBar', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.keyUp(screen.getByTestId('div'), { keyCode: SpacebarKey });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should emit click events on Enter', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
    render(<slots.root data-testid="div" {...slotProps.root} />);
    fireEvent.keyDown(screen.getByTestId('div'), { keyCode: EnterKey });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent default and stop propagation on disabled while clicking', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', disabled: true, onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
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
    const { result } = renderHook(() => useARIAButton({ as: 'div', disabled: true, onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
    render(
      <div onClick={handleClick}>
        <slots.root data-testid="div" {...slotProps.root} />
      </div>,
    );
    fireEvent.keyUp(screen.getByTestId('div'), { key: SpacebarKey });
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('should prevent default and stop propagation on disabled while pressing Enter', () => {
    const handleClick = jest.fn();
    const { result } = renderHook(() => useARIAButton({ as: 'div', disabled: true, onClick: handleClick }));
    const { slots, slotProps } = getSlots(result.current, []);
    render(
      <div onClick={handleClick}>
        <slots.root data-testid="div" {...slotProps.root} />
      </div>,
    );
    fireEvent.keyDown(screen.getByTestId('div'), { key: EnterKey });
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
