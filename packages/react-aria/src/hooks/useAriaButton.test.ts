import * as React from 'react';
import { useARIAButton } from './useAriaButton';
import { renderHook } from '@testing-library/react-hooks';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

describe('useARIAButton', () => {
  it('should return by default shorthand props for a button', () => {
    const shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> = {};
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('button');
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
    expect(shorthand.role).toBe('button');
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.tabIndex).toBeUndefined();
    expect(shorthand.onKeyDown).toBeUndefined();
    expect(shorthand.onKeyUp).toBeUndefined();
  });
  it('should return handlers when shorthand props declares another semantic element', () => {
    const shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> = { as: 'div' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('div');
    expect(shorthand.role).toBe('button');
    expect(shorthand.tabIndex).toBe(0);
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });
});
