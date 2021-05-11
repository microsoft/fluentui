import murmurHash from '@emotion/hash';
import { HASH_LENGTH } from '../../constants';

function padEndHash(value: string): string {
  const hashLength = value.length;

  if (hashLength === HASH_LENGTH) {
    return value;
  }

  for (let i = hashLength; i < HASH_LENGTH; i++) {
    value += '0';
  }

  return value;
}

/**
 * Uses MurmurHash to generate a hash and ensures that its output is always has 7 characters.
 */
export function hashString(value: string): string {
  return padEndHash(murmurHash(value));
}
