import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react-hooks';
import * as keyboardDetectorModule from '../focus-navigation/keyboardDetector';

import { useKeyborgRef } from './useKeyborgRef';

jest.mock('../focus-navigation/keyboardDetector', () => ({
  createKeyboardDetector: jest.fn(),
  disposeKeyboardDetector: jest.fn(),
}));

jest.mock('@fluentui/react-shared-contexts', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useFluent_unstable: jest.fn(),
}));

const createKeyboardDetectorMock = keyboardDetectorModule.createKeyboardDetector as jest.Mock;
const disposeKeyboardDetectorMock = keyboardDetectorModule.disposeKeyboardDetector as jest.Mock;
const useFluentMock = useFluent_unstable as jest.Mock;

describe('useKeyborgRef', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createKeyboardDetector() if a window is available', () => {
    const mockDetector = { foo: 'bar' };

    useFluentMock.mockReturnValueOnce({ targetDocument: document });
    createKeyboardDetectorMock.mockReturnValueOnce(mockDetector);

    const { result } = renderHook(() => useKeyborgRef());

    expect(createKeyboardDetectorMock).toHaveBeenCalledWith(window);
    expect(result.current.current).toBe(mockDetector);
  });

  it('should not call createKeyboardDetector() if targetDocument is not available', () => {
    useFluentMock.mockReturnValueOnce({ targetDocument: null });

    const { result } = renderHook(() => useKeyborgRef());

    expect(createKeyboardDetectorMock).not.toHaveBeenCalled();
    expect(result.current.current).toBeNull();
  });

  it('should not call createKeyboardDetector() if targetWindow is not available', () => {
    useFluentMock.mockReturnValueOnce({ targetDocument: { defaultView: null } });

    const { result } = renderHook(() => useKeyborgRef());

    expect(createKeyboardDetectorMock).not.toHaveBeenCalled();
    expect(result.current.current).toBeNull();
  });

  it('should dispose the detector on unmount', () => {
    const mockDetector = { foo: 'bar' };

    useFluentMock.mockReturnValueOnce({ targetDocument: document });
    createKeyboardDetectorMock.mockReturnValueOnce(mockDetector);

    const { unmount } = renderHook(() => useKeyborgRef());

    unmount();
    expect(disposeKeyboardDetectorMock).toHaveBeenCalledWith(mockDetector);
  });

  it('should recreate the detector when targetDocument changes', () => {
    const mockDocumentA = { defaultView: { devicePixelRatio: 1 } as Window } as Document;
    const mockDocumentB = { defaultView: { devicePixelRatio: 0.5 } as Window } as Document;

    useFluentMock.mockReturnValueOnce({ targetDocument: mockDocumentA });

    const { rerender } = renderHook(() => useKeyborgRef());

    expect(createKeyboardDetectorMock).toHaveBeenCalledWith(mockDocumentA.defaultView);
    expect(disposeKeyboardDetectorMock).not.toHaveBeenCalled();

    jest.clearAllMocks();

    useFluentMock.mockReturnValueOnce({ targetDocument: mockDocumentB });
    rerender({});

    expect(disposeKeyboardDetectorMock).toHaveBeenCalled();
    expect(createKeyboardDetectorMock).toHaveBeenCalledTimes(1);
    expect(createKeyboardDetectorMock).toHaveBeenCalledWith(mockDocumentB.defaultView);
  });
});
