import { KTP_SEPARATOR, KTP_PREFIX, DATAKTP_TARGET, DATAKTP_EXECUTE_TARGET, KTP_LAYER_ID } from './KeytipConstants';
import { addElementAtIndex } from '../../Utilities';

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence.
 *
 * @param keySequences - Full path of IKeySequences for one keytip.
 * @returns String to use for the keytip ID.
 */
export function sequencesToID(keySequences: string[]): string {
  return keySequences.reduce((prevValue: string, keySequence: string): string => {
    return prevValue + KTP_SEPARATOR + keySequence.split('').join(KTP_SEPARATOR);
  }, KTP_PREFIX);
}

/**
 * Merges an overflow sequence with a key sequence.
 *
 * @param keySequences - Full sequence for one keytip.
 * @param overflowKeySequences - Full overflow keytip sequence.
 * @returns Sequence that will be used by the keytip when in the overflow.
 */
export function mergeOverflows(keySequences: string[], overflowKeySequences: string[]): string[] {
  const overflowSequenceLen = overflowKeySequences.length;
  const overflowSequence = [...overflowKeySequences].pop();
  const newKeySequences = [...keySequences];
  return addElementAtIndex(newKeySequences, overflowSequenceLen - 1, overflowSequence!);
}

/**
 * Constructs the data-ktp-target attribute selector from a full key sequence.
 *
 * @param keySequences - Full string[] for a Keytip.
 * @returns String selector to use to query for the keytip target.
 */
export function ktpTargetFromSequences(keySequences: string[]): string {
  return '[' + DATAKTP_TARGET + '="' + sequencesToID(keySequences) + '"]';
}

/**
 * Constructs the data-ktp-execute-target attribute selector from a keytip ID.
 *
 * @param keytipId - ID of the Keytip.
 * @returns String selector to use to query for the keytip execute target.
 */
export function ktpTargetFromId(keytipId: string): string {
  return '[' + DATAKTP_EXECUTE_TARGET + '="' + keytipId + '"]';
}

/**
 * Gets the aria-describedby value to put on the component with this keytip.
 *
 * @param keySequences - KeySequences of the keytip.
 * @returns The aria-describedby value to set on the component with this keytip.
 */
export function getAriaDescribedBy(keySequences: string[]): string {
  const describedby = ' ' + KTP_LAYER_ID;
  if (!keySequences.length) {
    // Return just the layer ID
    return describedby;
  }

  return describedby + ' ' + sequencesToID(keySequences);
}
