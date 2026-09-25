import { createHash } from 'node:crypto';

import type { Fingerprint, MetadataDocument } from './types';

type CanonicalJsonValue =
  | boolean
  | null
  | number
  | string
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };

export function toCanonicalJsonValue(value: unknown): CanonicalJsonValue {
  return canonicalize(value, new Set(), '$');
}

export function serializeMetadata(document: MetadataDocument): string {
  return `${JSON.stringify(toCanonicalJsonValue(document))}\n`;
}

export function fingerprintSerializedMetadata(serialized: string): Fingerprint {
  return {
    algorithm: 'sha256',
    value: createHash('sha256').update(serialized, 'utf8').digest('hex'),
  };
}

export function fingerprintMetadata(document: MetadataDocument): Fingerprint {
  return fingerprintSerializedMetadata(serializeMetadata(document));
}

function canonicalize(value: unknown, ancestors: Set<object>, path: string): CanonicalJsonValue {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot serialize non-finite number at ${path}`);
    }

    return value;
  }

  if (typeof value !== 'object') {
    throw new TypeError(`Cannot serialize ${typeof value} at ${path}`);
  }

  if (ancestors.has(value)) {
    throw new TypeError(`Cannot serialize cyclic value at ${path}`);
  }

  ancestors.add(value);

  try {
    if (Array.isArray(value)) {
      return value.map((item, index) => canonicalize(item, ancestors, `${path}[${index}]`));
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError(`Cannot serialize non-plain object at ${path}`);
    }

    const result = Object.create(null) as { [key: string]: CanonicalJsonValue };
    for (const key of Object.keys(value).sort()) {
      result[key] = canonicalize((value as Record<string, unknown>)[key], ancestors, `${path}.${key}`);
    }

    return result;
  } finally {
    ancestors.delete(value);
  }
}
