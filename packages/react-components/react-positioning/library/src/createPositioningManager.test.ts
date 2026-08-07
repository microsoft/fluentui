import { createPositionManager } from './createPositionManager';
import { createPositioningManager_unstable } from './createPositioningManager';
import { POSITIONING_END_EVENT } from './constants';
import { resolvePositioningOptions } from './resolvePositioningOptions';

jest.mock('./createPositionManager', () => ({
  createPositionManager: jest.fn(),
}));

jest.mock('./resolvePositioningOptions', () => ({
  resolvePositioningOptions: jest.fn(() => ({
    placement: 'bottom',
    middleware: [],
    strategy: 'absolute',
  })),
}));

const createPositionManagerMock = createPositionManager as jest.MockedFunction<typeof createPositionManager>;
const resolvePositioningOptionsMock = resolvePositioningOptions as jest.MockedFunction<typeof resolvePositioningOptions>;

describe('createPositioningManager_unstable', () => {
  beforeEach(() => {
    createPositionManagerMock.mockReset();
    resolvePositioningOptionsMock.mockClear();
  });

  it('creates a positioning manager from the shared resolver output', () => {
    const updatePosition = jest.fn();
    const dispose = jest.fn();
    const container = document.createElement('div');
    const target = document.createElement('button');
    const arrow = document.createElement('div');

    createPositionManagerMock.mockReturnValue({ updatePosition, dispose });

    const manager = createPositioningManager_unstable({
      container,
      target,
      arrow,
      dir: 'rtl',
      targetDocument: document,
      align: 'top',
      position: 'after',
      unstable_disableShift: true,
      unstable_flipFallbackStrategy: 'initialPlacement',
    });

    expect(resolvePositioningOptionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        align: 'top',
        arrow,
        container,
        isRtl: true,
        position: 'after',
        targetDocument: document,
        unstable_disableShift: true,
        unstable_flipFallbackStrategy: 'initialPlacement',
      }),
    );
    expect(createPositionManagerMock).toHaveBeenCalledWith({
      arrow,
      container,
      target,
      middleware: [],
      placement: 'bottom',
      strategy: 'absolute',
    });

    manager.updatePosition();
    expect(updatePosition).toHaveBeenCalledTimes(1);

    manager.dispose();
    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it('calls onPositioningEnd through the manager event path and removes the listener on dispose', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    const onPositioningEnd = jest.fn();
    const dispose = jest.fn();

    createPositionManagerMock.mockImplementation(({ container: currentContainer }) => ({
      updatePosition: () => {
        currentContainer.dispatchEvent(
          new CustomEvent(POSITIONING_END_EVENT, {
            detail: { placement: 'bottom', escaped: false, referenceHidden: false },
          }),
        );
      },
      dispose,
    }));

    const manager = createPositioningManager_unstable({
      container,
      target,
      onPositioningEnd,
    });

    manager.updatePosition();
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);

    manager.dispose();
    manager.updatePosition();

    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it('returns a noop manager when disabled', () => {
    const manager = createPositioningManager_unstable({
      container: document.createElement('div'),
      target: document.createElement('button'),
      enabled: false,
    });

    manager.updatePosition();
    manager.dispose();

    expect(resolvePositioningOptionsMock).not.toHaveBeenCalled();
    expect(createPositionManagerMock).not.toHaveBeenCalled();
  });
});
