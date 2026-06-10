import { readFileSync } from 'fs';
import { join } from 'path';

import { RISK_CONFIG_KEYS } from '../commands/analyze';

const SCHEMA_PATH = join(__dirname, '..', '..', 'risk-config.schema.json');

describe('risk-config.schema.json', () => {
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));

  it('is a valid draft-07 object schema that rejects unknown keys', () => {
    expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(schema.type).toBe('object');
    expect(schema.additionalProperties).toBe(false);
  });

  it('stays in sync with the loader allow-list (no drift)', () => {
    const schemaKeys = new Set(Object.keys(schema.properties));
    expect(schemaKeys).toEqual(RISK_CONFIG_KEYS);
  });

  it('documents every option with a description', () => {
    for (const [key, def] of Object.entries<Record<string, unknown>>(schema.properties)) {
      expect(typeof def.description).toBe('string');
      expect((def.description as string).length).toBeGreaterThan(0);
      expect(key).toBeTruthy();
    }
  });
});
