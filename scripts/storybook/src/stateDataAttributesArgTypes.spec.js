// @ts-check

const { toDataAttributeArgTypes, createStateDataAttributesArgTypesEnhancer } = require('./stateDataAttributesArgTypes');

// ── fixtures ──────────────────────────────────────────────────────────────────

/** @type {import('./stateDataAttributesArgTypes').StateDataAttribute[]} */
const SINGLE_METADATA = [{ name: 'data-disabled', type: 'boolean', description: 'Set when disabled.' }];

// ── Test 1: toDataAttributeArgTypes ──────────────────────────────────────────

describe('toDataAttributeArgTypes', () => {
  it('converts metadata into ArgTypes rows', () => {
    const result = toDataAttributeArgTypes(SINGLE_METADATA);

    expect(Object.keys(result)).toEqual(['data-disabled']);
    const row = /** @type {import('./stateDataAttributesArgTypes').ArgTypeRow} */ (result['data-disabled']);
    expect(row.name).toBe('data-disabled');
    expect(row.description).toBe('Set when disabled.');
    expect(row.type).toEqual({ name: 'other', value: 'boolean', required: false });
    expect(row.table).toEqual({ category: 'Data attributes', type: { summary: 'boolean' } });
    expect(row.control).toBe(false);
  });
});

// ── Test 2–15: createStateDataAttributesArgTypesEnhancer ─────────────────────

describe('createStateDataAttributesArgTypesEnhancer', () => {
  /** Minimal base extractor that returns empty ArgTypes. */
  function makeBaseExtractor(/** @type {import('./stateDataAttributesArgTypes').ArgTypes} */ argTypesMap = {}) {
    const extractor = () => ({ ...argTypesMap });
    return extractor;
  }

  /** Build a minimal Storybook context. */
  function makeContext({
    title = 'Pkg/MyComponent',
    component = /** @type {unknown} */ (() => null),
    subcomponents = /** @type {Record<string, unknown>} */ ({}),
    docsExtractor = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (makeBaseExtractor()),
    existingArgTypes = /** @type {import('./stateDataAttributesArgTypes').ArgTypes} */ ({}),
  } = {}) {
    return {
      title,
      component,
      subcomponents,
      argTypes: existingArgTypes,
      parameters: {
        docs: /** @type {{ extractArgTypes?: import('./stateDataAttributesArgTypes').ExtractArgTypes; argTypes?: { include?: string[]; exclude?: string[] } }} */ ({
          extractArgTypes: docsExtractor,
        }),
      },
    };
  }

  // Test 2: second-pass enhancer merges primary metadata into existing ArgTypes
  it('merges primary metadata into existing ArgTypes (test 2)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const ctx = makeContext({ component: MyComponent });
    const result = enhancer(ctx);

    expect(result['data-disabled']).toBeDefined();
    const row = /** @type {import('./stateDataAttributesArgTypes').ArgTypeRow} */ (result['data-disabled']);
    expect(row.table).toBeDefined();
    const table = /** @type {{ category: string }} */ (row.table);
    expect(table.category).toBe('Data attributes');
  });

  // Test 3: existing primary ArgTypes win on collision
  it('existing primary ArgTypes win on collision (test 3)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const ctx = makeContext({
      component: MyComponent,
      existingArgTypes: { 'data-disabled': { name: 'data-disabled', description: 'override', control: 'text' } },
    });
    const result = enhancer(ctx);

    const row = /** @type {import('./stateDataAttributesArgTypes').ArgTypeRow} */ (result['data-disabled']);
    expect(row.description).toBe('override');
    expect(row.control).toBe('text');
  });

  // Test 4: primary resolution uses displayName, then function name, then final title segment
  it('resolves primary key via displayName (test 4a)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { ByDisplay: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const SomeName = Object.assign(() => null, { displayName: 'ByDisplay' });
    const ctx = makeContext({ component: SomeName, title: 'Pkg/ByTitle' });
    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeDefined();
  });

  it('resolves primary key via function name when no displayName (test 4b)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { SomeName: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const SomeName = () => null;
    const ctx = makeContext({ component: SomeName, title: 'Pkg/ByTitle' });
    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeDefined();
  });

  it('resolves primary key via final title segment as last fallback (test 4c)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { ByTitle: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const Anonymous = () => null;
    const ctx = makeContext({ component: Anonymous, title: 'Pkg/ByTitle' });
    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeDefined();
  });

  // Test 5: wrapped extraction preserves original subcomponent rows
  it('preserves original subcomponent rows from base extractor (test 5)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    const subExtractorRows = { someProp: { name: 'someProp', description: 'a prop', control: 'text' } };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const SubComponent = () => null;

    const ctx = makeContext({
      component: MyComponent,
      subcomponents: { SubComponent },
      docsExtractor: makeBaseExtractor(subExtractorRows),
    });

    enhancer(ctx);

    const wrapper = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (
      ctx.parameters.docs.extractArgTypes
    );
    const subResult = wrapper(SubComponent);
    expect(subResult.someProp).toBeDefined();
  });

  // Test 6: base extractor is called with exactly one argument: component
  it('calls base extractor with exactly one argument (test 6)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    /** @type {unknown[][]} */
    const calls = [];
    /** @param {...unknown} args */
    const spyExtractor = (...args) => {
      calls.push(args);
      return {};
    };

    const MyComponent = () => null;
    const SubComponent = () => null;

    const ctx = makeContext({
      component: MyComponent,
      subcomponents: { SubComponent },
      docsExtractor: spyExtractor,
    });

    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);
    enhancer(ctx);

    const wrapper = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (
      ctx.parameters.docs.extractArgTypes
    );
    wrapper(MyComponent);
    wrapper(SubComponent);

    expect(calls.length).toBeGreaterThan(0);
    for (const args of calls) {
      expect(args.length).toBe(1);
    }
  });

  // Test 7: subcomponent keys recovered by reference; sibling rows stay isolated
  it('subcomponent keys recovered by reference; sibling rows stay isolated (test 7)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = {
      MyComponent: SINGLE_METADATA,
      SubA: [{ name: /** @type {'data-checked'} */ ('data-checked'), type: 'boolean', description: 'Checked.' }],
    };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const SubA = () => null;

    const ctx = makeContext({
      component: MyComponent,
      subcomponents: { SubA },
    });

    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeDefined();
    expect(result['data-checked']).toBeUndefined();
  });

  // Test 8: reference-matched key wins even if displayName/function name points to different metadata
  it('reference-matched key wins over displayName match (test 8)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = {
      ByRef: [{ name: /** @type {'data-ref-attr'} */ ('data-ref-attr'), type: 'boolean', description: 'Ref.' }],
      ByDisplay: SINGLE_METADATA,
    };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = Object.assign(() => null, { displayName: 'ByDisplay' });

    const ctx = makeContext({
      component: MyComponent,
      subcomponents: { ByRef: MyComponent },
      title: 'Pkg/MyComponent',
    });

    const result = enhancer(ctx);
    // primary uses displayName 'ByDisplay'
    expect(result['data-disabled']).toBeDefined();

    // Invoke the wrapped extractor with the reference-matched component (registered as 'ByRef').
    // The authoritative subcomponent key 'ByRef' wins over displayName/function-name metadata,
    // so the wrapper must inject 'data-ref-attr' (from ByRef metadata), not 'data-disabled'.
    const wrapper = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (
      ctx.parameters.docs.extractArgTypes
    );
    const subResult = wrapper(MyComponent);
    expect(subResult['data-ref-attr']).toBeDefined();
    const refRow = /** @type {import('./stateDataAttributesArgTypes').ArgTypeRow} */ (subResult['data-ref-attr']);
    expect(refRow.description).toBe('Ref.');
    // The displayName-matched key must NOT bleed into the subcomponent extraction
    expect(subResult['data-disabled']).toBeUndefined();
  });

  // Test 9: existing subcomponent ArgTypes win on generated collision
  it('existing subcomponent ArgTypes win on generated collision (test 9)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { Sub: SINGLE_METADATA };
    const existingSubRows = {
      'data-disabled': { name: 'data-disabled', description: 'existing sub', control: 'text' },
    };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const Sub = () => null;

    const ctx = makeContext({
      component: MyComponent,
      subcomponents: { Sub },
      docsExtractor: makeBaseExtractor(existingSubRows),
    });

    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeUndefined();

    // Invoke the wrapped extractor with the subcomponent and assert the existing row wins.
    const wrapper = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (
      ctx.parameters.docs.extractArgTypes
    );
    const subResult = wrapper(Sub);
    expect(subResult['data-disabled']).toBeDefined();
    const row = /** @type {import('./stateDataAttributesArgTypes').ArgTypeRow} */ (subResult['data-disabled']);
    // The pre-existing 'existing sub' description wins over the generated row
    expect(row.description).toBe('existing sub');
    expect(row.control).toBe('text');
  });

  // Test 10: parameters.docs is cloned; original object remains unchanged; existing docs.argTypes.include/exclude preserved
  it('clones parameters.docs and preserves include/exclude (test 10)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const originalExtractor = makeBaseExtractor();
    const ctx = makeContext({ component: MyComponent, docsExtractor: originalExtractor });
    ctx.parameters.docs.argTypes = { include: ['foo'], exclude: ['bar'] };

    const originalDocs = ctx.parameters.docs;

    enhancer(ctx);

    // The ORIGINAL docs object must not be mutated
    expect(originalDocs.extractArgTypes).toBe(originalExtractor);
    expect(/** @type {any[]} */ (originalDocs.argTypes?.include)).toEqual(['foo']);
    expect(/** @type {any[]} */ (originalDocs.argTypes?.exclude)).toEqual(['bar']);

    // ctx.parameters.docs is now the clone (different object)
    expect(ctx.parameters.docs).not.toBe(originalDocs);
    // The clone preserves include/exclude
    expect(/** @type {any[]} */ (ctx.parameters.docs.argTypes?.include)).toEqual(['foo']);
    expect(/** @type {any[]} */ (ctx.parameters.docs.argTypes?.exclude)).toEqual(['bar']);
    // The clone has the fresh wrapped extractor
    expect(ctx.parameters.docs.extractArgTypes).not.toBe(originalExtractor);
  });

  // Test 11: name fallback works when extracted component is not a declared reference
  it('name fallback when component not in subcomponents map (test 11)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { FallbackName: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const FallbackName = () => null;
    const ctx = makeContext({ component: FallbackName });
    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeDefined();
  });

  // Test 12: missing primary metadata leaves primary ArgTypes unchanged but wraps extraction
  it('missing primary metadata leaves primary ArgTypes unchanged but wraps (test 12)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { SomethingElse: SINGLE_METADATA };
    const baseRows = { existingProp: { name: 'existingProp', description: 'existing' } };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const ctx = makeContext({ component: MyComponent, existingArgTypes: baseRows });

    const result = enhancer(ctx);
    expect(result['data-disabled']).toBeUndefined();
    expect(result.existingProp).toBeDefined();
  });

  // Test 13: missing parameters.docs.extractArgTypes augments primary rows without throwing
  it('missing extractArgTypes augments primary rows without throwing (test 13)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    const MyComponent = () => null;
    const ctx = makeContext({ component: MyComponent });
    ctx.parameters.docs.extractArgTypes = undefined;

    expect(() => {
      const result = enhancer(ctx);
      expect(result['data-disabled']).toBeDefined();
    }).not.toThrow();
  });

  // Test 14: re-running against a previously wrapped extractor unwraps to original
  it('unwraps previously wrapped extractor and creates one fresh wrapper (test 14)', () => {
    /** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
    const metadata = { MyComponent: SINGLE_METADATA };
    /** @type {unknown[]} */
    const calls = [];
    /** @param {unknown} component */
    const originalExtractor = component => {
      calls.push(component);
      return {};
    };

    const MyComponent = () => null;
    const ctx = makeContext({ component: MyComponent, docsExtractor: originalExtractor });

    const enhancer = createStateDataAttributesArgTypesEnhancer(metadata);

    // First run: wraps originalExtractor, stores fresh wrapper in ctx.parameters.docs
    enhancer(ctx);

    // Second run: finds the wrapped extractor, unwraps to base, creates a new fresh wrapper
    enhancer(ctx);

    // Invoke the current wrapper — base extractor must be called exactly ONCE (no stacking)
    calls.length = 0;
    const wrapper = /** @type {import('./stateDataAttributesArgTypes').ExtractArgTypes} */ (
      ctx.parameters.docs.extractArgTypes
    );
    wrapper(MyComponent);
    expect(calls.length).toBe(1);
  });

  // Test 15: enhancer has secondPass === true
  it('enhancer has secondPass === true (test 15)', () => {
    const enhancer = createStateDataAttributesArgTypesEnhancer({});
    expect(/** @type {any} */ (enhancer).secondPass).toBe(true);
  });
});
