import {
  IKeySequence,
  convertSequencesToKeytipID,
  dataKtpTarget,
  keySequencesAreEqual,
  ktpLayerId,
  ktpAriaSeparatorId,
  dataKtpExecuteTarget,
  mergeOverflowKeySequences
} from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager } from './KeytipManager';

/**
 * Adds an IKeySequence to a list of sequences
 * Returns a new array of IKeySequence
 *
 * @param sequences - Array of sequences to append to
 * @param seq1 - IKeySequence to append
 */
export function addKeytipSequence(sequences: IKeySequence[], seq1: IKeySequence): IKeySequence[] {
  return [...sequences, { keys: [...seq1.keys] }];
}

/**
 * Utility funciton to register a keytip in the KeytipManager
 *
 * @param keytipProps - Keytip to register
 */

export function registerKeytip(keytipProps: IKeytipProps): void {
  const ktpMgr = KeytipManager.getInstance();
  ktpMgr.registerKeytip(keytipProps);
}

/**
 * Utility funciton to unregister a keytip in the KeytipManager
 *
 * @param keytipProps - Keytip to unregister
 */
export function unregisterKeytip(keytipProps: IKeytipProps): void {
  const ktpMgr = KeytipManager.getInstance();
  ktpMgr.unregisterKeytip(keytipProps);
}

export function updateKeytip(keytipProps: IKeytipProps): void {
  const ktpMgr = KeytipManager.getInstance();
  ktpMgr.updateKeytip(keytipProps);
}

/**
 * Constructs the data-ktp-id attribute selector from a full key sequence
 *
 * @param keySequences - Full IKeySequence for a Keytip
 */
export function constructKeytipTargetFromSequences(keySequences: IKeySequence[]): string {
  return '[' + dataKtpTarget + '="' + convertSequencesToKeytipID(keySequences) + '"]';
}

/**
 * Constructs the data-ktp-id attribute selector from a keytip ID
 *
 * @param keytipId - ID of the Keytip
 */
export function constructKeytipTargetFromId(keytipId: string): string {
  return '[' + dataKtpTarget + '="' + keytipId + '"]';
}

/**
 * Constructs the data-ktp-execute-target attribute selector from a keytip ID
 *
 * @param keytipId - ID of the Keytip
 */
export function constructKeytipExecuteTargetFromId(keytipId: string): string {
  return '[' + dataKtpExecuteTarget + '="' + keytipId + '"]';
}

/**
 *
 * @param keySequences
 */
export function getAriaDescribedBy(keySequences: IKeySequence[]): string {
  const describedby = ktpLayerId;
  if (!keySequences.length) {
    // Return just the layer ID
    return ' ' + describedby;
  }

  // Add beginning space so it can be easily appended
  return ' ' + keySequences.reduce((prevValue: string, sequence: IKeySequence, currentIndex: number): string => {
    return prevValue + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences.slice(0, currentIndex + 1));
  }, describedby);
}

/**
 *
 *
 * @param keytipProps - Keytip to register
 * @returns - any {} containing the aria-describedby and data-ktp-id to add to the relevant element
 */
// tslint:disable-next-line:no-any
export function getNativeKeytipProps(keytipProps?: IKeytipProps): any {
  if (keytipProps) {
    // Construct aria-describedby and data-ktp-id attributes and return
    const ariaDescribedBy = getAriaDescribedBy(keytipProps.keySequences);
    let keySequences = keytipProps.keySequences;
    if (keytipProps.overflowSetSequence) {
      keySequences = mergeOverflowKeySequences(keySequences, keytipProps.overflowSetSequence);
    }
    const ktpId = convertSequencesToKeytipID(keySequences);

    return {
      'aria-describedby': ariaDescribedBy,
      'data-ktp-target': ktpId,
      'data-ktp-execute-target': ktpId
    };
  }
  return undefined;
}