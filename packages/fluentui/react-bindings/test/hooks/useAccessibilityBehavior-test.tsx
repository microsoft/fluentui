import { Accessibility, keyboardKey } from '@fluentui/accessibility';
import { renderHook } from '@testing-library/react';
import * as React from 'react';

import { useAccessibilityBehavior } from '../../src/hooks/useAccessibilityBehavior';

type TestBehaviorProps = {
  disabled: boolean;
};

const testBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
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

describe('useAccessibilityBehavior', () => {
  it('sets attributes', () => {
    const onClick = jest.fn();

    const { result } = renderHook(() =>
      useAccessibilityBehavior(testBehavior, {
        behaviorProps: { disabled: true },
        actionHandlers: {
          click: ev => {
            onClick(ev);
          },
        },
        rtl: false,
      }),
    );

    expect(result.current.attributes).toEqual({
      root: {
        'aria-disabled': true,
        tabIndex: 1,
      },
    });
    expect(result.current.childBehaviors).toBeUndefined();
    expect(result.current.focusZone).toBeUndefined();
    expect(result.current.keyHandlers).toEqual({
      root: {
        onKeyDown: expect.any(Function),
      },
    });

    // Calls on `onClick`
    result.current.keyHandlers.root?.onKeyDown?.({ keyCode: keyboardKey.ArrowDown } as unknown as React.KeyboardEvent);
    // Does nothing
    result.current.keyHandlers.root?.onKeyDown?.({ keyCode: keyboardKey.ArrowUp } as unknown as React.KeyboardEvent);

    expect(onClick).toHaveBeenCalledWith({ keyCode: keyboardKey.ArrowDown });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
