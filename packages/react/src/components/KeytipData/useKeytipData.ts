import * as React from 'react';
import { useConst, useIsomorphicLayoutEffect, usePrevious } from '@fluentui/react-hooks';
import { mergeAriaAttributeValues } from '../../Utilities';
import { KeytipManager, mergeOverflows, sequencesToID, getAriaDescribedBy } from '../../utilities/keytips/index';
import type { KeytipDataOptions } from './KeytipData.types';
import type { IKeytipProps } from '../../Keytip';

export interface IKeytipData {
  ariaDescribedBy: string | undefined;
  keytipId: string | undefined;
}

/**
 * Hook that creates attributes for components which are enabled with Keytip.
 */
export function useKeytipData(options: KeytipDataOptions): IKeytipData {
  const uniqueId = React.useRef<string>();
  const keytipProps: IKeytipProps | undefined = options.keytipProps
    ? {
        disabled: options.disabled,
        ...options.keytipProps,
      }
    : undefined;

  const keytipManager = useConst<KeytipManager>(KeytipManager.getInstance());
  const prevOptions = usePrevious(options);

  // useLayoutEffect used to strictly emulate didUpdate/didMount behavior
  useIsomorphicLayoutEffect(() => {
    if (
      uniqueId.current &&
      keytipProps &&
      (prevOptions?.keytipProps !== options.keytipProps || prevOptions?.disabled !== options.disabled)
    ) {
      keytipManager.update(keytipProps, uniqueId.current);
    }
  });

  useIsomorphicLayoutEffect(() => {
    // Register Keytip in KeytipManager
    if (keytipProps) {
      uniqueId.current = keytipManager.register(keytipProps);
    }

    return () => {
      // Unregister Keytip in KeytipManager
      keytipProps && keytipManager.unregister(keytipProps, uniqueId.current!);
    };
    // this is meant to run only at mount, and updates are handled separately
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let nativeKeytipProps: IKeytipData = {
    ariaDescribedBy: undefined,
    keytipId: undefined,
  };

  if (keytipProps) {
    nativeKeytipProps = getKeytipData(keytipManager, keytipProps, options.ariaDescribedBy);
  }

  return nativeKeytipProps;
}

/**
 * Gets the aria- and data- attributes to attach to the component
 * @param keytipProps - options for Keytip
 * @param describedByPrepend - ariaDescribedBy value to prepend
 */
function getKeytipData(
  keytipManager: KeytipManager,
  keytipProps: IKeytipProps,
  describedByPrepend?: string,
): IKeytipData {
  // Add the parent overflow sequence if necessary
  const newKeytipProps = keytipManager.addParentOverflow(keytipProps);

  // Construct aria-describedby and data-ktp-id attributes
  const ariaDescribedBy = mergeAriaAttributeValues(
    describedByPrepend,
    getAriaDescribedBy(newKeytipProps.keySequences),
  )!;

  let keySequences = [...newKeytipProps.keySequences];
  if (newKeytipProps.overflowSetSequence) {
    keySequences = mergeOverflows(keySequences, newKeytipProps.overflowSetSequence);
  }
  const keytipId = sequencesToID(keySequences);

  return {
    ariaDescribedBy,
    keytipId,
  };
}
