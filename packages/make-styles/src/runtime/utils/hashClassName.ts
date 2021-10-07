import hashString from '@emotion/hash';
import { HASH_PREFIX } from '../../constants';

export interface HashedClassNameParts {
  property: string;
  value: string;
  pseudo: string;
  media: string;
  support: string;
  unstable_cssPriority: number;
}

export function hashClassName({
  media,
  property,
  pseudo,
  support,
  value,
  unstable_cssPriority,
}: HashedClassNameParts): string {
  // Trimming of value is required to generate consistent hashes
  const classNameHash = hashString(pseudo + media + support + property + value.trim());

  return HASH_PREFIX + classNameHash + (unstable_cssPriority === 0 ? '' : unstable_cssPriority);
}
