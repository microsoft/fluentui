// @ts-check
const path = require('path');

const { collectEvidence } = require('./collect-evidence');
const { assembleMetadata } = require('./metadata');
const { createSourceAnalysis } = require('./source-analysis');

/**
 * @typedef {import('./metadata').ComponentDataAttributes} ComponentDataAttributes
 * @typedef {{ dataAttributes?: import('./metadata').DataAttributesDefinition; classNames?: { classNames: Record<string, string> } }} ComponentStylingMetadata
 * @typedef {{
 *   component: string;
 *   code: string;
 *   message: string;
 *   file?: string;
 *   start?: number;
 *   resolved?: boolean;
 *   slot?: string;
 *   attribute?: string;
 *   [key: string]: unknown;
 * }} Diagnostic
 * @typedef {ReturnType<typeof createStylingMetadataExtractor>} StylingMetadataExtractor
 */

// Registered with webpack alongside analyzed source files so watch/cache invalidation includes tooling changes.
const toolingDependencies = [
  __filename,
  ...['source-analysis', 'collect-evidence', 'metadata'].map(name => require.resolve(`./${name}`)),
];

/**
 * Results and diagnostics are plain JSON; copies keep callers from mutating cached values.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
const clone = value => (value === undefined ? value : JSON.parse(JSON.stringify(value)));

/**
 * Build-time only: analyzes component source without executing components.
 *
 * - `classNames`: the `<camelCaseComponent>ClassNames` export next to the component (v9 convention,
 *   enforced by react-conformance `component-has-static-classnames-object`).
 * - `dataAttributes`: `data-*` attributes the component writes on its slots (headless convention).
 *
 * @param {{ tsConfigPath: string; classNames?: boolean; dataAttributes?: boolean }} options
 */
function createStylingMetadataExtractor({ tsConfigPath, classNames = false, dataAttributes = false }) {
  if (!tsConfigPath) {
    throw new Error('tsConfigPath is required');
  }

  const analysis = createSourceAnalysis({ tsConfigPath: path.resolve(tsConfigPath) });
  /** @type {Map<string, Diagnostic>} unique diagnostics by content */
  const diagnostics = new Map();
  /** @type {Map<string, Set<Diagnostic>>} diagnostics per component key */
  const scoped = new Map();
  /** @type {Array<Set<Diagnostic>>} scopes of the components being extracted */
  const scopes = [];
  /**
   * @param {string} specifier
   * @param {string} importer
   * @param {string} exportName
   */
  const componentKey = (specifier, importer, exportName) => {
    const file = analysis.resolveModule(specifier, importer);
    return {
      file,
      key: `${file ? path.resolve(file.fileName) : `${path.resolve(importer)}\0${specifier}`}\0${exportName}`,
    };
  };
  /** @type {Map<string, ComponentStylingMetadata | undefined>} */
  const cache = new Map();
  /** @type {Map<string, ComponentDataAttributes | undefined>} */
  const dataAttributeCache = new Map();
  /** @type {Set<string>} */
  const active = new Set();

  /** @param {Iterable<Diagnostic>} items */
  const addToScopes = items => {
    for (const item of items) {
      scopes.forEach(scope => scope.add(item));
    }
  };

  /**
   * @param {string} component
   * @returns {import('./collect-evidence').Report}
   */
  const reporter =
    component =>
    (code, message, node, context = {}) => {
      /** @type {Diagnostic} */
      const diagnostic = {
        component,
        code,
        message,
        ...context,
        ...(node ? { file: node.getSourceFile().fileName, start: node.getStart() } : {}),
      };
      const key = JSON.stringify(diagnostic);
      if (!diagnostics.has(key)) {
        diagnostics.set(key, diagnostic);
      }
      addToScopes([/** @type {Diagnostic} */ (diagnostics.get(key))]);
    };

  /**
   * @template T
   * @param {string} key
   * @param {() => T} fn
   * @returns {T}
   */
  function inScope(key, fn) {
    const scope = scoped.get(key) ?? new Set();
    scopes.push(scope);
    try {
      return fn();
    } finally {
      scoped.set(key, scope);
      scopes.pop();
    }
  }

  /**
   * @param {string} specifier - module the story imports the component from
   * @param {string} importer - story file
   * @param {string} exportName - imported name
   * @returns {ComponentStylingMetadata | undefined}
   */
  function extractComponent(specifier, importer, exportName) {
    const { moduleExport, isRuntime, flatMap } = analysis;
    const { file, key } = componentKey(specifier, importer, exportName);

    if (!cache.has(key)) {
      cache.set(
        key,
        inScope(key, () => {
          // Modules outside this tsconfig's `paths` (other Storybooks share the rule) and story-local helpers
          // (e.g. a wrapper defined in a sibling `*.stories.tsx`) have no styling contract to document.
          if (!file || !isRuntime(file)) {
            return undefined;
          }

          const report = reporter(exportName);
          const component = moduleExport(file, exportName);
          if (!component?.declarations?.some(node => isRuntime(node.getSourceFile()))) {
            report('unresolved-component', `Cannot resolve runtime export ${exportName} from ${specifier}`);
            return undefined;
          }

          /** @type {ComponentStylingMetadata} */
          const definition = {};

          if (classNames) {
            const name = `${exportName.charAt(0).toLowerCase()}${exportName.slice(1)}ClassNames`;
            const declaration = moduleExport(file, name)?.valueDeclaration;
            const map = declaration && flatMap(declaration);
            if (map) {
              definition.classNames = { classNames: map };
            } else if (declaration) {
              report(
                'unresolved-map',
                `Cannot statically evaluate ${name}; expected a flat object of string literals, constants or spreads of such objects`,
                declaration,
              );
            }
          }

          const extracted = dataAttributes ? extractDataAttributes(component) : undefined;
          if (extracted) {
            definition.dataAttributes = extracted.dataAttributes;
          }

          return Object.keys(definition).length ? definition : undefined;
        }),
      );
    }

    return clone(cache.get(key));
  }

  /**
   * @param {import('typescript').Symbol} component
   * @returns {ComponentDataAttributes | undefined}
   */
  function extractDataAttributes(component) {
    const declaration = /** @type {import('typescript').Declaration} */ (component.declarations?.[0]);
    const fileName = declaration.getSourceFile().fileName;
    const key = `${path.resolve(fileName)}\0${component.name}`;
    const report = reporter(component.name);

    if (dataAttributeCache.has(key)) {
      addToScopes(scoped.get(key) ?? []);
      return dataAttributeCache.get(key);
    }

    if (active.has(key)) {
      report('recursive-composition', `Recursive component ${component.name}`, declaration);
      return undefined;
    }

    active.add(key);

    try {
      return inScope(key, () => {
        const packageRoot = analysis.packageRootOf(fileName);
        /** @param {import('typescript').SourceFile} file */
        const isLocal = file =>
          packageRoot !== undefined && path.resolve(file.fileName).startsWith(packageRoot + path.sep);

        const evidence = collectEvidence(component, analysis, report, isLocal);
        const definition = assembleMetadata(evidence, analysis, report, extractDataAttributes, isLocal);

        markResolved(component.name, definition);
        dataAttributeCache.set(key, definition);
        return definition;
      });
    } finally {
      active.delete(key);
    }
  }

  /**
   * Warnings about an attribute that another source documented after all are not actionable.
   *
   * @param {string} componentName
   * @param {ComponentDataAttributes | undefined} definition
   */
  function markResolved(componentName, definition) {
    for (const diagnostic of diagnostics.values()) {
      if (
        diagnostic.component === componentName &&
        diagnostic.attribute &&
        ['unresolved-map-entry', 'unassigned-contract'].includes(diagnostic.code)
      ) {
        diagnostic.resolved = Object.entries(definition?.dataAttributes.attributes ?? {}).some(
          ([slot, entries]) =>
            (!diagnostic.slot || slot === diagnostic.slot) &&
            Object.entries(entries).some(
              ([key, name]) =>
                name === diagnostic.attribute &&
                (diagnostic.code !== 'unassigned-contract' ||
                  definition?.dataAttributes.values?.[slot]?.[key] !== null),
            ),
        );
      }
    }
  }

  return {
    extractComponent,
    getDependencies: () => [...new Set([...analysis.getDependencies(), ...toolingDependencies])].sort(),
    getDiagnostics: () => clone([...diagnostics.values()]),
    /**
     * @param {string} specifier
     * @param {string} importer
     * @param {string} exportName
     * @returns {Diagnostic[]}
     */
    getDiagnosticsFor: (specifier, importer, exportName) =>
      clone([...(scoped.get(componentKey(specifier, importer, exportName).key) ?? [])]),
  };
}

module.exports = { createStylingMetadataExtractor };
