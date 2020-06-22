import * as React from 'react';
import { useConst, usePrevious } from '@uifabric/react-hooks';
import { mergeAriaAttributeValues } from '../../Utilities';
import { IKeytipDataProps } from './KeytipData.types';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager, mergeOverflows, sequencesToID, getAriaDescribedBy } from '../../utilities/keytips/index';

export type KeytipDataOptions = IKeytipDataProps;

export interface IKeytipData {
  ariaDescribedBy: string | undefined;
  targetElementAttributes: { [key: string]: string | undefined };
  executeElementAttributes: { [key: string]: string | undefined };
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

  React.useEffect(() => {
    // Register Keytip in KeytipManager
    if (keytipProps) {
      uniqueId.current = keytipManager.register(keytipProps);
    }

    return () => {
      // Unregister Keytip in KeytipManager
      keytipProps && keytipManager.unregister(keytipProps, uniqueId.current!);
    };
  }, []);

  const prevOptions = usePrevious(options);

  if (
    uniqueId.current &&
    keytipProps &&
    (prevOptions?.keytipProps !== options.keytipProps || prevOptions?.disabled !== options.disabled)
  ) {
    keytipManager.update(keytipProps, uniqueId.current);
  }

  let nativeKeytipProps: IKeytipData = {
    ariaDescribedBy: undefined,
    targetElementAttributes: {},
    executeElementAttributes: {},
  };

  if (keytipProps) {
    nativeKeytipProps = getKtpAttrs(keytipManager, keytipProps, options.ariaDescribedBy);
  }

  return nativeKeytipProps;
}

/**
 * Gets the aria- and data- attributes to attach to the component
 * @param keytipProps - options for Keytip
 * @param describedByPrepend - ariaDescribedBy value to prepend
 */
function getKtpAttrs(
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
  const ktpId = sequencesToID(keySequences);

  return {
    ariaDescribedBy,
    targetElementAttributes: {
      'data-ktp-target': ktpId,
    },
    executeElementAttributes: {
      'data-ktp-execute-target': ktpId,
    },
  };
}
