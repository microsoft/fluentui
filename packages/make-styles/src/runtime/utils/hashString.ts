import murmurHash from '@emotion/hash';

function padEndHash(value: string): string {
  const hashLength = value.length;

  if (hashLength === 7) {
    return value;
  }

  for (let i = hashLength; i < 7; i++) {
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
