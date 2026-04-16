import * as React from 'react';
import { Popover } from './Popover';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePopover_unstable } from './usePopover';
import { isConformant } from '../../testing/isConformant';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <div>hello</div> },
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // Popover does not have own styles
      'make-styles-overrides-win',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('Should not render arrow if `coverTarget` is set to true', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ withArrow: true, positioning: { coverTarget: true }, children: <div /> }),
    );

    // Assert
    expect(result.current.withArrow).toBe(false);
  });

  describe('close on focus outside', () => {
    it('should close when trapFocus is enabled and focus moves outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(outsideButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(
        ({ open }) =>
          usePopover_unstable({
            open,
            trapFocus: true,
            onOpenChange,
            children: <div />,
          }),
        { initialProps: { open: true } },
      );

      // Set the contentRef to simulate mounted popover content
      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), { open: false });

      document.body.removeChild(outsideButton);
      document.body.removeChild(popoverContent);
    });

    it('should not close when trapFocus is not enabled and focus moves outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      document.body.appendChild(outsideButton);

      renderHook(() =>
        usePopover_unstable({
          open: true,
          trapFocus: false,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(outsideButton);
    });

    it('should not close when popover is not open', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      document.body.appendChild(outsideButton);

      renderHook(() =>
        usePopover_unstable({
          open: false,
          trapFocus: true,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(outsideButton);
    });

    it('should also close when inertTrapFocus is enabled and focus moves to a page element outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(outsideButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(() =>
        usePopover_unstable({
          open: true,
          trapFocus: true,
          inertTrapFocus: true,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), { open: false });

      document.body.removeChild(outsideButton);
      document.body.removeChild(popoverContent);
    });
  });
});
