// @ts-check

/**
 * @typedef {import('./source-analysis').SourceAnalysis} SourceAnalysis
 * @typedef {import('./source-analysis').Domain} Domain
 * @typedef {import('./collect-evidence').Evidence} Evidence
 * @typedef {import('./collect-evidence').Report} Report
 * @typedef {Array<string | number | boolean>} Values
 * @typedef {{ target: string; attribute: string; values?: Values | null }} ElementDataAttribute
 * @typedef {{
 *   attributes: Record<string, Record<string, string>>;
 *   elements?: ElementDataAttribute[];
 *   values?: Record<string, Record<string, Values | null>>;
 * }} DataAttributesDefinition
 * @typedef {{ dataAttributes: DataAttributesDefinition }} ComponentDataAttributes
 */

const PRIORITY = {
  inherited: -1,
  type: 0,
  literalType: 2,
  expression: 1,
  literal: 3,
  presence: 4,
  open: 1,
  unresolved: 1,
  local: 10,
};

/** @param {string} name */
const camelKey = name => name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * @param {...Values} values
 * @returns {Domain}
 */
const literalUnion = (...values) => ({ kind: 'literal', values: [...new Set(values.flat())] });

/**
 * @param {Values | null | undefined} values
 * @returns {Domain}
 */
function domainFromValues(values) {
  if (values === null) {
    return { kind: 'unresolved' };
  }
  if (values === undefined) {
    return { kind: 'presence' };
  }

  return values.length ? { kind: 'literal', values } : { kind: 'open', values: [] };
}

/**
 * @param {Domain} domain
 * @returns {Values | null | undefined}
 */
function domainValues(domain) {
  if (domain.kind === 'presence') {
    return undefined;
  }

  return domain.kind === 'unresolved' ? null : domain.values;
}

/**
 * Merges the collected evidence into the `{ dataAttributes }` definition rendered by the docs page.
 *
 * Precedence per slot attribute: writes in the documented package, then literal writes elsewhere,
 * then declared slot types, then attributes inherited from components composed into a slot.
 *
 * @param {Evidence} evidence
 * @param {SourceAnalysis} analysis
 * @param {Report} report
 * @param {(symbol: import('typescript').Symbol, slot: string) => ComponentDataAttributes | undefined} inherit
 * @param {(file: import('typescript').SourceFile) => boolean} isLocal
 * @returns {ComponentDataAttributes | undefined}
 */
function assembleMetadata(evidence, analysis, report, inherit, isLocal) {
  const { ts, checker, typeDomain, expressionDomain } = analysis;
  const { maps, writes, states, inputs, compositions } = evidence;

  /** @type {Record<string, Record<string, string>>} */
  const attributes = {};
  /** @type {Map<string, { domain: Domain; node: import('typescript').Node | undefined; priority: number }>} */
  const domains = new Map();
  /** @type {Map<string, { target: string; attribute: string; domain: Domain }>} */
  const elements = new Map();

  /**
   * @param {string} target
   * @param {string} attribute
   * @param {Domain} domain
   */
  function addElement(target, attribute, domain) {
    const key = `${target}\0${attribute}`;
    const previous = elements.get(key);

    if (previous?.domain.kind === 'literal' && domain.kind === 'literal') {
      domain = literalUnion(previous.domain.values, domain.values);
    }

    if (!previous || domain.kind !== 'unresolved') {
      elements.set(key, { target, attribute, domain });
    }
  }

  /**
   * @param {string | undefined} slot
   * @param {string} key
   * @param {string} name
   * @param {Domain} domain
   * @param {import('typescript').Node | undefined} node
   * @param {number} priority
   */
  function add(slot, key, name, domain, node, priority) {
    if (!slot) {
      report('unresolved-slot', `Cannot locate slot for ${name}`, node, { attribute: name });
      return;
    }

    if (slot.startsWith('element:')) {
      addElement(`Rendered <${slot.slice('element:'.length)}>`, name, domain);
      return;
    }

    const entries = (attributes[slot] ??= {});

    // Retain map keys even if an upstream write supplied a DOM-derived key first.
    const previousKey = Object.keys(entries).find(item => entries[item] === name);
    if (previousKey && previousKey !== key) {
      delete entries[previousKey];
    }
    entries[key] = name;

    const id = `${slot}\0${name}`;
    const previous = domains.get(id);

    if (
      priority === PRIORITY.inherited &&
      previous?.priority === PRIORITY.inherited &&
      domain.kind === 'literal' &&
      previous.domain.kind === 'literal'
    ) {
      domain = literalUnion(previous.domain.values, domain.values);
    }

    if (
      !previous ||
      (domain.kind !== 'unresolved' && (previous.domain.kind === 'unresolved' || priority >= previous.priority))
    ) {
      domains.set(id, { domain, node, priority });
    }
  }

  function applyTypes() {
    const runtimeAttributes = new Set(
      writes.filter(write => !write.removal && write.slot).map(write => `${write.slot}\0${write.name}`),
    );

    for (const { type, node } of states) {
      const components = /** @type {import('typescript').Symbol} */ (type.getProperty('components'));
      const slots = checker.getPropertiesOfType(checker.getTypeOfSymbolAtLocation(components, node));

      for (const slot of slots) {
        const property = type.getProperty(slot.name);
        if (!property) {
          continue;
        }

        const slotType = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(property, node));

        for (const attribute of checker.getPropertiesOfType(slotType)) {
          if (!attribute.name.startsWith('data-')) {
            continue;
          }

          if (!runtimeAttributes.has(`${slot.name}\0${attribute.name}`)) {
            report(
              'unassigned-contract',
              `${slot.name}.${attribute.name} has a type contract but no reachable map or runtime assignment`,
              node,
              { slot: slot.name, attribute: attribute.name },
            );
            continue;
          }

          const domain = typeDomain(checker.getTypeOfSymbolAtLocation(attribute, node));

          add(
            slot.name,
            camelKey(attribute.name),
            attribute.name,
            domain,
            node,
            domain.kind === 'literal' ? PRIORITY.literalType : PRIORITY.type,
          );
        }
      }
    }
  }

  function applyWrites() {
    /** @type {Map<string, { scope: import('typescript').Node; paths: Array<{ branches: Map<import('typescript').Node, unknown>; domain: Domain }> }>} */
    const alternatives = new Map();
    /** @type {Map<string, ReturnType<typeof domains.get>>} */
    const writeBaseline = new Map();

    /** @param {import('typescript').Node} node */
    function executionPath(node) {
      /** @type {Map<import('typescript').Node, unknown>} */
      const branches = new Map();
      let child = node;
      for (let parent = child.parent; parent; child = parent, parent = parent.parent) {
        if (ts.isFunctionLike(parent)) {
          return { scope: /** @type {import('typescript').Node} */ (parent), branches };
        }
        if (ts.isIfStatement(parent) && child !== parent.expression) {
          branches.set(parent, child === parent.thenStatement ? 'then' : 'else');
        }
        if (ts.isConditionalExpression(parent) && child !== parent.condition) {
          branches.set(parent, child === parent.whenTrue ? 'then' : 'else');
        }
        if (ts.isIterationStatement(parent, false)) {
          branches.set(parent, 'loop');
        }
        if (ts.isCaseBlock(parent)) {
          branches.set(parent, child);
        }
        if (
          ts.isBinaryExpression(parent) &&
          child === parent.right &&
          [
            ts.SyntaxKind.AmpersandAmpersandToken,
            ts.SyntaxKind.BarBarToken,
            ts.SyntaxKind.QuestionQuestionToken,
          ].includes(parent.operatorToken.kind)
        ) {
          branches.set(parent, 'right');
        }
      }
      return { scope: /** @type {import('typescript').Node} */ (node.getSourceFile()), branches };
    }

    for (const write of writes) {
      // Cleanup alone does not establish an emitted attribute or a value domain.
      if (write.removal) {
        continue;
      }

      let domain = write.domain ?? expressionDomain(write.expression, new Set(), inputs);

      if (write.imperative && write.target) {
        addElement(write.target, write.name, domain);
        continue;
      }

      const local = isLocal(write.node.getSourceFile());

      const pathInfo = executionPath(write.node);
      const id = `${write.slot}\0${write.name}`;
      if (!writeBaseline.has(id)) {
        writeBaseline.set(id, domains.get(id));
      }
      const previous = alternatives.get(id);
      let paths = previous?.scope === pathInfo.scope ? previous.paths : [];
      // A later write replaces earlier writes on paths it always covers. Writes
      // on alternative branches remain possible and contribute a value union.
      paths = paths.filter(
        entry => ![...pathInfo.branches].every(([branch, arm]) => entry.branches.get(branch) === arm),
      );
      paths.push({ branches: pathInfo.branches, domain });
      alternatives.set(id, { scope: pathInfo.scope, paths });
      if (paths.length > 1) {
        if (paths.every(entry => entry.domain.kind === 'literal')) {
          domain = literalUnion(...paths.map(entry => (entry.domain.kind === 'literal' ? entry.domain.values : [])));
        } else if (paths.every(entry => entry.domain.kind === 'presence')) {
          domain = { kind: 'presence' };
        } else {
          domain = { kind: 'unresolved' };
        }
      }

      // Replacing an aggregate must not retain the narrower value previously
      // accumulated from just one branch. Preserve upstream/type precedence.
      if (previous?.scope === pathInfo.scope) {
        const baseline = writeBaseline.get(id);
        if (baseline) {
          domains.set(id, baseline);
        } else {
          domains.delete(id);
        }
      } else if (previous) {
        writeBaseline.set(id, domains.get(id));
      }
      const priority = (local ? PRIORITY.local : 0) + PRIORITY[domain.kind];

      add(
        write.slot === 'children' ? undefined : write.slot,
        camelKey(write.name),
        write.name,
        domain,
        write.node,
        priority,
      );
    }
  }

  function applyMaps() {
    for (const { map, declaration } of maps.values()) {
      /** @type {Set<string>} */
      const observedSlots = new Set();
      /** @param {string} name */
      const slotsFor = name => Object.keys(attributes).filter(slot => Object.values(attributes[slot]).includes(name));

      for (const name of Object.values(map)) {
        for (const slot of slotsFor(name)) {
          observedSlots.add(slot);
        }
      }

      for (const [key, name] of Object.entries(map)) {
        const slots = slotsFor(name);
        if (!slots.length && observedSlots.size === 1) {
          slots.push([...observedSlots][0]);
        }

        if (!slots.length) {
          report(
            'unresolved-map-entry',
            `No runtime slot for ${declaration.name.getText()}.${key} (${name})`,
            declaration,
            {
              attribute: name,
            },
          );
        }

        for (const slot of slots) {
          const existing = domains.get(`${slot}\0${name}`);
          add(
            slot,
            key,
            name,
            existing?.domain ?? { kind: 'unresolved' },
            declaration,
            existing?.priority ?? PRIORITY.type,
          );
        }
      }
    }
  }

  function applyComposition() {
    for (const [slot, { symbols }] of compositions) {
      for (const symbol of symbols) {
        const inherited = inherit(symbol, slot)?.dataAttributes;
        const declaration = symbol.declarations?.[0];

        for (const [sourceSlot, entries] of Object.entries(inherited?.attributes ?? {})) {
          const target = sourceSlot === 'root' ? slot : `${slot}.${sourceSlot}`;

          for (const [key, name] of Object.entries(entries)) {
            add(
              target,
              key,
              name,
              domainFromValues(inherited?.values?.[sourceSlot]?.[key]),
              declaration,
              PRIORITY.inherited,
            );
          }
        }

        for (const entry of inherited?.elements ?? []) {
          addElement(`${slot} → ${entry.target}`, entry.attribute, domainFromValues(entry.values));
        }
      }
    }
  }

  /** @returns {ComponentDataAttributes | undefined} */
  function finish() {
    /** @type {Record<string, Record<string, Values | null>>} */
    const values = {};

    for (const [slot, entries] of Object.entries(attributes)) {
      for (const [key, name] of Object.entries(entries)) {
        const { domain, node } = /** @type {NonNullable<ReturnType<typeof domains.get>>} */ (
          domains.get(`${slot}\0${name}`)
        );
        if (domain.kind === 'presence') {
          continue;
        }

        if (domain.kind === 'unresolved') {
          report('unresolved-domain', `Cannot infer values for ${slot}.${key} (${name}); documented as unknown`, node, {
            slot,
            attribute: name,
          });
        }

        (values[slot] ??= {})[key] = /** @type {Values | null} */ (domainValues(domain));

        if (domain.kind === 'open') {
          report('open-domain', `${slot}.${key} (${name}) has an unconstrained string/number domain`, node);
        }
      }
      if (!Object.keys(entries).length) {
        delete attributes[slot];
      }
    }

    /** @type {ElementDataAttribute[]} */
    const elementRows = [...elements.values()].map(({ target, attribute, domain }) => {
      if (domain.kind === 'unresolved') {
        report(
          'unresolved-domain',
          `Cannot infer values for ${target} ${attribute}; documented as unknown`,
          undefined,
          {
            attribute,
            target,
          },
        );
      }

      return { target, attribute, ...(domain.kind === 'presence' ? {} : { values: domainValues(domain) }) };
    });

    if (!Object.keys(attributes).length && !elementRows.length) {
      return undefined;
    }

    return {
      dataAttributes: {
        attributes,
        ...(elementRows.length ? { elements: elementRows } : {}),
        ...(Object.keys(values).length ? { values } : {}),
      },
    };
  }

  applyTypes();
  applyWrites();
  applyMaps();
  applyComposition();

  return finish();
}

module.exports = { assembleMetadata };
