import hash from '@emotion/hash';
import { SEQUENCE_HASH_LENGTH, SEQUENCE_PREFIX } from '../../constants';

function padEndHash(value: string): string {
  const hashLength = value.length;

  if (hashLength === SEQUENCE_HASH_LENGTH) {
    return value;
  }

  for (let i = hashLength; i < SEQUENCE_HASH_LENGTH; i++) {
    value += '0';
  }

  return value;
}

export function hashSequence(classes: string, dir: 'ltr' | 'rtl') {
  return SEQUENCE_PREFIX + padEndHash(hash(classes + dir));
}
