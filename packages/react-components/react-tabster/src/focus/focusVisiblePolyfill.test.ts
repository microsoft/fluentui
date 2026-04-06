import { createKeyboardDetector, disposeKeyboardDetector } from '../focus-navigation/keyboardDetector';
import { FOCUS_VISIBLE_ATTR } from './constants';
import { applyFocusVisiblePolyfill } from './focusVisiblePolyfill';
import { fireEvent } from '@testing-library/dom';

describe('focus visible polyfill', () => {
  let detector: ReturnType<typeof createKeyboardDetector>;

  beforeEach(() => {
    detector = createKeyboardDetector(window);
    document.body.innerHTML = '';
  });

  afterEach(() => {
    if (detector) {
      disposeKeyboardDetector(detector);
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
});
