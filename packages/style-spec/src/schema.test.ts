import Ajv from 'ajv';
import * as schema from './schema/component-style-spec.schema.json';
import type { ComponentStyleSpec } from './types';
import { validateSpec } from './validate';

const ajv = new Ajv({ allErrors: true, strict: true });
const validateWithSchema = ajv.compile(schema);

const spec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Sample',
  version: 1,
  slots: ['root', 'icon'],
  variants: { size: { values: ['small', 'medium'], default: 'medium' } },
  states: { disabled: { type: 'boolean' } },
  rules: [
    { slot: 'root', declarations: { display: 'flex', color: { token: 'colorNeutralForeground1' } } },
    {
      slot: 'root',
      when: { variants: { size: 'small' }, states: { disabled: false }, pseudo: ':hover', media: '(hover: hover)' },
      declarations: {
        '--sample-gap': { token: 'spacingHorizontalXS' },
        gap: { var: '--sample-gap', fallback: { token: 'spacingHorizontalS' } },
        padding: { concat: ['0 calc(', { token: 'spacingHorizontalXS' }, ' + ', { var: '--sample-gap' }, ')'] },
      },
    },
  ],
};

describe('component-style-spec.schema.json', () => {
  it('accepts the same documents as validateSpec', () => {
    expect(validateWithSchema(spec)).toBe(true);
    expect(validateSpec(spec).valid).toBe(true);
  });

  it('rejects target-specific keys', () => {
    const invalid = { ...spec, targets: { griffel: {} } };
    expect(validateWithSchema(invalid)).toBe(false);
    expect(validateSpec(invalid).valid).toBe(false);
  });

  it('rejects nested selectors inside declarations', () => {
    const invalid = { ...spec, rules: [{ slot: 'root', declarations: { ':hover': { color: 'red' } } }] };
    expect(validateWithSchema(invalid)).toBe(false);
    expect(validateSpec(invalid).valid).toBe(false);
  });

  it('rejects functions (the spec must be plain JSON)', () => {
    const invalid = { ...spec, rules: [{ slot: 'root', declarations: { color: () => 'red' } }] };
    expect(validateWithSchema(JSON.parse(JSON.stringify(invalid)))).toBe(false);
    expect(validateSpec(invalid).valid).toBe(false);
  });
});
