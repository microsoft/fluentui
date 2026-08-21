import * as React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import type {
  DashboardGridInteractionCoordinator,
  DashboardGridDragSourceRegistration,
} from '../../interaction/types';
import type { DashboardGridRegistry } from '../../provider/DashboardGridRegistry.types';
import { useDashboardGridDragSource } from '../../hooks/useDashboardGridDragSource';

const mockPointerDown = jest.fn();
const mockKeyDown = jest.fn();
const mockDestroy = jest.fn();
const mockCreateDashboardGridExternalSource = jest.fn((_options: unknown) => ({
  onPointerDown: mockPointerDown,
  onKeyDown: mockKeyDown,
  cancel: jest.fn(),
  destroy: mockDestroy,
}));

jest.mock('../../interaction/externalSources', () => ({
  createDashboardGridExternalSource: (options: unknown) => mockCreateDashboardGridExternalSource(options),
}));

describe('useDashboardGridDragSource', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers source and preview elements and delegates native interaction events', async () => {
    const coordinator = {} as DashboardGridInteractionCoordinator;
    const onKeyboardActivate = jest.fn(
      (_registration: DashboardGridDragSourceRegistration, _event: KeyboardEvent) => undefined,
    );
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardGridProviderContextProvider
        value={{
          coordinator,
          registry: {} as DashboardGridRegistry,
          targetDocument: document,
        }}
      >
        {children}
      </DashboardGridProviderContextProvider>
    );
    const { result, unmount } = renderHook(
      () =>
        useDashboardGridDragSource<HTMLDivElement>({
          id: 'source',
          descriptor: { id: 'new-item', columnSpan: 2 },
          label: 'Add item',
          onKeyboardActivate,
        }),
      { wrapper },
    );
    const sourceElement = document.createElement('div');
    const previewElement = document.createElement('div');

    act(() => {
      result.current.sourceRef(sourceElement);
      result.current.previewRef(previewElement);
    });

    await waitFor(() => expect(mockCreateDashboardGridExternalSource).toHaveBeenCalledTimes(1));
    expect(mockCreateDashboardGridExternalSource).toHaveBeenCalledWith({
      targetDocument: document,
      coordinator,
      registration: {
        id: 'source',
        descriptor: { id: 'new-item', columnSpan: 2 },
        disabled: undefined,
        label: 'Add item',
        element: sourceElement,
        previewElement,
      },
      onKeyboardActivate,
    });

    const pointerEvent = new MouseEvent('pointerdown') as PointerEvent;
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    act(() => {
      result.current.onPointerDown({ nativeEvent: pointerEvent } as unknown as React.PointerEvent<HTMLDivElement>);
      result.current.onKeyDown({ nativeEvent: keyboardEvent } as unknown as React.KeyboardEvent<HTMLDivElement>);
    });
    expect(mockPointerDown).toHaveBeenCalledWith(pointerEvent);
    expect(mockKeyDown).toHaveBeenCalledWith(keyboardEvent);

    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});
