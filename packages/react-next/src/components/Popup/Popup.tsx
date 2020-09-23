import * as React from 'react';
import {
  KeyCodes,
  divProperties,
  doesElementContainFocus,
  getDocument,
  getNativeProps,
  getWindow,
} from '../../Utilities';
import { IPopupProps } from './Popup.types';
import { useMergedRefs, useAsync, useOnEvent } from '@uifabric/react-hooks';

function useScrollbarAsync(props: IPopupProps, root: React.RefObject<HTMLDivElement | undefined>) {
  const async = useAsync();
  const [needsVerticalScrollBarState, setNeedsVerticalScrollBar] = React.useState(false);
  React.useEffect(() => {
    async.requestAnimationFrame(() => {
      // If overflowY is overridden, don't waste time calculating whether the scrollbar is necessary.
      if (props.style && props.style.overflowY) {
        return;
      }

      let needsVerticalScrollBar = false;
      if (root && root.current && root.current?.firstElementChild) {
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
  const originalFocusedElement = React.useRef<HTMLElement>();
  const containsFocus = React.useRef(false);

  React.useLayoutEffect(() => {
    originalFocusedElement.current = getDocument()!.activeElement as HTMLElement;

    return () => {
      props.onRestoreFocus?.({
        originalElement: originalFocusedElement.current,
        containsFocus: containsFocus.current,
      });

      // De-reference DOM Node to avoid retainment via transpiled closure of _onKeyDown
      originalFocusedElement.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
  }, []);

  React.useEffect(() => {
    if (doesElementContainFocus(root.current!)) {
      containsFocus.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
  }, []);

  useOnEvent(
    root,
    'focus',
    React.useCallback((): void => {
      containsFocus.current = true;
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
       * keyboard event occurred and focus didn't change
       */
      if (root.current && ev.relatedTarget && !root.current.contains(ev.relatedTarget as HTMLElement)) {
        containsFocus.current = false;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
    }, []),
    true,
  );
}

/**
 * This adds accessibility to Dialog and Panel controls
 */
export const Popup: React.FunctionComponent<IPopupProps> = React.forwardRef<HTMLDivElement, IPopupProps>(
  (props, forwardedRef) => {
    // Default props
    // eslint-disable-next-line deprecation/deprecation
    props = { shouldRestoreFocus: true, ...props };

    const root = React.useRef<HTMLDivElement>();
    const mergedRootRef = useMergedRefs(root, forwardedRef) as React.Ref<HTMLDivElement>;

    useRestoreFocus(props, root);

    const { role, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, style, children, onDismiss } = props;
    const needsVerticalScrollBar = useScrollbarAsync(props, root);

    const onKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement> | KeyboardEvent): void => {
        // eslint-disable-next-line deprecation/deprecation
        switch (ev.which) {
          case KeyCodes.escape:
            if (onDismiss) {
              onDismiss(ev);

              ev.preventDefault();
              ev.stopPropagation();
            }

            break;
        }
      },
      [onDismiss],
    );

    useOnEvent(getWindow(root.current), 'keydown', onKeyDown as (ev: Event) => void);

    return (
      <div
        ref={mergedRootRef}
        {...getNativeProps(props, divProperties)}
        className={className}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onKeyDown={onKeyDown}
        style={{ overflowY: needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none', ...style }}
      >
        {children}
      </div>
    );
  },
);
