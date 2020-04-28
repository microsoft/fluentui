import * as React from 'react';
import {
  KeyCodes,
  divProperties,
  doesElementContainFocus,
  getDocument,
  getNativeProps,
  getWindow,
  elementContains,
} from '../../Utilities';
import { IPopupProps } from './Popup.types';
import { useMergedRefs, useAsync, useOnEvent } from '@uifabric/react-hooks';

function useScrollbarAsync(props: IPopupProps, root: React.RefObject<HTMLDivElement | undefined>) {
  const async = useAsync();
  const [needsVerticalScrollBarState, setNeedsVerticalScrollBar] = React.useState(false);
  React.useEffect(() => {
    async.requestAnimationFrame(() => {
      // If overflowY is overriden, don't waste time calculating whether the scrollbar is necessary.
      if (props.style && props.style.overflowY) {
        return;
      }

      let needsVerticalScrollBar = false;
      if (this._root && this._root.current && root.current?.firstElementChild) {
        // ClientHeight returns the client height of an element rounded to an
        // integer. On some browsers at different zoom levels this rounding
        // can generate different results for the root container and child even
        // though they are the same height. This causes us to show a scroll bar
        // when not needed. Ideally we would use BoundingClientRect().height
        // instead however seems that the API is 90% slower than using ClientHeight.
        // Therefore instead we will calculate the difference between heights and
        // allow for a 1px difference to still be considered ok and not show the
        // scroll bar.
        const rootHeight = root.current.clientHeight;
        const firstChildHeight = root.current.firstElementChild.clientHeight;
        if (rootHeight > 0 && firstChildHeight > rootHeight) {
          needsVerticalScrollBar = firstChildHeight - rootHeight > 1;
        }
      }
      if (needsVerticalScrollBarState !== needsVerticalScrollBar) {
        setNeedsVerticalScrollBar(needsVerticalScrollBar);
      }
    });

    return () => async.dispose();
  });

  return needsVerticalScrollBarState;
}

function useRestoreFocus(props: IPopupProps, root: React.RefObject<HTMLDivElement | undefined>) {
  const _originalFocusedElement = React.useRef<HTMLElement>();
  const _containsFocus = React.useRef(false);

  React.useLayoutEffect(() => {
    _originalFocusedElement.current = getDocument()!.activeElement as HTMLElement;

    return () => {
      if (
        props.shouldRestoreFocus &&
        _originalFocusedElement.current &&
        _containsFocus.current &&
        (_originalFocusedElement as any) !== window
      ) {
        _originalFocusedElement?.current?.focus?.();
      }

      // De-reference DOM Node to avoid retainment via transpiled closure of _onKeyDown
      _originalFocusedElement.current = undefined;
    };
  }, []);

  React.useEffect(() => {
    if (doesElementContainFocus(root.current!)) {
      _containsFocus.current = true;
    }
  }, []);

  useOnEvent(
    root,
    'focus',
    React.useCallback((): void => {
      _containsFocus.current = true;
    }, []),
    true,
  );

  useOnEvent(
    root,
    'blur',
    React.useCallback((ev: FocusEvent): void => {
      /** The popup should update this._containsFocus when:
       * relatedTarget exists AND
       * the relatedTarget is not contained within the popup.
       * If the relatedTarget is within the popup, that means the popup still has focus
       * and focused moved from one element to another within the popup.
       * If relatedTarget is undefined or null that usually means that a
       * keyboard event occured and focus didn't change
       */
      if (root.current && ev.relatedTarget && !root.current.contains(ev.relatedTarget as HTMLElement)) {
        _containsFocus.current = false;
      }
    }, []),
    true,
  );
}

/**
 * This adds accessibility to Dialog and Panel controls
 */
// tslint:disable-next-line:no-function-expression
export const Popup = React.forwardRef(function(props: IPopupProps, forwardedRef: React.Ref<HTMLDivElement>) {
  // Default props
  props = { shouldRestoreFocus: true, ...props };

  const _root = React.useRef<HTMLDivElement>();
  const _mergedRootRef = useMergedRefs(_root, forwardedRef) as React.Ref<HTMLDivElement>;

  useRestoreFocus(props, _root);

  const { role, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, style, children } = props;
  const needsVerticalScrollBar = useScrollbarAsync(props, _root);

  const _onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement> | KeyboardEvent): void => {
      switch (ev.which) {
        case KeyCodes.escape:
          if (props.onDismiss) {
            props.onDismiss(ev);

            ev.preventDefault();
            ev.stopPropagation();
          }

          break;
      }
    },
    [props.onDismiss],
  );

  useOnEvent(getWindow(_root.current), 'keydown', _onKeyDown as (ev: Event) => void);

  return (
    <div
      ref={_mergedRootRef}
      {...getNativeProps(props, divProperties)}
      className={className}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onKeyDown={_onKeyDown}
      style={{ overflowY: needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none', ...style }}
    >
      {children}
    </div>
  );
});
