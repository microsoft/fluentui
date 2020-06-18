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

export function useKeytipData(options: KeytipDataOptions): IKeytipData {
  let uniqueId: string | undefined;
  const keytipProps: IKeytipProps | undefined = React.useMemo(
    () =>
      options.keytipProps
        ? {
            disabled: options.disabled,
            ...options.keytipProps,
          }
        : undefined,
    [options.keytipProps, options.disabled],
  );

  const keytipManager = useConst<KeytipManager>(KeytipManager.getInstance());
  React.useEffect(() => {
    // Register Keytip in KeytipManager
    if (keytipProps) {
      uniqueId = keytipManager.register(keytipProps);
    }

    return () => {
      // Unregister Keytip in KeytipManager
      keytipProps && keytipManager.unregister(keytipProps, uniqueId!);
    };
  }, []);

  const prevKeytipProps = usePrevious(keytipProps);

  if (prevKeytipProps !== undefined && prevKeytipProps !== options.keytipProps) {
    keytipProps && keytipManager.update(keytipProps, uniqueId!);
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
    getAriaDescribedBy(newKeytipProps.keySequences),
    describedByPrepend,
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
