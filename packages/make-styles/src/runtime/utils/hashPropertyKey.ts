import hash from '@emotion/hash';

export function hashPropertyKey(pseudo: string, media: string, support: string, property: string): string {
  // uniq key based on property & selector, used for merging later
  const computedKey = pseudo + media + support + property;

  // "key" can be really long as it includes selectors, we use hashes to reduce sizes of keys
  // ".foo :hover" => "abcd"
  const hashedKey = hash(computedKey);

  // As these hashes are used as object keys in build output we should avoid having numbers as a first character to
  // avoid having quotes:
  // {
  //   "1abc": {}, // we don't want this
  //   Aabc: {}, // no quotes
  // }
  const firstCharCode = hashedKey.charCodeAt(0);
  const startsWithNumber = firstCharCode >= 48 && firstCharCode <= 57;

  if (startsWithNumber) {
    return String.fromCharCode(firstCharCode + 17) + hashedKey.substr(1);
  }

  return hashedKey;
}
