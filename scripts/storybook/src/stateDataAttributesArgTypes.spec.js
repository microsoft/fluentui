// @ts-check

const { toDataAttributeArgTypes, createStateDataAttributesExtractor } = require('./stateDataAttributesArgTypes');

// ── fixtures ──────────────────────────────────────────────────────────────────

/** @type {import('./stateDataAttributesArgTypes').StateDataAttribute[]} */
const SINGLE_METADATA = [{ name: 'data-disabled', type: 'boolean', description: 'Set when disabled.' }];

/** @type {import('./stateDataAttributesArgTypes').StateDataAttributes} */
const ACCORDION_METADATA = {
  Accordion: [{ name: /** @type {'data-open'} */ ('data-open'), type: 'boolean', description: 'Open state.' }],
  AccordionItem: [{ name: /** @type {'data-value'} */ ('data-value'), type: 'string', description: 'Item value.' }],
  AccordionPanel: [
    { name: /** @type {'data-expanded'} */ ('data-expanded'), type: 'boolean', description: 'Expanded state.' },
  ],
};

// ── Test 1: toDataAttributeArgTypes row shape ─────────────────────────────────

describe('toDataAttributeArgTypes', () => {
  it('produces exact row shape: name, description, type, table, control', () => {
    const result = toDataAttributeArgTypes(SINGLE_METADATA);

    expect(Object.keys(result)).toEqual(['data-disabled']);
    const row = result['data-disabled'];
    expect(row.name).toBe('data-disabled');
    expect(row.description).toBe('Set when disabled.');
    expect(row.type).toEqual({ name: 'other', value: 'boolean', required: false });
    expect(row.table).toEqual({ category: 'Data attributes', type: { summary: 'boolean' } });
    expect(row.control).toBe(false);
  });
});

// ── Tests 2–12: createStateDataAttributesExtractor ───────────────────────────

describe('createStateDataAttributesExtractor', () => {
  // Test 2: always calls the native extractor with exactly one component argument
  it('always calls supplied native extractor with exactly one component argument (test 2)', () => {
    /** @type {unknown[][]} */
    const calls = [];
    /** @param {...unknown} args */
    const nativeExtractor = (...args) => {
      calls.push(args);
      return {};
    };

    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    extract(Comp);

    expect(calls.length).toBe(1);
    expect(calls[0].length).toBe(1);
    expect(calls[0][0]).toBe(Comp);
  });

  // Test 3: native rows preserved when metadata matches
  it('preserves native rows when metadata matches (test 3)', () => {
    const nativeExtractor = () => ({ nativeProp: { name: 'nativeProp', description: 'native', control: 'text' } });
    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    const result = extract(Comp);

    expect(result.nativeProp).toBeDefined();
    expect(result['data-disabled']).toBeDefined();
  });

  // Test 4: native rows preserved without matching metadata
  it('preserves native rows when no metadata matches (test 4)', () => {
    const nativeExtractor = () => ({ nativeProp: { name: 'nativeProp', description: 'native', control: 'text' } });
    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(nativeExtractor, {});
    const result = extract(Comp);

    expect(result.nativeProp).toBeDefined();
    expect(result['data-disabled']).toBeUndefined();
  });

  // Test 5: metadata resolves from displayName
  it('resolves metadata from displayName (test 5)', () => {
    const nativeExtractor = () => ({});
    const Comp = Object.assign(() => null, { displayName: 'MyDisplayName' });
    const extract = createStateDataAttributesExtractor(nativeExtractor, { MyDisplayName: SINGLE_METADATA });
    const result = extract(Comp);

    expect(result['data-disabled']).toBeDefined();
  });

  // Test 6: function name fallback only when displayName absent
  it('falls back to function name when displayName absent (test 6)', () => {
    const nativeExtractor = () => ({});
    const MyFuncName = () => null;
    const extract = createStateDataAttributesExtractor(nativeExtractor, { MyFuncName: SINGLE_METADATA });
    const result = extract(MyFuncName);

    expect(result['data-disabled']).toBeDefined();
  });

  // Test 7: displayName wins over function name
  it('displayName wins over function name (test 7)', () => {
    const nativeExtractor = () => ({});
    // name is 'Func', displayName is 'DisplayWins' — only 'DisplayWins' key exists
    const Comp = Object.assign(
      Object.defineProperty(() => null, 'name', { value: 'Func', configurable: true }),
      { displayName: 'DisplayWins' },
    );
    const extract = createStateDataAttributesExtractor(nativeExtractor, {
      DisplayWins: SINGLE_METADATA,
      Func: [{ name: /** @type {'data-other'} */ ('data-other'), type: 'string', description: 'Other.' }],
    });
    const result = extract(Comp);

    // displayName 'DisplayWins' must win → data-disabled present
    expect(result['data-disabled']).toBeDefined();
    // function name 'Func' row must NOT appear
    expect(result['data-other']).toBeUndefined();
  });

  // Test 8: native row wins on key collision
  it('native row wins on key collision (test 8)', () => {
    const nativeExtractor = () => ({
      'data-disabled': { name: 'data-disabled', description: 'native-wins', control: 'text' },
    });
    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    const result = extract(Comp);

    expect(result['data-disabled'].description).toBe('native-wins');
    expect(result['data-disabled'].control).toBe('text');
  });

  // Test 9: native extractor null/undefined becomes empty map
  it('treats null native extractor as empty map (test 9a)', () => {
    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(/** @type {any} */ (null), { Comp: SINGLE_METADATA });
    const result = extract(Comp);

    expect(result['data-disabled']).toBeDefined();
  });

  it('treats undefined native extractor as empty map (test 9b)', () => {
    const Comp = () => null;
    const extract = createStateDataAttributesExtractor(/** @type {any} */ (undefined), { Comp: SINGLE_METADATA });
    const result = extract(Comp);

    expect(result['data-disabled']).toBeDefined();
  });

  // Test 10: missing component (null/undefined) returns native rows unchanged
  it('returns native rows unchanged when component is null (test 10a)', () => {
    const nativeExtractor = () => ({ nativeProp: { name: 'nativeProp', description: 'native', control: 'text' } });
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    const result = extract(/** @type {any} */ (null));

    expect(result.nativeProp).toBeDefined();
    expect(result['data-disabled']).toBeUndefined();
  });

  it('returns native rows unchanged when component is undefined (test 10b)', () => {
    const nativeExtractor = () => ({ nativeProp: { name: 'nativeProp', description: 'native', control: 'text' } });
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    const result = extract(/** @type {any} */ (undefined));

    expect(result.nativeProp).toBeDefined();
    expect(result['data-disabled']).toBeUndefined();
  });

  // Test 11: component object with neither displayName nor name returns native rows unchanged
  it('returns native rows unchanged for component with no name/displayName (test 11)', () => {
    const nativeExtractor = () => ({ nativeProp: { name: 'nativeProp', description: 'native', control: 'text' } });
    const noNameComp = {};
    const extract = createStateDataAttributesExtractor(nativeExtractor, { Comp: SINGLE_METADATA });
    const result = extract(noNameComp);

    expect(result.nativeProp).toBeDefined();
    expect(result['data-disabled']).toBeUndefined();
  });

  // Test 12: independent calls for Accordion, AccordionItem, AccordionPanel return only matching metadata
  it('independent calls for Accordion, AccordionItem, AccordionPanel return only matching metadata (test 12)', () => {
    const nativeExtractor = () => ({});

    const Accordion = Object.assign(() => null, { displayName: 'Accordion' });
    const AccordionItem = Object.assign(() => null, { displayName: 'AccordionItem' });
    const AccordionPanel = Object.assign(() => null, { displayName: 'AccordionPanel' });

    const extractAccordion = createStateDataAttributesExtractor(nativeExtractor, ACCORDION_METADATA);
    const extractAccordionItem = createStateDataAttributesExtractor(nativeExtractor, ACCORDION_METADATA);
    const extractAccordionPanel = createStateDataAttributesExtractor(nativeExtractor, ACCORDION_METADATA);

    const accordionResult = extractAccordion(Accordion);
    const itemResult = extractAccordionItem(AccordionItem);
    const panelResult = extractAccordionPanel(AccordionPanel);

    // Accordion: only data-open
    expect(accordionResult['data-open']).toBeDefined();
    expect(accordionResult['data-value']).toBeUndefined();
    expect(accordionResult['data-expanded']).toBeUndefined();

    // AccordionItem: only data-value
    expect(itemResult['data-value']).toBeDefined();
    expect(itemResult['data-open']).toBeUndefined();
    expect(itemResult['data-expanded']).toBeUndefined();

    // AccordionPanel: only data-expanded
    expect(panelResult['data-expanded']).toBeDefined();
    expect(panelResult['data-open']).toBeUndefined();
    expect(panelResult['data-value']).toBeUndefined();
  });
});
