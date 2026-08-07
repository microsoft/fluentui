// @ts-check

const path = require('path');

const { getStateDataAttributes } = require('./getStateDataAttributes');

const VALID_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/valid');
const INVALID_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/invalid');
const INVALID_TSCONFIG_OPTIONS_FIXTURE = path.join(
  __dirname,
  '__fixtures__/state-data-attributes/invalid-tsconfig-options',
);
const SEMANTIC_ERROR_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/semantic-error');
const SYNTAX_ERROR_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/syntax-error');
const ALIASED_STATE_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/aliased-state');

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

    it('throws a descriptive error when tsconfig has invalid compiler options (parseJsonConfigFileContent.errors)', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(INVALID_TSCONFIG_OPTIONS_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(INVALID_TSCONFIG_OPTIONS_FIXTURE, 'src'),
        }),
      ).toThrow(new RegExp(escapeRegExp(INVALID_TSCONFIG_OPTIONS_FIXTURE)));
    });

    it('error message for invalid compiler options includes the TypeScript diagnostic text', () => {
      let message = '';
      try {
        getStateDataAttributes({
          tsconfigPath: path.join(INVALID_TSCONFIG_OPTIONS_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(INVALID_TSCONFIG_OPTIONS_FIXTURE, 'src'),
        });
      } catch (/** @type {any} */ err) {
        message = err.message;
      }
      // TypeScript diagnostic: "Argument for '--target' option must be: ..."
      expect(message).toMatch(/--target/i);
    });

    it('throws a descriptive error when a source file under sourceRoot has semantic diagnostics', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(SEMANTIC_ERROR_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(SEMANTIC_ERROR_FIXTURE, 'src'),
        }),
      ).toThrow(/TypeScript program errors/i);
    });

    it('semantic diagnostic error message includes the tsconfig path for context', () => {
      let message = '';
      try {
        getStateDataAttributes({
          tsconfigPath: path.join(SEMANTIC_ERROR_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(SEMANTIC_ERROR_FIXTURE, 'src'),
        });
      } catch (/** @type {any} */ err) {
        message = err.message;
      }
      expect(message).toContain(SEMANTIC_ERROR_FIXTURE);
    });

    it('semantic diagnostic error message includes the TypeScript diagnostic text', () => {
      let message = '';
      try {
        getStateDataAttributes({
          tsconfigPath: path.join(SEMANTIC_ERROR_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(SEMANTIC_ERROR_FIXTURE, 'src'),
        });
      } catch (/** @type {any} */ err) {
        message = err.message;
      }
      // TS2322: "Type 'number' is not assignable to type 'string'."
      expect(message).toMatch(/not assignable/i);
    });
  });
  // ─── boolean type display ──────────────────────────────────────────────────────

  describe('boolean type display', () => {
    /** @type {ReturnType<typeof getStateDataAttributes>} */
    let result;

    beforeAll(() => {
      result = getStateDataAttributes({
        tsconfigPath: path.join(VALID_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(VALID_FIXTURE, 'src'),
      });
    });

    it('renders a plain boolean attribute as "boolean" (not "false | true")', () => {
      const attr = result.Button.find(a => a.name === 'data-focused');
      expect(attr).toBeDefined();
      expect(attr?.type).toBe('boolean');
    });

    it('renders a boolean | string literal attribute as "boolean | \\"mixed\\""', () => {
      const attr = result.Button.find(a => a.name === 'data-checked');
      expect(attr).toBeDefined();
      // Stable ordering: boolean-literal members collapse to 'boolean' first
      expect(attr?.type).toBe('boolean | "mixed"');
    });
  });

  // ─── syntax diagnostics ───────────────────────────────────────────────────────

  describe('syntax diagnostics', () => {
    it('throws when a source file under sourceRoot has a syntax error', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(SYNTAX_ERROR_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(SYNTAX_ERROR_FIXTURE, 'src'),
        }),
      ).toThrow(/TypeScript program errors/i);
    });
  });

  // ─── aliased *State exports ────────────────────────────────────────────────────

  describe('aliased *State exports', () => {
    /** @type {ReturnType<typeof getStateDataAttributes>} */
    let result;

    beforeAll(() => {
      result = getStateDataAttributes({
        tsconfigPath: path.join(ALIASED_STATE_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(ALIASED_STATE_FIXTURE, 'src'),
      });
    });

    it('emits a key for the original *State export', () => {
      expect(Object.keys(result)).toContain('ToggleButton');
    });

    it('emits a key for the aliased *State export (does not drop the second name)', () => {
      expect(Object.keys(result)).toContain('PrimaryToggleButton');
    });

    it('both keys carry the same data attributes', () => {
      expect(result.ToggleButton).toEqual(result.PrimaryToggleButton);
    });

    it('data-pressed is rendered as "boolean"', () => {
      const attr = result.ToggleButton.find(a => a.name === 'data-pressed');
      expect(attr?.type).toBe('boolean');
    });
  });
});

/**
 * Escapes a string for use inside a RegExp literal.
 * @param {string} str
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
