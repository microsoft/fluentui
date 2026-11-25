import { createHash } from 'node:crypto';

/** SHA-256 fingerprint of source text used to reject stale edits. */
export function fingerprintText(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}
