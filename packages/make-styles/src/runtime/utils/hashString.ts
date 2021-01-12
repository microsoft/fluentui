import murmurHash from '@emotion/hash';

export function hashString(value: string): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return murmurHash(value).padEnd(7, '0');
}
