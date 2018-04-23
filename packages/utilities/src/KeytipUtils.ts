import {
  ktpPrefix,
  ktpSeparator,
  dataKtpTarget,
  dataKtpExecuteTarget,
  ktpLayerId,
  ktpAriaSeparatorId
} from './KeytipConstants';
import { addElementAtIndex } from './array';

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence
 *
 * @param keySequences - Full path of IKeySequences for one keytip
 * @returns {string} String to use for the keytip ID
 */
export function convertSequencesToKeytipID(keySequences: string[]): string {
  return keySequences.reduce((prevValue: string, keySequence: string): string => {
    return prevValue + ktpSeparator + keySequence.split('').join(ktpSeparator);
  }, ktpPrefix);
}

/**
 * Merges an overflow sequence with a key sequence
 *
 * @param keySequences - Full sequence for one keytip
 * @param overflowKeySequences - Full overflow keytip sequence
 * @returns {string[]} Sequence that will be used by the keytip when in the overflow
 */
export function mergeOverflowKeySequences(keySequences: string[], overflowKeySequences: string[]): string[] {
  const overflowSequenceLen = overflowKeySequences.length;
  const overflowSequence = [...overflowKeySequences].pop();
  const newKeySequences = [...keySequences];
  return addElementAtIndex(newKeySequences, overflowSequenceLen - 1, overflowSequence!);
}

/**
 * Constructs the data-ktp-target attribute selector from a full key sequence
 *
 * @param keySequences - Full string[] for a Keytip
 * @returns {string} String selector to use to query for the keytip target
 */
export function constructKeytipTargetFromSequences(keySequences: string[]): string {
  return '[' + dataKtpTarget + '="' + convertSequencesToKeytipID(keySequences) + '"]';
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
export function getAriaDescribedBy(keySequences: string[]): string {
  const describedby = ' ' + ktpLayerId;
  if (!keySequences.length) {
    // Return just the layer ID
    return describedby;
  }

  return describedby + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences);
}