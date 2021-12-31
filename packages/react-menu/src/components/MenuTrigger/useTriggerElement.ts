import * as React from 'react';
import { applyTriggerPropsToChildren, onlyChild, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { MenuTriggerChildProps } from './MenuTrigger.types';

interface ReactSyntheticEventDispatchConfig {
  registrationName?: string;
  phasedRegistrationNames?: {
    bubbled: string;
    captured: string;
  };
}

interface ReactSyntheticEvent extends React.SyntheticEvent<HTMLElement> {
  // React 17
  _reactName: string | undefined;

  // React 16
  dispatchConfig?: ReactSyntheticEventDispatchConfig;
}

export const useTriggerElement = (
  children: React.ReactElement | ((props: MenuTriggerChildProps) => React.ReactNode),
  refs: React.Ref<unknown>[],
  overrideProps: {}[],
) => {
  let childProps = {};
  let childRef = null;
  // child can be a render func, `applyTriggerPropsToChildren`does the same check again
  // TODO figure out a way to only do this check once
  if (React.isValidElement(children)) {
    const child = onlyChild(children);
    childProps = child.props;
    childRef = ((child as unknown) as { ref?: React.Ref<unknown> }).ref;
  }

  const mergedCallbacks = mergeSharedCallbacks(childProps, ...overrideProps);
  const universalCallback = useUniversalEventCallback(mergedCallbacks);
  const universalCallbacks: Record<string, typeof universalCallback> = {};
  Object.keys(mergedCallbacks).forEach(callbackName => {
    universalCallbacks[callbackName] = universalCallback;
  });

  const props = Object.assign({}, ...overrideProps, childProps, universalCallbacks);
  // undocumented, but react supports ref cloning through props
  props.ref = useMergedRefs(childRef, ...refs);

  return applyTriggerPropsToChildren(children, props) as React.ReactElement;
};

// Utilities to merge callbacks
const mergeTwoCallbacks = <TEvent extends React.SyntheticEvent>(
  a: React.EventHandler<TEvent> | undefined,
  b: React.EventHandler<TEvent> | undefined,
): React.EventHandler<TEvent> => {
  if ((!a || !b) && (a || b)) {
    if (a) {
      return a;
    }

    if (b) {
      return b;
    }
  }

  return (event: TEvent) => {
    a?.(event);
    b?.(event);
  };
};

const useUniversalEventCallback = (callbacks: Record<string, React.EventHandler<React.SyntheticEvent>>) => {
  return useEventCallback((e: ReactSyntheticEvent) => {
    if (e.dispatchConfig) {
      if (e.dispatchConfig.phasedRegistrationNames) {
        callbacks[e.dispatchConfig.phasedRegistrationNames.bubbled]?.(e);
        callbacks[e.dispatchConfig.phasedRegistrationNames.captured]?.(e);
      } else if (e.dispatchConfig.registrationName) {
        callbacks[e.dispatchConfig.registrationName]?.(e);
      }
    } else if (e._reactName) {
      const callbackName: string = e._reactName;
      callbacks[callbackName]?.(e);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('React synthetic event does not contain dispatchConfig or _reactName, please report this');
      }
    }
  });
};

const mergeCallbacks = (...args: (React.EventHandler<React.SyntheticEvent> | undefined)[]) => {
  const filtered = args.filter(cb => cb !== undefined) as React.EventHandler<React.SyntheticEvent>[];

  return filtered.reduce(
    (mergedCallback, callback) => {
      if (callback) {
        return mergeTwoCallbacks(mergedCallback, callback);
      }

      return mergedCallback;
    },
    () => null,
  );
};

/**
 * Accepts multiple props and merges event handler callbacks like `onClick` or `onBlur`
 * @param propsCollection - collection of props which can contain React event handler callbacks
 * @returns Map of event handler callback names to the merged event callback
 */
const mergeSharedCallbacks = (...propsCollection: React.DOMAttributes<Element>[]) => {
  const mergedCallbacks: Record<string, React.EventHandler<React.SyntheticEvent>> = {};

  propsCollection.forEach(props => {
    if (!props) {
      return;
    }

    for (const key in props) {
      if (
        typeof key === 'string' &&
        key.startsWith('on') &&
        typeof props[key as keyof React.DOMAttributes<HTMLElement>] === 'function'
      ) {
        const callback = props[
          key as keyof React.DOMAttributes<HTMLElement>
        ] as React.EventHandler<React.SyntheticEvent>;
        if (!mergedCallbacks[key]) {
          mergedCallbacks[key] = callback;
        } else {
          mergedCallbacks[key] = mergeCallbacks(mergedCallbacks[key], callback);
        }
      }
    }
  });

  return mergedCallbacks;
};
