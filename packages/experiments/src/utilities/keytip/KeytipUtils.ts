import { IKeySequence } from '../keysequence';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager } from '../../KeytipLayer';

// Constants
export const ktpPrefix = 'ktp';
export const ktpSeparator = '-';
export const ktpFullPrefix = ktpPrefix + ktpSeparator;

/**
 * Adds seq1 to the list of sequences
 * Returns a new array of IKeySequence
 * @param sequences
 * @param seq1
 */
export function addKeytipSequence(sequences: IKeySequence[], seq1: IKeySequence): IKeySequence[] {
  return [...sequences, { keys: [...seq1.keys] }];
}

/**
 * Utility funciton to register a keytip in the KeytipManager
 * TODO: should this return an any? or something else
 * @param keytipProps - Keytip to register
 * @returns - any {} containing the aria-describedby and data-ktp-id to add to the relevant element
 */
// tslint:disable-next-line:no-any
export function registerKeytip(keytipProps: IKeytipProps): any {
  let ktpMgr = KeytipManager.getInstance();
  return ktpMgr.registerKeytip(keytipProps);
}

/**
 * Utility funciton to unregister a keytip in the KeytipManager
 * @param keytipProps - Keytip to unregister
 */
export function unregisterKeytip(keytipProps: IKeytipProps): void {
  let ktpMgr = KeytipManager.getInstance();
  ktpMgr.unregisterKeytip(keytipProps);
}