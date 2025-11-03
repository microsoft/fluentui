import { type Accessibility, keyboardKey } from '@fluentui/accessibility';
import { fireEvent, render, renderHook } from '@testing-library/react';
import * as React from 'react';

import { useAccessibility } from '../../src/hooks/useAccessibility';
import { FocusZone } from '../../src/FocusZone/FocusZone';

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
      ...(!props.disabled && {
        click: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
        },
      }),
    },
    img: {
      click: {
        keyCombinations: [props.disabled ? { keyCode: keyboardKey.ArrowDown } : { keyCode: keyboardKey.ArrowUp }],
      },
    },
  },
});

const focusZoneBehavior: Accessibility<never> = () => ({
  focusZone: {
    props: {
      disabled: true,
      shouldFocusOnMount: true,
    },
  },
});

const childOverriddenBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-pressed': props.pressed,
      'aria-label': 'overridden-child-behavior',
    },
  },
});

const childBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-label': 'default-child-behavior',
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
  const getA11Props = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      disabled,
    }),
    actionHandlers: {
      click: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick) onClick(e, 'root');
      },
    },
  });

  return getA11Props.unstable_wrapWithFocusZone(
    <div data-testid="root" {...getA11Props('root', { onKeyDown, ...rest })}>
      <img
        {...getA11Props('img', {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        })}
        data-testid="image"
      />
      <ChildComponent {...getA11Props('child', {})} />
    </div>,
  );
};

const ChildComponent: React.FunctionComponent<ChildComponentProps> = props => {
  const { accessibility = childBehavior, pressed, onKeyDown, ...rest } = props;
  const getA11Props = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      pressed,
    }),
  });

  return <button data-testid="child" {...getA11Props('root', { onKeyDown, ...rest })} />;
};

describe('useAccessibility', () => {
  it('sets attributes', () => {
    const { getByTestId } = render(<TestComponent />);

    const rootEl = getByTestId('root');
    const imgEl = getByTestId('image');
    const childEl = getByTestId('child');

    expect(rootEl.getAttribute('tabindex')).toBe('1');
    expect(imgEl.getAttribute('role')).toBe('presentation');
    expect(childEl.getAttribute('aria-label')).toBe('default-child-behavior');
  });

  it('attributes can be conditional', () => {
    const { getByTestId, rerender } = render(<TestComponent disabled />);
    const rootEl = getByTestId('root');

    expect(rootEl.getAttribute('aria-disabled')).toBe('true');

    // ---

    rerender(<TestComponent disabled={false} />);
    expect(rootEl.getAttribute('aria-disabled')).toBe('false');
  });

  it('attributes can be overridden', () => {
    const { getByTestId } = render(<TestComponent tabIndex={-1} />);
    const rootEl = getByTestId('root');

    expect(rootEl.getAttribute('tabindex')).toBe('-1');
  });

  it('child behaviors can be overridden', () => {
    const { getByTestId } = render(<TestComponent accessibility={overriddenChildBehavior} />);
    const childEl = getByTestId('child');

    expect(childEl.getAttribute('aria-label')).toBe('overridden-child-behavior');
  });

  it('it should return current definition from unstable_behaviorDefinition', () => {
    const { result } = renderHook(() =>
      useAccessibility(testBehavior, {
        mapPropsToBehavior: () => ({
          disabled: false,
        }),
      }),
    );

    const definition = result.current.unstable_behaviorDefinition();

    expect(definition).toBeDefined();
    expect(definition.attributes.root['aria-disabled']).toBe(false);
    expect(definition.attributes.root['tabIndex']).toBe(1);
  });

  describe('events', () => {
    it('adds event handlers', () => {
      const onKeyDown = jest.fn();
      const onClick = jest.fn();

      const { getByTestId } = render(<TestComponent onClick={onClick} onKeyDown={onKeyDown} />);
      const rootEl = getByTestId('root');

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

    it('do not add any handlers by default', () => {
      const { result } = renderHook(() =>
        useAccessibility(conditionalBehavior, {
          mapPropsToBehavior: () => ({ disabled: true }),
          actionHandlers: {
            click: () => {},
          },
        }),
      );

      expect(result.current('root', {}).onKeyDown).toBeUndefined();
    });

    it('handles conditional adding of handlers', () => {
      const { result, rerender } = renderHook(
        (props: { disabled: boolean }) =>
          useAccessibility(conditionalBehavior, {
            mapPropsToBehavior: () => ({ disabled: props.disabled }),
            actionHandlers: {
              click: () => {},
            },
          }),
        { initialProps: { disabled: true } },
      );

      expect(result.current('root', {}).onKeyDown).toBeUndefined();

      // ---

      rerender({ disabled: false });
      expect(result.current('root', {}).onKeyDown).toBeDefined();

      // ---

      rerender({ disabled: true });
      expect(result.current('root', {}).onKeyDown).toBeUndefined();
    });

    it('handles conditional key combinations', () => {
      const onClick = jest.fn();

      const { getByTestId, rerender } = render(<TestComponent accessibility={conditionalBehavior} onClick={onClick} />);
      const imgEl = getByTestId('image');

      fireEvent.keyDown(imgEl, { keyCode: keyboardKey.ArrowUp });
      expect(onClick).toHaveBeenCalledTimes(1);

      // ---

      rerender(<TestComponent accessibility={conditionalBehavior} onClick={onClick} disabled />);

      // Noop, will not call handler
      fireEvent.keyDown(imgEl, { keyCode: keyboardKey.ArrowUp });
      fireEvent.keyDown(imgEl, { keyCode: keyboardKey.ArrowDown });

      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('handlers are referentially stable', () => {
      const { result, rerender } = renderHook(() =>
        useAccessibility(testBehavior, {
          mapPropsToBehavior: () => ({ disabled: false }),
        }),
      );

      const handlerA = result.current('root', {}).onKeyDown;

      // ---

      rerender();
      const handlerB = result.current('root', {}).onKeyDown;

      expect(Object.is(handlerA, handlerB)).toBe(true);
    });

    it('callbacks are referentially stable', () => {
      const prevOnKeyDown = jest.fn();
      const nextOnKeyDown = jest.fn();

      const { getByTestId, rerender } = render(<TestComponent onKeyDown={prevOnKeyDown} />);
      const rootEl = getByTestId('root');

      fireEvent.keyDown(rootEl);

      // ---

      rerender(<TestComponent onKeyDown={nextOnKeyDown} />);
      fireEvent.keyDown(rootEl);

      // ---

      rerender(<TestComponent />);
      fireEvent.keyDown(rootEl);

      expect(prevOnKeyDown).toHaveBeenCalledTimes(1);
      expect(nextOnKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('FocusZone', () => {
    it('do not render FocusZone without the definition in a behavior', () => {
      const { result } = renderHook(() => {
        const getA11Props = useAccessibility(testBehavior);

        return getA11Props.unstable_wrapWithFocusZone(<div />);
      });

      expect(result.current.type).toBe('div');
    });

    it('renders FocusZone with the definition in a behavior', () => {
      const { result } = renderHook(() => {
        const getA11Props = useAccessibility(focusZoneBehavior);

        return getA11Props.unstable_wrapWithFocusZone(<div />);
      });

      expect(result.current.type).toBe(FocusZone);
    });

    it('applies props from the behavior to a FocusZone component', () => {
      const { result } = renderHook(() => {
        const getA11Props = useAccessibility(focusZoneBehavior);

        return getA11Props.unstable_wrapWithFocusZone(<div />);
      });

      expect(result.current.props).toEqual(
        expect.objectContaining({
          disabled: true,
          shouldFocusOnMount: true,
        }),
      );
    });

    it('applies default props for FocusZone', () => {
      const { result } = renderHook(() => {
        const getA11Props = useAccessibility(focusZoneBehavior);

        return getA11Props.unstable_wrapWithFocusZone(<div />);
      });

      expect(result.current.props).toEqual(
        expect.objectContaining({
          preventFocusRestoration: true,
          shouldRaiseClicks: false,
        }),
      );
    });

    it('passes "rtl" value', () => {
      const { result, rerender } = renderHook(
        (props: { rtl: boolean }) => {
          const getA11Props = useAccessibility(focusZoneBehavior, { rtl: props.rtl });

          return getA11Props.unstable_wrapWithFocusZone(<div />);
        },
        { initialProps: { rtl: true } },
      );

      expect(result.current.props).toEqual(
        expect.objectContaining({
          isRtl: true,
        }),
      );

      // ---

      rerender({ rtl: false });
      expect(result.current.props).toEqual(
        expect.objectContaining({
          isRtl: false,
        }),
      );
    });
  });
});
