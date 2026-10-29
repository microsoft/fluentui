import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning as useV9Positioning } from '@fluentui/react-positioning';
import type { AutoSize, PositioningImperativeRef } from '@fluentui/react-positioning';
import { Provider } from '../../components/Provider';
import { usePositioning } from './usePositioning';
import type { PositioningProps } from './types';
import { preservePositioningStyles } from './utils/preservePositioningStyles';

jest.mock('@fluentui/react-positioning', () => ({
  ...jest.requireActual('@fluentui/react-positioning'),
  usePositioning: jest.fn(),
}));

const mockPositioning = useV9Positioning as jest.MockedFunction<typeof useV9Positioning>;
const containerChanged = jest.fn();
const createCallbackRef = (onChange = jest.fn()) => {
  let current: HTMLElement | null = null;
  return {
    get current() {
      return current;
    },
    set current(node: HTMLElement | null) {
      if (node !== current) {
        current = node;
        onChange(node);
      }
    },
  };
};
const targetRef = createCallbackRef();
const containerRef = createCallbackRef(containerChanged);
const arrowRef = createCallbackRef();

const Fixture = (props: PositioningProps) => {
  const refs = usePositioning(props);
  return (
    <>
      <button ref={refs.targetRef}>Trigger</button>
      <div ref={refs.containerRef} data-testid="surface" style={{ maxHeight: '75px', overflowY: 'hidden' }} />
    </>
  );
};

describe('usePositioning autoSize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    containerChanged.mockReset();
    mockPositioning.mockReturnValue({ targetRef, containerRef, arrowRef });
  });

  it.each<AutoSize>([true, 'height', 'width', 'always', 'height-always', 'width-always'])(
    'delegates %s to v9 without enabling CSS anchors',
    autoSize => {
      const { getByRole, getByTestId } = render(<Fixture autoSize={autoSize} />);

      expect(mockPositioning).toHaveBeenLastCalledWith(
        expect.objectContaining({ autoSize, enabled: true, strategy: 'fixed', position: 'above', align: 'center' }),
      );
      expect(containerChanged).toHaveBeenCalledWith(getByTestId('surface'));
      expect(getByTestId('surface').style.getPropertyValue('inset')).toBe('auto');
      expect(getByTestId('surface').style.getPropertyValue('position-area')).toBe('');
      expect(getByRole('button').style.getPropertyValue('anchor-name')).toBe('');
    },
  );

  it.each([undefined, false])('keeps CSS anchors for %s', autoSize => {
    const { getByRole, getByTestId } = render(<Fixture autoSize={autoSize} />);

    expect(mockPositioning).toHaveBeenLastCalledWith(expect.objectContaining({ enabled: false }));
    expect(containerChanged).not.toHaveBeenCalledWith(getByTestId('surface'));
    expect(getByTestId('surface').style.getPropertyValue('position-area')).toBe('block-start');
    expect(getByRole('button').style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('restores caller sizing and clears Floating UI styles when disabled', () => {
    containerChanged.mockImplementation((node: HTMLElement | null) => {
      if (node) {
        node.style.maxHeight = '40px';
        node.style.height = '40px';
        node.style.overflowY = 'auto';
        node.style.transform = 'translate(10px, 20px)';
        node.setAttribute('data-popper-placement', 'bottom');
      }
    });
    const { getByTestId, rerender } = render(<Fixture autoSize="height" />);
    const surface = getByTestId('surface');
    expect(surface.style.maxHeight).toBe('40px');

    rerender(<Fixture autoSize={false} />);

    expect(surface.style.maxHeight).toBe('75px');
    expect(surface.style.height).toBe('');
    expect(surface.style.overflowY).toBe('hidden');
    expect(surface.style.transform).toBe('');
    expect(surface.hasAttribute('data-popper-placement')).toBe(false);
    expect(surface.style.getPropertyValue('position-area')).toBe('block-start');
  });

  it('clears the previous sizing axis when the mode changes', () => {
    let mode: PositioningProps['autoSize'];
    mockPositioning.mockImplementation(options => {
      mode = options.autoSize;
      return { targetRef, containerRef, arrowRef };
    });
    containerChanged.mockImplementation((node: HTMLElement | null) => {
      if (node) {
        if (mode === 'height') {
          node.style.height = '40px';
        } else {
          node.style.width = '60px';
        }
      }
    });
    const { getByTestId, rerender, unmount } = render(<Fixture autoSize="height" />);
    const surface = getByTestId('surface');
    expect(surface.style.height).toBe('40px');

    rerender(<Fixture autoSize="width" />);
    expect(surface.style.height).toBe('');
    expect(surface.style.width).toBe('60px');

    unmount();
    expect(surface.style.width).toBe('');
    expect(surface.style.maxHeight).toBe('75px');
  });

  it('keeps logical placement in sync with a canonical flip', () => {
    const { getByTestId } = render(<Fixture autoSize="height" position="below" align="start" />);
    const event = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top-end' as const, escaped: false, referenceHidden: false },
    });
    const options = mockPositioning.mock.calls[mockPositioning.mock.calls.length - 1][0];

    options.onPositioningEnd?.(event);

    expect(getByTestId('surface').getAttribute('data-placement')).toBe('above-end');
  });

  it('maps physical sides back to logical placement in RTL', () => {
    const { getByTestId } = render(
      <Provider dir="rtl">
        <Fixture autoSize="height" position="before" />
      </Provider>,
    );
    const event = new CustomEvent('fui-positioningend', {
      detail: { placement: 'right-start' as const, escaped: false, referenceHidden: false },
    });
    const options = mockPositioning.mock.calls[mockPositioning.mock.calls.length - 1][0];
    options.onPositioningEnd?.(event);
    expect(getByTestId('surface').getAttribute('data-placement')).toBe('before-top');
  });

  it('preserves an imperative target across positioning modes', () => {
    const positioningRef = React.createRef<PositioningImperativeRef>();
    const { getByRole, rerender } = render(<Fixture positioningRef={positioningRef} />);
    const target = getByRole('button');
    act(() => positioningRef.current?.setTarget(target));

    rerender(<Fixture positioningRef={positioningRef} autoSize="height" />);
    expect(mockPositioning).toHaveBeenLastCalledWith(expect.objectContaining({ target }));

    act(() => positioningRef.current?.setTarget(null));
    expect(mockPositioning).toHaveBeenLastCalledWith(expect.objectContaining({ target: null }));
  });

  it('restores shorthand styles and their priorities without losing unrelated styles', () => {
    const element = document.createElement('div');
    element.style.cssText = 'inset: 10px 20px; margin: 3px 4px; overflow: hidden !important; display: grid';
    const restore = preservePositioningStyles(element);
    element.style.inset = 'auto';
    element.style.margin = '0';
    element.style.overflowY = 'auto';
    element.style.maxHeight = '40px';
    element.style.display = 'flex';

    restore();

    expect(element.style.inset).toBe('10px 20px');
    expect(element.style.margin).toBe('3px 4px');
    expect(element.style.overflow).toBe('hidden');
    expect(element.style.getPropertyPriority('overflow')).toBe('important');
    expect(element.style.maxHeight).toBe('');
    expect(element.style.display).toBe('flex');
  });
});
