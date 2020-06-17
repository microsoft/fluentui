import * as React from 'react';
import { mergeAriaAttributeValues } from '../../Utilities';
import { IKeytipDataProps } from './KeytipData.types';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { mergeOverflows, sequencesToID, getAriaDescribedBy } from '../../utilities/keytips/KeytipUtils';
import { useConst } from '@uifabric/react-hooks';

export type KeytipDataOptions = IKeytipDataProps;

export interface IKeytipData {
  targetElementAttributes: { [key: string]: string | undefined };
  executeElementAttributes: { [key: string]: string | undefined };
}

export function useKeytipData(options: KeytipDataOptions): IKeytipData {
  let uniqueId: string | undefined;
  const keytipManager = useConst<KeytipManager>(KeytipManager.getInstance());
  const preparedKeytipProps: IKeytipProps = {
    disabled: options.disabled,
    ...options.keytipProps!,
  };

  React.useEffect(() => {
    // Register Keytip in KeytipManager
    if (options.keytipProps) {
      uniqueId = keytipManager.register(preparedKeytipProps);
    }

    return () => {
      // Unregister Keytip in KeytipManager
      options.keytipProps && keytipManager.unregister(preparedKeytipProps, uniqueId!);
    };
  }, []);

  React.useEffect(() => {
    options.keytipProps && keytipManager.update(preparedKeytipProps, uniqueId!);
  }, [options.keytipProps, options.disabled]);

  let nativeKeytipProps: IKeytipData = {
    targetElementAttributes: {},
    executeElementAttributes: {},
  };

  if (options.keytipProps) {
    nativeKeytipProps = getKtpAttrs(keytipManager, preparedKeytipProps, options.ariaDescribedBy);
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

  // Construct aria-describedby and data-ktp-id attributes and return
  const ariaDescribedBy = getAriaDescribedBy(newKeytipProps.keySequences);
  let keySequences = [...newKeytipProps.keySequences];
  if (newKeytipProps.overflowSetSequence) {
    keySequences = mergeOverflows(keySequences, newKeytipProps.overflowSetSequence);
  }
  const ktpId = sequencesToID(keySequences);

  return {
    targetElementAttributes: {
      'aria-describedby': mergeAriaAttributeValues(describedByPrepend, ariaDescribedBy),
      'data-ktp-target': ktpId,
    },
    executeElementAttributes: {
      'data-ktp-execute-target': ktpId,
    },
  };
}
