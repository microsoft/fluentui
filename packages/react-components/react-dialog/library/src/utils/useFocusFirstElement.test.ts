import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useFocusFirstElement } from './useFocusFirstElement';

jest.mock('@fluentui/react-tabster');
jest.mock('@fluentui/react-shared-contexts');

const mockFindFirstFocusable = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useFocusFinders as jest.Mock).mockReturnValue({ findFirstFocusable: mockFindFirstFocusable });
  (useFluent_unstable as jest.Mock).mockReturnValue({ targetDocument: document });
});

describe('useFocusFirstElement', () => {
  it('focuses the first focusable element when dialog opens and no autofocus element is present', () => {
    const container = document.createElement('div');
    const firstButton = document.createElement('button');
    container.appendChild(firstButton);
    document.body.appendChild(container);

    mockFindFirstFocusable.mockReturnValue(firstButton);
    const focusSpy = jest.spyOn(firstButton, 'focus');

    const { result, rerender } = renderHook(({ open }) => useFocusFirstElement(open, 'modal'), {
      initialProps: { open: false },
    });

    // Attach the ref to the container
    (result.current as React.MutableRefObject<HTMLElement | null>).current = container;

    act(() => {
      rerender({ open: true });
    });

    expect(mockFindFirstFocusable).toHaveBeenCalledWith(container);
    expect(focusSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(container);
  });

  it('focuses the autofocus element instead of the first focusable element when autofocus element is present', () => {
    const container = document.createElement('div');
    const firstButton = document.createElement('button');
    const autoFocusInput = document.createElement('input');
    autoFocusInput.setAttribute('autofocus', '');

    container.appendChild(firstButton);
    container.appendChild(autoFocusInput);
    document.body.appendChild(container);

    mockFindFirstFocusable.mockReturnValue(firstButton);
    const firstButtonFocusSpy = jest.spyOn(firstButton, 'focus');
    const autoFocusInputFocusSpy = jest.spyOn(autoFocusInput, 'focus');

    const { result, rerender } = renderHook(({ open }) => useFocusFirstElement(open, 'modal'), {
      initialProps: { open: false },
    });

    // Attach the ref to the container
    (result.current as React.MutableRefObject<HTMLElement | null>).current = container;

    act(() => {
      rerender({ open: true });
    });

    // findFirstFocusable should not be called since autofocus element was found
    expect(mockFindFirstFocusable).not.toHaveBeenCalled();
    // The autofocus element should be focused, not the first button
    expect(autoFocusInputFocusSpy).toHaveBeenCalledTimes(1);
    expect(firstButtonFocusSpy).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });
});
