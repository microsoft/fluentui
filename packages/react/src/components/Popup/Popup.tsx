import * as React from 'react';
import {
  KeyCodes,
  divProperties,
  doesElementContainFocus,
  getDocument,
  getNativeProps,
  getPropsWithDefaults,
  getWindow,
  modalize,
} from '../../Utilities';
import { useMergedRefs, useAsync, useOnEvent } from '@fluentui/react-hooks';
import { useWindow } from '@fluentui/react-window-provider';
import type { IPopupProps, IPopupRestoreFocusParams } from './Popup.types';

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

function defaultFocusRestorer(options: IPopupRestoreFocusParams) {
  const { originalElement, containsFocus } = options;

  if (originalElement && containsFocus && originalElement !== getWindow()) {
    // Make sure that the focus method actually exists
    // In some cases the object might exist but not be a real element.
    // This is primarily for IE 11 and should be removed once IE 11 is no longer in use.
    // This is wrapped in a setTimeout because of a React 16 bug that is resolved in 17.
    // Once we move to 17, the setTimeout should be removed (ref: https://github.com/facebook/react/issues/17894#issuecomment-656094405)
    setTimeout(() => {
      originalElement.focus?.();
    }, 0);
  }
}

function useRestoreFocus(props: IPopupProps, root: React.RefObject<HTMLDivElement | undefined>) {
  const { onRestoreFocus = defaultFocusRestorer } = props;
  const originalFocusedElement = React.useRef<HTMLElement>();
  const containsFocus = React.useRef(false);

  React.useEffect(() => {
    originalFocusedElement.current = getDocument()!.activeElement as HTMLElement;

    if (doesElementContainFocus(root.current!)) {
      containsFocus.current = true;
    }

    return () => {
      onRestoreFocus?.({
        originalElement: originalFocusedElement.current,
        containsFocus: containsFocus.current,
        documentContainsFocus: getDocument()?.hasFocus() || false,
      });

      // De-reference DOM Node to avoid retainment via transpiled closure of _onKeyDown
      originalFocusedElement.current = undefined;
    };

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

function useHideSiblingNodes(props: IPopupProps, root: React.RefObject<HTMLDivElement | undefined>) {
  // eslint-disable-next-line deprecation/deprecation
  const shouldHideSiblings = String(props['aria-modal']).toLowerCase() === 'true' && props.enableAriaHiddenSiblings;

  React.useEffect(() => {
    if (!(shouldHideSiblings && root.current)) {
      return;
    }

    const unmodalize = modalize(root.current);
    return unmodalize;
  }, [root, shouldHideSiblings]);
}

/**
 * This adds accessibility to Dialog and Panel controls
 */
export const Popup: React.FunctionComponent<IPopupProps> = React.forwardRef<HTMLDivElement, IPopupProps>(
  (propsWithoutDefaults, forwardedRef) => {
    const props = getPropsWithDefaults(
      { shouldRestoreFocus: true, enableAriaHiddenSiblings: true },
      propsWithoutDefaults,
    );

    const root = React.useRef<HTMLDivElement>();
    const mergedRootRef = useMergedRefs(root, forwardedRef) as React.Ref<HTMLDivElement>;

    useHideSiblingNodes(props, root);
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

    const win = useWindow();
    useOnEvent(win, 'keydown', onKeyDown as (ev: Event) => void);

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
Popup.displayName = 'Popup';
