/* eslint-disable no-bitwise -- lz-string packs codes into base64 characters bit by bit. */
const URI_SAFE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$';
const BASE_VALUES = new Map(Array.from(URI_SAFE_ALPHABET, (character, index) => [character, index]));
const BITS_PER_CHARACTER = 6;
const END_OF_STREAM = 2;

export type BoundedDecompressResult = { ok: true; value: string } | { ok: false; reason: 'invalid' | 'too-large' };

/**
 * Decodes `lz-string`'s `compressToEncodedURIComponent` format, but stops as soon as the output would exceed
 * `maxLength` characters. LZ dictionaries let a short payload expand quadratically, so the input length alone does not
 * bound the output; this keeps decoding of an untrusted link proportional to `maxLength`.
 */
export function decompressFromEncodedURIComponentBounded(input: string, maxLength: number): BoundedDecompressResult {
  if (!input) {
    return { ok: false, reason: 'invalid' };
  }

  // `URLSearchParams` decodes "+" as a space.
  const source = input.replace(/ /g, '+');
  const resetPosition = 1 << (BITS_PER_CHARACTER - 1);
  let value = BASE_VALUES.get(source[0]) ?? 0;
  let position = resetPosition;
  let index = 1;

  const readBits = (count: number): number => {
    let bits = 0;
    for (let power = 1; power !== 1 << count; power <<= 1) {
      const bit = value & position;
      position >>= 1;
      if (position === 0) {
        position = resetPosition;
        value = BASE_VALUES.get(source[index++]) ?? 0;
      }
      if (bit > 0) {
        bits |= power;
      }
    }
    return bits;
  };

  const first = readBits(2);
  if (first === END_OF_STREAM) {
    return { ok: true, value: '' };
  }
  if (first > END_OF_STREAM) {
    return { ok: false, reason: 'invalid' };
  }

  // Codes 0-2 are reserved: 8-bit literal, 16-bit literal and end of stream.
  const dictionary: string[] = [];
  let dictionarySize = 4;
  let enlargeIn = 4;
  let codeBits = 3;
  let previous = String.fromCharCode(readBits(first === 0 ? 8 : 16));
  dictionary[3] = previous;
  const result = [previous];
  let length = previous.length;
  if (length > maxLength) {
    return { ok: false, reason: 'too-large' };
  }

  for (;;) {
    if (index > source.length) {
      return { ok: false, reason: 'invalid' };
    }

    let code = readBits(codeBits);
    if (code === END_OF_STREAM) {
      return { ok: true, value: result.join('') };
    }
    if (code < END_OF_STREAM) {
      dictionary[dictionarySize++] = String.fromCharCode(readBits(code === 0 ? 8 : 16));
      code = dictionarySize - 1;
      enlargeIn -= 1;
    }
    if (enlargeIn === 0) {
      enlargeIn = 1 << codeBits;
      codeBits += 1;
    }

    let entry: string;
    if (code >= 3 && code < dictionarySize) {
      entry = dictionary[code];
    } else if (code === dictionarySize) {
      entry = previous + previous.charAt(0);
    } else {
      return { ok: false, reason: 'invalid' };
    }

    length += entry.length;
    if (length > maxLength) {
      return { ok: false, reason: 'too-large' };
    }

    result.push(entry);
    dictionary[dictionarySize++] = previous + entry.charAt(0);
    enlargeIn -= 1;
    previous = entry;
    if (enlargeIn === 0) {
      enlargeIn = 1 << codeBits;
      codeBits += 1;
    }
  }
}
