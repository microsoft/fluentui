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
const TSCONFIG_BASE_STYLE_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/tsconfig-base-style');
const TSX_EXCLUDED_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/tsx-excluded');
const TRANSITIVE_TSX_ERRORS_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/transitive-tsx-errors');
const TEST_FILE_EXCLUSION_FIXTURE = path.join(__dirname, '__fixtures__/state-data-attributes/test-file-exclusion');

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

    it('keeps a lone false literal as "false" (does not widen to boolean)', () => {
      const attr = result.Button.find(a => a.name === 'data-lone-false');
      expect(attr).toBeDefined();
      expect(attr?.type).toBe('false');
    });

    it('keeps a lone true literal as "true" (does not widen to boolean)', () => {
      const attr = result.Button.find(a => a.name === 'data-lone-true');
      expect(attr).toBeDefined();
      expect(attr?.type).toBe('true');
    });

    it('keeps "false | \\"mixed\\"" as-is (does not widen to boolean)', () => {
      const attr = result.Button.find(a => a.name === 'data-false-mixed');
      expect(attr).toBeDefined();
      expect(attr?.type).toBe('false | "mixed"');
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
  // ─── Task 5: tsconfig.base-style (no jsx option) ─────────────────────────────

  describe('tsconfig.base-style (no jsx compiler option)', () => {
    it('succeeds when the tsconfig omits the jsx option (extractor supplies jsx internally)', () => {
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(TSCONFIG_BASE_STYLE_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(TSCONFIG_BASE_STYLE_FIXTURE, 'src'),
        }),
      ).not.toThrow();
    });

    it('extracts data-* attributes from a tsconfig.base-style project', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TSCONFIG_BASE_STYLE_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TSCONFIG_BASE_STYLE_FIXTURE, 'src'),
      });
      expect(result.Button).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'data-disabled' })]));
    });
  });

  // ─── Task 5: .tsx files excluded from inspection set ─────────────────────────

  describe('.tsx implementation files excluded from inspection set', () => {
    it('succeeds even when a .tsx file is a genuine transitive import into the TS program', () => {
      // ButtonState.ts imports a type from Button.tsx, so Button.tsx is a real
      // member of program.getSourceFiles(). Button.tsx also exports a duplicate
      // ButtonState — the collection loop must use filteredSourceFileSet and
      // skip Button.tsx, avoiding a duplicate-key error.
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(TSX_EXCLUDED_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(TSX_EXCLUDED_FIXTURE, 'src'),
        }),
      ).not.toThrow();
    });

    it('returns only one key (Button) — the transitive .tsx duplicate does not create a second entry', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TSX_EXCLUDED_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TSX_EXCLUDED_FIXTURE, 'src'),
      });
      expect(Object.keys(result)).toEqual(['Button']);
    });

    it('still extracts data-disabled from ButtonState.ts', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TSX_EXCLUDED_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TSX_EXCLUDED_FIXTURE, 'src'),
      });
      expect(result.Button).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'data-disabled' })]));
    });
  });

  // ─── Task 5: transitive .tsx errors do not block extraction ──────────────────

  describe('transitive .tsx errors in implementation files do not block extraction', () => {
    it('succeeds when a .tsx file in sourceRoot has type errors (renderButton.tsx)', () => {
      // renderButton.tsx has a deliberate TS2322 type error and JSX that would
      // fail if that file were checked.  Because only .ts files are inspected,
      // extraction must succeed.
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(TRANSITIVE_TSX_ERRORS_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(TRANSITIVE_TSX_ERRORS_FIXTURE, 'src'),
        }),
      ).not.toThrow();
    });

    it('extracts data-* attributes from the .types.ts file beside the broken .tsx', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TRANSITIVE_TSX_ERRORS_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TRANSITIVE_TSX_ERRORS_FIXTURE, 'src'),
      });
      expect(result.Button).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'data-disabled' }),
          expect.objectContaining({ name: 'data-appearance' }),
        ]),
      );
    });
  });

  // ─── Task 5: .spec.tsx / .test.tsx / .cy.tsx exclusion ───────────────────────

  describe('.spec.tsx, .test.tsx, and .cy.tsx test files are excluded', () => {
    it('succeeds when .spec.tsx, .test.tsx, and .cy.tsx files coexist in sourceRoot', () => {
      // Each test file exports a duplicate ButtonState; if any were included the
      // extractor would throw a duplicate-key error.
      expect(() =>
        getStateDataAttributes({
          tsconfigPath: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'tsconfig.json'),
          sourceRoot: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'src'),
        }),
      ).not.toThrow();
    });

    it('returns only one key (Button) — none of the test-file duplicates are emitted', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'src'),
      });
      expect(Object.keys(result)).toEqual(['Button']);
    });

    it('the extracted Button entry does not contain data-spec, data-test, or data-cy attrs', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'src'),
      });
      const names = result.Button.map(a => a.name);
      expect(names).not.toContain('data-spec');
      expect(names).not.toContain('data-test');
      expect(names).not.toContain('data-cy');
    });

    it('still extracts data-disabled from the genuine ButtonState.ts', () => {
      const result = getStateDataAttributes({
        tsconfigPath: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'tsconfig.json'),
        sourceRoot: path.join(TEST_FILE_EXCLUSION_FIXTURE, 'src'),
      });
      expect(result.Button).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'data-disabled' })]));
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
