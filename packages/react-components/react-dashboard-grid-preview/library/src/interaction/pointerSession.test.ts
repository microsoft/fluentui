import {
  createDashboardGridClickSuppressor,
  createDashboardGridTouchLeaveController,
  DASHBOARD_GRID_TOUCH_LEAVE_DELAY,
  getDashboardGridManhattanDistance,
  normalizeDashboardGridPointerType,
  releaseDashboardGridPointerCapture,
  updateDashboardGridPointerCapture,
} from './pointerSession';

const pointerEvent = (type: string, pointerType: string): PointerEvent => {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    pointerId: { value: 1 },
    pointerType: { value: pointerType },
    isPrimary: { value: true },
  });
  return event as PointerEvent;
};

describe('dashboard grid pointer session utilities', () => {
  it('normalizes pointer types and computes Manhattan distance', () => {
    expect(normalizeDashboardGridPointerType('mouse')).toBe('mouse');
    expect(normalizeDashboardGridPointerType('vendor-pointer')).toBe('unknown');
    expect(
      getDashboardGridManhattanDistance(
        { clientX: 2, clientY: 3 },
        { clientX: 8, clientY: 10 },
      ),
    ).toBe(13);
  });

  it('delays touch leave by exactly ten milliseconds and cancels it on re-entry', () => {
    jest.useFakeTimers();
    const onTargetChange = jest.fn();
    const controller = createDashboardGridTouchLeaveController({
      targetDocument: document,
      onTargetChange,
    });
    const event = pointerEvent('pointerout', 'touch');

    controller.onPointerOut(event, 1, 'touch');
    jest.advanceTimersByTime(DASHBOARD_GRID_TOUCH_LEAVE_DELAY - 1);
    expect(onTargetChange).not.toHaveBeenCalled();
    controller.onPointerOver(pointerEvent('pointerover', 'touch'), 1, 'touch');
    jest.advanceTimersByTime(1);
    expect(onTargetChange).toHaveBeenCalledWith(true);
    expect(onTargetChange).not.toHaveBeenCalledWith(false);

    controller.onPointerOut(event, 1, 'touch');
    jest.advanceTimersByTime(DASHBOARD_GRID_TOUCH_LEAVE_DELAY);
    expect(onTargetChange).toHaveBeenLastCalledWith(false);
    jest.useRealTimers();
  });

  it('suppresses exactly the next click', () => {
    jest.useFakeTimers();
    const suppressor = createDashboardGridClickSuppressor(document);
    const target = document.createElement('button');
    const onClick = jest.fn();
    target.addEventListener('click', onClick);
    document.body.appendChild(target);

    suppressor.suppressNext();
    const suppressedClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    target.dispatchEvent(suppressedClick);
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(suppressedClick.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(1);
    suppressor.dispose();
    jest.useRealTimers();
  });

  it('uses mouse capture and releases implicit touch capture safely', () => {
    const element = document.createElement('div');
    const setPointerCapture = jest.fn();
    const releasePointerCapture = jest.fn();
    const hasPointerCapture = jest.fn(() => true);
    Object.assign(element, { setPointerCapture, releasePointerCapture, hasPointerCapture });

    updateDashboardGridPointerCapture(element, pointerEvent('pointerdown', 'mouse'));
    expect(setPointerCapture).toHaveBeenCalledWith(1);

    updateDashboardGridPointerCapture(element, pointerEvent('pointerdown', 'touch'));
    expect(releasePointerCapture).toHaveBeenCalledWith(1);

    releaseDashboardGridPointerCapture(element, 1);
    expect(releasePointerCapture).toHaveBeenCalledTimes(2);
  });
});
