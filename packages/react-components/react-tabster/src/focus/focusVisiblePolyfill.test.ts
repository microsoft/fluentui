import type { Keyborg } from 'keyborg';
import { createKeyborg, disposeKeyborg } from 'keyborg';
import { FOCUS_VISIBLE_ATTR } from './constants';
import { applyFocusVisiblePolyfill } from './focusVisiblePolyfill';
import { fireEvent } from '@testing-library/dom';

describe('focus visible polyfill', () => {
  let keyborg: Keyborg;
  beforeEach(() => {
    keyborg = createKeyborg(window);
    document.body.innerHTML = '';
  });

  afterEach(() => {
    if (keyborg) {
      disposeKeyborg(keyborg);
    }
  });

  it('should set focus visible attribute on initialization if in keyboard navigation mode', () => {
    const scope = document.createElement('div');
    const button = document.createElement('button');
    scope.append(button);
    document.body.append(scope);

    button.focus();
    fireEvent.keyDown(window);
    const dispose = applyFocusVisiblePolyfill(scope, window);

    expect(button.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(true);

    dispose();
  });

  it('should not set focus visible attribute on initialization if not in keyboard navigation mode', () => {
    const scope = document.createElement('div');
    const button = document.createElement('button');
    scope.append(button);
    document.body.append(scope);

    button.focus();
    const dispose = applyFocusVisiblePolyfill(scope, window);

    expect(button.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(false);

    dispose();
  });

  it('should remove focus visible attribute on dispose', () => {
    const scope = document.createElement('div');
    const button = document.createElement('button');
    scope.append(button);
    document.body.append(scope);

    button.focus();
    fireEvent.keyDown(window);
    const dispose = applyFocusVisiblePolyfill(scope, window);

    expect(button.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(true);
    dispose();
    expect(button.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(false);
  });

  it('should add focus visible attribute on active element when modality changes', () => {
    const scope = document.createElement('div');
    const button = document.createElement('button');
    scope.append(button);
    document.body.append(scope);

    const dispose = applyFocusVisiblePolyfill(scope, window);

    button.focus();
    fireEvent.keyDown(window);

    expect(button.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(true);
    dispose();
  });

  it('should maintain focus visible in nested scope when outer scope is disposed', () => {
    const outerScope = document.createElement('div');
    const innerScope = document.createElement('div');
    const innerButton1 = document.createElement('button');
    const innerButton2 = document.createElement('button');

    innerScope.append(innerButton1);
    innerScope.append(innerButton2);
    outerScope.append(innerScope);
    document.body.append(outerScope);

    const disposeOuter = applyFocusVisiblePolyfill(outerScope, window);
    const disposeInner = applyFocusVisiblePolyfill(innerScope, window);

    innerButton1.focus();
    fireEvent.keyDown(window);

    expect(innerButton1.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(true);

    // Dispose outer scope (simulating unmounting outer provider)
    disposeOuter();

    // Focusing another button inside inner scope should still apply focus-visible
    innerButton2.focus();
    expect(innerButton2.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(true);

    // Disposing inner scope clears focus-visible
    disposeInner();
    expect(innerButton2.hasAttribute(FOCUS_VISIBLE_ATTR)).toBe(false);
  });
});
