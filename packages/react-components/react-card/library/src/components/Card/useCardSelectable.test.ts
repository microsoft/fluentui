import type * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCardSelectable } from './useCardSelectable';

const makeA11yProps = () => ({ referenceId: undefined, referenceLabel: undefined });

// useCardSelectable — shouldRestrictTriggerAction is a new optional predicate
// on CardBaseProps; the checkbox target always bypasses it.

describe('useCardSelectable', () => {
  it('blocks selection when shouldRestrictTriggerAction returns true', () => {
    const onSelectionChange = jest.fn();
    const shouldRestrictTriggerAction = jest.fn().mockReturnValue(true);
    const { result } = renderHook(() =>
      useCardSelectable({ onSelectionChange, shouldRestrictTriggerAction }, makeA11yProps()),
    );

    const event = { target: document.createElement('span') } as unknown as React.MouseEvent<HTMLDivElement>;
    act(() => {
      result.current.selectableCardProps!.onClick(event);
    });

    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(shouldRestrictTriggerAction).toHaveBeenCalledWith(event);
  });

  it('allows selection when shouldRestrictTriggerAction returns false', () => {
    const onSelectionChange = jest.fn();
    const shouldRestrictTriggerAction = jest.fn().mockReturnValue(false);
    const { result } = renderHook(() =>
      useCardSelectable({ onSelectionChange, shouldRestrictTriggerAction }, makeA11yProps()),
    );

    const event = { target: document.createElement('span') } as unknown as React.MouseEvent<HTMLDivElement>;
    act(() => {
      result.current.selectableCardProps!.onClick(event);
    });

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
  });

  it('bypasses shouldRestrictTriggerAction when the checkbox itself is the event target', () => {
    const onSelectionChange = jest.fn();
    const shouldRestrictTriggerAction = jest.fn().mockReturnValue(true);
    const { result } = renderHook(() =>
      useCardSelectable({ onSelectionChange, shouldRestrictTriggerAction }, makeA11yProps()),
    );

    // slot.optional spreads defaultProps directly into the result object.
    const checkboxSlot = result.current.checkboxSlot! as unknown as {
      ref: React.RefObject<HTMLInputElement>;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
    };
    const checkboxEl = document.createElement('input');
    checkboxSlot.ref.current = checkboxEl;

    const changeEvent = { target: checkboxEl } as unknown as React.ChangeEvent<HTMLInputElement>;
    act(() => {
      checkboxSlot.onChange(changeEvent);
    });

    expect(shouldRestrictTriggerAction).not.toHaveBeenCalled();
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
  });
});
