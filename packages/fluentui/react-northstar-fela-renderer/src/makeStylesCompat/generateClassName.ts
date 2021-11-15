import hashString from '@emotion/hash';

const HASH_PREFIX = 'f';

export function generateClassName(property: string, value: any, pseudo?: string, media?: string, support?: string) {
  // Trimming of value is required to generate consistent hashes
  return HASH_PREFIX + hashString(pseudo! + media! + support + property + value.toString().trim());
}
