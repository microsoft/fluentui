import { Accessibility, keyboardKey } from '@fluentui/accessibility';
import { render, renderHook, fireEvent } from '@testing-library/react';
import * as React from 'react';

import { useAccessibilityBehavior } from '../../src/hooks/useAccessibilityBehavior';
import { useAccessibilitySlotProps } from '../../src/hooks/useAccessibilitySlotProps';
import { wrapWithFocusZone } from '../../src/utils/wrapWithFocusZone';

type TestBehaviorProps = {
  disabled: boolean;
};

type ChildBehaviorProps = {
  pressed: boolean;
};

const testBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
    },
    img: {
      'aria-label': 'Pixel',
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
});

const conditionalBehavior: Accessibility<{ disabled: boolean }> = props => ({
  attributes: {
    root: {
      'aria-label': 'Noop behavior',
    },
  },
  keyActions: {
    root: {
      ...((!props.disabled && {
        click: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
        },
      }) as any),
    },
    img: {
      click: {
        keyCombinations: [props.disabled ? { keyCode: keyboardKey.ArrowDown } : { keyCode: keyboardKey.ArrowUp }],
      },
    },
  },
});

const childOverriddenBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'data-behavior': 'overridden',
      'aria-pressed': props.pressed,
      'aria-label': 'overridden',
    },
  },
});

const childBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'data-behavior': 'original',
      'aria-pressed': props.pressed,
    },
  },
});

const overriddenChildBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
    },
    img: {
      'aria-label': 'Pixel',
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
  childBehaviors: {
    child: childOverriddenBehavior,
  },
});

type TestComponentProps = {
  accessibility?: Accessibility<TestBehaviorProps>;
  disabled?: boolean;
  onClick?: (e: React.KeyboardEvent<HTMLDivElement>, slotName: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

type ChildComponentProps = {
  accessibility?: Accessibility<ChildBehaviorProps>;
  pressed?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { accessibility = testBehavior, disabled, onClick, onKeyDown, ...rest } = props;

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    behaviorProps: { disabled },
    actionHandlers: {
      click: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick) onClick(e, 'root');
      },
    },
    rtl: false,
  });

  return wrapWithFocusZone(
    a11yBehavior,
    <div data-testid="root" {...useAccessibilitySlotProps(a11yBehavior, 'root', { onKeyDown, ...rest })}>
      <img
        {...useAccessibilitySlotProps(a11yBehavior, 'img', {
          'data-testid': 'image',
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        })}
      />
      <ChildComponent {...useAccessibilitySlotProps(a11yBehavior, 'child', {})} />
    </div>,
  );
};

const ChildComponent: React.FunctionComponent<ChildComponentProps> = props => {
  const { accessibility = childBehavior, pressed, onKeyDown, ...rest } = props;
  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    behaviorProps: { pressed },
    rtl: false,
  });

  return <button data-testid="child" {...useAccessibilitySlotProps(a11yBehavior, 'root', { onKeyDown, ...rest })} />;
};

describe('useAccessibility', () => {
  it('sets attributes', () => {
    const { getByTestId } = render(<TestComponent />);

    const rootEl = getByTestId('root');
    const imageEl = getByTestId('image');
    const childEl = getByTestId('child');

    expect(rootEl.getAttribute('tabIndex')).toBe('1');
    expect(imageEl.getAttribute('role')).toBe('presentation');
    expect(childEl.getAttribute('data-behavior')).toBe('original');
  });

  it('attributes can be conditional', () => {
    const { getByTestId, rerender } = render(<TestComponent disabled />);
    const rootEl = getByTestId('root');

    expect(rootEl.getAttribute('aria-disabled')).toEqual('true');

    // ---

    rerender(<TestComponent disabled={false} />);

    expect(rootEl.getAttribute('aria-disabled')).toEqual('false');
  });

  it('attributes can be overridden', () => {
    const { getByTestId } = render(<TestComponent tabIndex={-1} />);
    const rootEl = getByTestId('root');

    expect(rootEl.getAttribute('tabIndex')).toBe('-1');
  });

  it('child behaviors can be overridden', () => {
    const { getByTestId } = render(<TestComponent accessibility={overriddenChildBehavior} />);
    const childEl = getByTestId('child');

    expect(childEl.getAttribute('data-behavior')).toBe('overridden');
  });

  describe('event listeners', () => {
    it('adds event handlers', () => {
      const onKeyDown = jest.fn();
      const onClick = jest.fn();

      const { getByTestId } = render(<TestComponent onClick={onClick} onKeyDown={onKeyDown} />);
      const rootEl = getByTestId('root');

      fireEvent.click(rootEl);
      fireEvent.keyDown(rootEl, { keyCode: keyboardKey.ArrowDown });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          keyCode: keyboardKey.ArrowDown,
        }),
      );

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          keyCode: keyboardKey.ArrowDown,
        }),
        'root',
      );
    });

    it("adds user's keydown handler", () => {
      const onKeyDown = jest.fn();
      const { getByTestId } = render(<TestComponent accessibility={conditionalBehavior} onKeyDown={onKeyDown} />);

      const rootEl = getByTestId('root');
      fireEvent.keyDown(rootEl, { keyCode: keyboardKey.ArrowDown });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('handles conditional key combinations', () => {
      const onClick = jest.fn();
      const { getByTestId, rerender } = render(<TestComponent accessibility={conditionalBehavior} onClick={onClick} />);

      const imageEl = getByTestId('image');
      fireEvent.keyDown(imageEl, { keyCode: keyboardKey.ArrowUp });

      expect(onClick).toHaveBeenCalledTimes(1);

      // ---

      rerender(<TestComponent accessibility={conditionalBehavior} onClick={onClick} disabled />);

      // Noop, will not call handler
      fireEvent.keyDown(imageEl, { keyCode: keyboardKey.ArrowUp });
      fireEvent.keyDown(imageEl, { keyCode: keyboardKey.ArrowDown });

      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('handlers are referentially stable', () => {
      const { result, rerender } = renderHook(() => {
        const actionHandlers = React.useMemo(
          () => ({
            click: () => {},
          }),
          [],
        );
        const a11yBehavior = useAccessibilityBehavior(testBehavior, {
          actionHandlers,
          rtl: false,
        });

        return useAccessibilitySlotProps(a11yBehavior, 'root', {});
      });

      const keyDownA = result.current.onKeyDown;
      expect(keyDownA).toBeInstanceOf(Function);

      // ---

      rerender();
      expect(Object.is(result.current.onKeyDown, keyDownA)).toBe(true);
    });
  });
});
