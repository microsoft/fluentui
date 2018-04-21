import {
  IKeySequence,
  convertSequencesToKeytipID,
  dataKtpTarget,
  ktpLayerId,
  ktpAriaSeparatorId,
  dataKtpExecuteTarget,
  mergeOverflowKeySequences
} from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager } from './KeytipManager';

/**
 * Utility function to register a keytip in the KeytipManager
 *
 * @param keytipProps - Keytip to register
 * @returns {string} Unique ID for this keytip
 */
export function registerKeytip(keytipProps: IKeytipProps): string {
  const ktpMgr = KeytipManager.getInstance();
  return ktpMgr.registerKeytip(keytipProps);
}

/**
 * Utility function to unregister a keytip in the KeytipManager
 *
 * @param keytipProps - Keytip to unregister
 * @param uniqueID - Unique ID for this keytip
 */
export function unregisterKeytip(keytipProps: IKeytipProps, uniqueID: string): void {
  const ktpMgr = KeytipManager.getInstance();
  ktpMgr.unregisterKeytip(keytipProps, uniqueID);
}

/**
 * Utility function to update a keytip in the KeytipManager
 *
 * @param keytipProps - Keytip to update
 * @param uniqueID - Unique ID for this keytip
 */
export function updateKeytip(keytipProps: IKeytipProps, uniqueID: string): void {
  const ktpMgr = KeytipManager.getInstance();
  ktpMgr.updateKeytip(keytipProps, uniqueID);
}

/**
 * Constructs the data-ktp-target attribute selector from a full key sequence
 *
 * @param keySequences - Full IKeySequence[] for a Keytip
 * @returns {string} String selector to use to query for the keytip target
 */
export function constructKeytipTargetFromSequences(keySequences: IKeySequence[]): string {
  return '[' + dataKtpTarget + '="' + convertSequencesToKeytipID(keySequences) + '"]';
}

/**
 * Constructs the data-ktp-target attribute selector from a keytip ID
 *
 * @param keytipId - ID of the Keytip
 * @returns {string} String selector to use to query for the keytip target
 */
export function constructKeytipTargetFromId(keytipId: string): string {
  return '[' + dataKtpTarget + '="' + keytipId + '"]';
}

/**
 * Constructs the data-ktp-execute-target attribute selector from a keytip ID
 *
 * @param keytipId - ID of the Keytip
 * @returns {string} String selector to use to query for the keytip execute target
 */
export function constructKeytipExecuteTargetFromId(keytipId: string): string {
  return '[' + dataKtpExecuteTarget + '="' + keytipId + '"]';
}

/**
 * Gets the aria-describedby value to put on the component with this keytip
 *
 * @param keySequences - KeySequences of the keytip
 * @returns {string} The aria-describedby value to set on the component with this keytip
 */
export function getAriaDescribedBy(keySequences: IKeySequence[]): string {
  const describedby = ' ' + ktpLayerId;
  if (!keySequences.length) {
    // Return just the layer ID
    return describedby;
  }

  return describedby + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences);
}

/**
 * Gets the native properties to add to the component with this keytip
 *
 * @param keytipProps - If defined, the keytip props for the component
 * @param describedByPrepend - If defined, string to prepend to our generated aria-describedby
 * @returns {any} Object containing the aria-describedby, data-ktp-target, and data-ktp-execute-target properties
 */
// tslint:disable-next-line:no-any
export function getNativeKeytipProps(keytipProps?: IKeytipProps, describedByPrepend?: string): any {
  if (keytipProps) {
    // Construct aria-describedby and data-ktp-id attributes and return
    const ariaDescribedBy = getAriaDescribedBy(keytipProps.keySequences);
    let keySequences = keytipProps.keySequences;
    if (keytipProps.overflowSetSequence) {
      keySequences = mergeOverflowKeySequences(keySequences, keytipProps.overflowSetSequence);
    }
    const ktpId = convertSequencesToKeytipID(keySequences);

    return {
      'aria-describedby': (describedByPrepend || '') + ariaDescribedBy,
      'data-ktp-target': ktpId,
      'data-ktp-execute-target': ktpId
    };
  }
  return undefined;
}