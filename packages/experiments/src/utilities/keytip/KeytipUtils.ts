import { IKeySequence } from '../keysequence';

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