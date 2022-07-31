import { createKeyborg } from 'keyborg';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg/dist/Keyborg';
import { disposeKeyborg } from 'keyborg';
import type { RefObject } from 'react';
import { FOCUS_WITHIN_CLASS } from '../focus/constants';

export function useFocusWithin<E extends HTMLElement>() {
  const { targetDocument } = useFluent();
  const ref = React.useRef<E>(null);

  React.useEffect(() => {
    if (targetDocument?.defaultView && ref.current) {
      const keyborg = createKeyborg(targetDocument.defaultView);
      setClass(ref, FOCUS_WITHIN_CLASS, keyborg.isNavigatingWithKeyboard());
      const cb: KeyborgCallback = next => {
        setClass(ref, FOCUS_WITHIN_CLASS, next);
      };
      keyborg.subscribe(cb);
      return () => disposeKeyborg(keyborg);
    }
  }, [targetDocument, ref]);

  return ref;
}

function setClass(elementRef: RefObject<HTMLElement>, className: string, value: boolean) {
  if (!elementRef.current) {
    return;
  }
  if (value) {
    elementRef.current.classList.add(className);
  } else {
    elementRef.current.classList.remove(className);
  }
}
