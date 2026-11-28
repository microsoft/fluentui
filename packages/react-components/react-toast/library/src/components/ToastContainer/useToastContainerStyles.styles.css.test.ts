import { slot } from '@fluentui/react-utilities';
import { Timer } from '../Timer/Timer';
import type { ToastContainerState } from './ToastContainer.types';
import { toastContainerClassNames, useToastContainerStyles_unstable } from './useToastContainerStyles.styles.css';

jest.mock('./ToastContainer.module.css', () => ({ root: 'css-root' }));

describe('useToastContainerStyles_unstable (CSS Modules)', () => {
  it('styles the root without changing timer classes or state', () => {
    const state: ToastContainerState = {
      components: { root: 'div', timer: Timer },
      root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
      timer: slot.always({ onTimeout: jest.fn(), running: false, timeout: 0 }, { elementType: Timer }),
      running: false,
      timerTimeout: 0,
      transitionTimeout: 0,
      visible: true,
      remove: jest.fn(),
      close: jest.fn(),
      onTransitionEntering: jest.fn(),
      updateId: 0,
      nodeRef: { current: null },
      intent: undefined,
      titleId: 'title',
      bodyId: 'body',
    };
    const timer = state.timer;
    expect(useToastContainerStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${toastContainerClassNames.root} css-root caller-root`);
    expect(state.timer).toBe(timer);
  });
});
