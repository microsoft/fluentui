import { createDashboardGridExternalSource } from './externalSources';
import type { DashboardGridInteractionCoordinator } from './types';

describe('dashboard grid external sources', () => {
  it('supports keyboard activation without stealing descendant controls', () => {
    const source = document.createElement('div');
    const button = document.createElement('button');
    source.appendChild(button);
    const coordinator = {
      registerDragSource: () => () => undefined,
    } as unknown as DashboardGridInteractionCoordinator;
    const onKeyboardActivate = jest.fn();
    const controller = createDashboardGridExternalSource({
      targetDocument: document,
      coordinator,
      registration: {
        id: 'source',
        element: source,
        descriptor: { id: 'new-item' },
      },
      onKeyboardActivate,
    });
    source.addEventListener('keydown', controller.onKeyDown);

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(onKeyboardActivate).not.toHaveBeenCalled();

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    source.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(onKeyboardActivate).toHaveBeenCalledTimes(1);

    controller.destroy();
  });
});
