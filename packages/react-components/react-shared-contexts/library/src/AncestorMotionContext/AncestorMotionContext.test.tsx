import * as React from 'react';
import { render } from '@testing-library/react';

import {
  AncestorMotionProvider,
  createAncestorMotionController,
  useAncestorMotionState,
  type AncestorMotionState,
} from './AncestorMotionContext';

let observedState: AncestorMotionState | undefined;
const MotionState = () => {
  observedState = useAncestorMotionState();
  return null;
};

describe('AncestorMotionContext', () => {
  it('is inactive by default', () => {
    render(<MotionState />);

    expect(observedState).toBeUndefined();
  });

  it('provides active motion to descendants', () => {
    const controller = createAncestorMotionController();
    controller.start();

    render(
      <AncestorMotionProvider value={controller}>
        <MotionState />
      </AncestorMotionProvider>,
    );

    expect(observedState?.active).toBe(true);
  });

  it('preserves active motion through an inactive nested provider', () => {
    const activeController = createAncestorMotionController();
    const inactiveController = createAncestorMotionController();
    activeController.start();
    inactiveController.parent = activeController;

    render(
      <AncestorMotionProvider value={activeController}>
        <AncestorMotionProvider value={inactiveController}>
          <MotionState />
        </AncestorMotionProvider>
      </AncestorMotionProvider>,
    );

    expect(observedState?.active).toBe(false);
    expect(observedState?.parent?.active).toBe(true);
  });

  it('notifies subscribers when motion state changes', () => {
    const controller = createAncestorMotionController();
    const listener = jest.fn();
    controller.listeners.add(listener);

    const endMotion = controller.start();
    endMotion();
    endMotion();

    expect(listener).toHaveBeenCalledTimes(2);
    controller.listeners.delete(listener);
  });

  it('only lets the latest motion end the active state', () => {
    const controller = createAncestorMotionController();
    const endFirstMotion = controller.start();
    const endSecondMotion = controller.start();

    endFirstMotion();
    expect(controller.active).toBe(true);

    endSecondMotion();
    expect(controller.active).toBe(false);
  });
});
