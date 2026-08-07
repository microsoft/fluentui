// @ts-check

const path = require('path');

const { getStateDataAttributes } = require('./getStateDataAttributes');

const VALID_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/valid');
const INVALID_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/invalid');

describe('getStateDataAttributes', () => {
  // ─── happy path ───────────────────────────────────────────────────────────────

  describe('basic extraction', () => {
    /** @type {ReturnType<typeof getStateDataAttributes>} */
    let result;

    beforeAll(() => {
      result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
    });

    it('returns a result keyed by component name (State suffix stripped)', () => {
      expect(Object.keys(result)).toEqual(expect.arrayContaining(['Button', 'Popover']));
    });

    it('does not include a key for a state type without a root property', () => {
      expect(Object.keys(result)).not.toContain('NoRoot');
    });

    it('extracts data-* attributes from the root slot', () => {
      expect(result.Button).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'data-disabled' }),
          expect.objectContaining({ name: 'data-appearance' }),
        ]),
      );
    });

    it('does not include non-data-* root properties', () => {
      const names = result.Button.map(a => a.name);
      expect(names).not.toContain('className');
      expect(names).not.toContain('id');
    });

    it('reports the correct type string for a union', () => {
      const attr = result.Button.find(a => a.name === 'data-appearance');
      expect(attr).toBeDefined();
      expect(attr?.type).toBe('"primary" | "secondary" | "outline"');
    });

    it('strips optionality from the type string (no undefined in union)', () => {
      const attr = result.Button.find(a => a.name === 'data-disabled');
      expect(attr).toBeDefined();
      expect(attr?.type).not.toContain('undefined');
    });

    it('populates description from the JSDoc comment', () => {
      const attr = result.Button.find(a => a.name === 'data-appearance');
      expect(attr?.description).toBe('Visual appearance of the button.');
    });
  });

  // ─── intersection / base state ────────────────────────────────────────────────

  describe('intersection types (BaseState & extension)', () => {
    /** @type {ReturnType<typeof getStateDataAttributes>} */
    let result;

    beforeAll(() => {
      result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
    });

    it('includes data-* attrs from the base type in the extended state', () => {
      expect(result.Popover).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'data-open' })]));
    });

    it('includes data-* attrs declared directly in the extended state', () => {
      expect(result.Popover).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'data-placement' })]));
    });

    it('does not include non-data root properties from the extended state', () => {
      const names = result.Popover.map(a => a.name);
      expect(names).not.toContain('tabIndex');
    });

    it('produces stable literal union type formatting', () => {
      const attr = result.Popover.find(a => a.name === 'data-placement');
      expect(attr?.type).toBe('"before" | "after"');
    });
  });

  // ─── ordering ─────────────────────────────────────────────────────────────────

  describe('ordering', () => {
    it('result keys are in stable (sorted) order', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
      const keys = Object.keys(result);
      expect(keys).toEqual([...keys].sort());
    });

    it('attributes for each component are in stable (sorted) order', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
      const names = result.Button.map(a => a.name);
      expect(names).toEqual([...names].sort());
    });
  });

  // ─── JSON compatibility ────────────────────────────────────────────────────────

  describe('JSON compatibility', () => {
    it('result is round-trippable through JSON.stringify/parse', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
      expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    });
  });

  // ─── error cases ──────────────────────────────────────────────────────────────

  describe('error handling', () => {
    it('throws a descriptive error when sourceRoot does not exist', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
          sourceRoot: '/nonexistent/path/that/does/not/exist',
        }),
      ).toThrow(/sourceRoot/i);
    });

    it('throws a descriptive error for an invalid tsconfig path', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: '/nonexistent/tsconfig.json',
          sourceRoot: path.join(VALID_FIXTURE, 'src'),
        }),
      ).toThrow(/tsconfig/i);
    });

    it('throws a descriptive error for duplicate component key conflicts', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(INVALID_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(INVALID_FIXTURE, 'src'),
        }),
      ).toThrow(/duplicate.*Button|Button.*duplicate/i);
    });
  });
});
