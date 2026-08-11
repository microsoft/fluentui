/* eslint-disable @typescript-eslint/naming-convention */
import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import { createPositioningManager_unstable } from './createPositioningManager_unstable';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type { OnPositioningEndEventDetail, PositionManager } from './types';

jest.mock('./createPositionManager', () => ({
  createPositionManager: jest.fn(),
}));

jest.mock('./resolvePositioningOptions', () => ({
  resolvePositioningOptions: jest.fn(),
}));

const createPositionManagerMock = createPositionManager as jest.MockedFunction<typeof createPositionManager>;
const resolvePositioningOptionsMock = resolvePositioningOptions as jest.MockedFunction<
  typeof resolvePositioningOptions
>;

function createResolvedManager(): PositionManager {
  return {
    dispose: jest.fn(),
    updatePosition: jest.fn(),
  };
}

function createPositioningEndEvent(): CustomEvent<OnPositioningEndEventDetail> {
  return new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
    detail: {
      placement: 'bottom',
      escaped: false,
      referenceHidden: false,
    },
  });
}

describe('createPositioningManager_unstable', () => {
  let resolvedManager: PositionManager;

  beforeEach(() => {
    resolvedManager = createResolvedManager();

    createPositionManagerMock.mockReturnValue(resolvedManager);
    resolvePositioningOptionsMock.mockReturnValue({
      placement: 'bottom',
      middleware: [],
      strategy: 'absolute',
      disableUpdateOnResize: true,
      useTransform: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a manager from resolved options and wires positioning end callbacks', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    const arrow = document.createElement('div');
    const onPositioningEnd = jest.fn();

    const manager = createPositioningManager_unstable({
      arrow,
      container,
      dir: 'rtl',
      onPositioningEnd,
      position: 'above',
      positionFixed: true,
      target,
      targetDocument: document,
      unstable_disableShift: true,
      unstable_flipFallbackStrategy: 'initialPlacement',
    });

    expect(resolvePositioningOptionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        arrow,
        container,
        dir: 'rtl',
        position: 'above',
        positionFixed: true,
        targetDocument: document,
        unstable_disableShift: true,
        unstable_flipFallbackStrategy: 'initialPlacement',
      }),
    );
    expect(createPositionManagerMock).toHaveBeenCalledWith({
      arrow,
      container,
      disableUpdateOnResize: true,
      middleware: [],
      placement: 'bottom',
      strategy: 'absolute',
      target,
      useTransform: false,
    });

    manager.updatePosition();
    expect(resolvedManager.updatePosition).toHaveBeenCalledTimes(1);

    const event = createPositioningEndEvent();
    container.dispatchEvent(event);

    expect(onPositioningEnd).toHaveBeenCalledWith(event);
  });

  it('removes the positioning end callback listener on dispose', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    const onPositioningEnd = jest.fn();

    const manager = createPositioningManager_unstable({
      container,
      onPositioningEnd,
      target,
    });

    manager.dispose();
    container.dispatchEvent(createPositioningEndEvent());

    expect(onPositioningEnd).not.toHaveBeenCalled();
    expect(resolvedManager.dispose).toHaveBeenCalledTimes(1);
  });

  it('returns a no-op manager when disabled', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    const onPositioningEnd = jest.fn();

    const manager = createPositioningManager_unstable({
      container,
      enabled: false,
      onPositioningEnd,
      target,
    });

    expect(createPositionManagerMock).not.toHaveBeenCalled();
    expect(resolvePositioningOptionsMock).not.toHaveBeenCalled();
    expect(() => {
      manager.updatePosition();
      manager.dispose();
    }).not.toThrow();

    container.dispatchEvent(createPositioningEndEvent());
    expect(onPositioningEnd).not.toHaveBeenCalled();
  });
});
