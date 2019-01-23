/**
 * Function which takes a parent theme, does some processing on it, and returns a new theme definition.
 * This definition will then be passed to the standard resolver
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type ProcessTheme<ITheme, IThemeDefinition> = (parentTheme: ITheme) => IThemeDefinition;

/**
 * Function which takes a theme definition and a parent theme and produces a new resolved theme
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type ResolveTheme<ITheme, IThemeDefinition> = (definition: IThemeDefinition | undefined, parentTheme: ITheme) => ITheme;

/**
 * Graph node in teh theme graph
 */
interface IThemeEntry<ITheme, IThemeDefinition> {
  /** parent theme */
  parent?: string;

  /** definition or function used to regenerate the theme */
  definition?: IThemeDefinition | ProcessTheme<ITheme, IThemeDefinition>;

  /** resolved theme */
  resolved?: ITheme;
}

/** Predefined entries in the theme graph, pretty self-explanatory */
interface IThemeGraphCore<ITheme, IThemeDefinition> {
  _platform: IThemeEntry<ITheme, IThemeDefinition>;
  default: IThemeEntry<ITheme, IThemeDefinition>;
}

/** Key-names for the platform and default themes */
const _platformKey: keyof IThemeGraphCore<object, object> = '_platform';
const _defaultKey: keyof IThemeGraphCore<object, object> = 'default';

/** Graph interface, takes the predefined entries and adds the index signature */
interface IThemeGraph<ITheme, IThemeDefinition> extends IThemeGraphCore<ITheme, IThemeDefinition> {
  [key: string]: IThemeEntry<ITheme, IThemeDefinition>;
}

/**
 * Function signature for theme registration
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IRegisterTheme<ITheme, IThemeDefinition> =
  (definition: IThemeDefinition | ProcessTheme<ITheme, IThemeDefinition>, name?: string, parent?: string) => void;

/**
 * Function signature for get theme calls
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IGetTheme<ITheme> = (name?: string) => ITheme;

/**
 * Function signature for updating the platform defaults
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IUpdatePlatformDefaults<ITheme> = (platformDefaults: ITheme) => void;

/**
 * The theme registry is an object which tracks themes and their dependencies and updates them as
 * dependencies get updated.  The public interface are set as functions to encapsulate the type
 * information a single time when it is created.  This is a generic object typed on ITheme and
 * IThemeDefinition
 *
 * ITheme is designed to be a result value that can be queried from the theming system
 * IThemeDefinition might be a partial theme, or even a different object entirely.  The only
 * requirement is that (current IThemeDefinition + parent ITheme) => current ITheme
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IThemeRegistry<ITheme, IThemeDefinition> {
  /**
   * registerTheme will create or update a theme, associated with the given name,
   * optionally parented to parent.  If name is undefined this will update the default
   * theme definition.  The default theme is automatically parented to the platform
   * defaults.  If parent is omitted the theme will be parented to the default theme
   */
  registerTheme: IRegisterTheme<ITheme, IThemeDefinition>;

  /**
   * get a theme by name, this will force the theme to be created and resolved if it is
   * the first time it is being called or a dependency has been updated.  If name is
   * not specified the default theme will be returned
   */
  getTheme: IGetTheme<ITheme>;

  /**
   * update the platform defaults.  This is less likely to happen on web but on native
   * the system settings might change requiring all dependent themes to be updated.
   */
  updatePlatformDefaults: IUpdatePlatformDefaults<ITheme>;

  /**
   * The actual graph of named themes
   */
  graph: object;
}

/**
 * Creates a theme registry object which caches theme information and provides typed functions
 * for working with themes in the registry.
 * @param platformDefaults - A fully defined theme with default values for the given platform
 * @param resolver - A function which takes a partial theme, a fully defined parent theme, and
 * produces a fully resolved theme.
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function createThemeRegistry<ITheme, IThemeDefinition>(
  platformDefaults: ITheme,
  resolver: ResolveTheme<ITheme, IThemeDefinition>
): IThemeRegistry<ITheme, IThemeDefinition> {
  const graph: IThemeGraph<ITheme, IThemeDefinition> = {
    _platform: { resolved: platformDefaults },
    default: { parent: _platformKey }
  };
  return {
    graph,
    registerTheme: (definition: IThemeDefinition | ProcessTheme<ITheme, IThemeDefinition>, name?: string, parent?: string): void => {
      _registerTheme<ITheme, IThemeDefinition>(graph, definition, name, parent);
    },
    getTheme: (name?: string): ITheme => {
      return _getTheme<ITheme, IThemeDefinition>(graph, resolver, name);
    },
    updatePlatformDefaults: (newDefaults: ITheme): void => {
      _updatePlatformDefaults<ITheme, IThemeDefinition>(graph, newDefaults);
    }
  };
}

/**
 * Register a new theme by name.  This will invalidate the portion of the graph that is dependent on the new
 * theme.  This will error on bad dependencies including cycles.
 *
 * @param graph - theme graph used for tracking dependencies
 * @param definition - new theme definition or processing function to set in the theme
 * @param name - name of the theme, if empty will be treated as 'default'
 * @param parent - optional theme parent, if empty will be treated as 'default' if not default theme
 */
function _registerTheme<ITheme, IThemeDefinition>(
  graph: IThemeGraph<ITheme, IThemeDefinition>,
  definition: IThemeDefinition | ProcessTheme<ITheme, IThemeDefinition>,
  name?: string,
  parent?: string
): void {
  name = name || _defaultKey;
  parent = (name === _defaultKey && _platformKey) || parent || _defaultKey;
  if (_wouldCauseCycle(graph, name, parent)) {
    throw new Error('Attempt to register a dependent theme that would cause a cycle');
  } else if (!graph[parent]) {
    throw new Error('Attempting to parent to an unknown theme');
  } else if (name === _platformKey) {
    throw new Error('A platform theme cannot be registered, call updatePlatformDefaults instead');
  }
  if (!graph[name]) {
    graph[name] = {};
  }
  const entry = graph[name];
  entry.parent = parent;
  entry.definition = definition;
  entry.resolved = undefined;
  _clearDependentThemes(graph, name);
}

/**
 * Get a cached theme (if valid) or generate the theme and return it if not
 *
 * @param graph - theme graph used for storage and lookups
 * @param resolver - resolution function used to process themes
 * @param name - name of the theme to query
 */
function _getTheme<ITheme, IThemeDefinition>(
  graph: IThemeGraph<ITheme, IThemeDefinition>,
  resolver: ResolveTheme<ITheme, IThemeDefinition>,
  name?: string
): ITheme {
  name = name || _defaultKey;
  const entry = graph[name] || graph.default;
  if (!entry.resolved) {
    const parent = _getTheme(graph, resolver, entry.parent);
    const fnDef = entry.definition && typeof entry.definition === 'function' && entry.definition;
    const definition = fnDef ? (fnDef as ProcessTheme<ITheme, IThemeDefinition>)(parent) : entry.definition as IThemeDefinition;
    entry.resolved = resolver(definition, parent);
  }
  return entry.resolved;
}

/**
 * Update/set the platform theme, invalidating the entire graph
 *
 * @param graph - theme graph used for storage and lookups
 * @param platformDefaults - new, fully resolved, platform theme to set
 */
function _updatePlatformDefaults<ITheme, IThemeDefinition>(
  graph: IThemeGraph<ITheme, IThemeDefinition>,
  platformDefaults: ITheme
): void {
  graph._platform.resolved = platformDefaults;
  _clearDependentThemes(graph, _platformKey);
}

/**
 * Returns true if adding this entry to the graph would cause a cycle
 *
 * @param graph - theme graph
 * @param name - name of the theme
 * @param parent - parent of the theme
 */
function _wouldCauseCycle<ITheme, IThemeDefinition>(
  graph: IThemeGraph<ITheme, IThemeDefinition>,
  name: string,
  parent: string
): boolean {
  let par: string | undefined = parent;
  while (par) {
    // if we ever find a self-referencing parent there would be a cycle, this includes
    // parent === name on a single entry
    if (par === name) {
      return true;
    }
    const parentEntry: IThemeEntry<ITheme, IThemeDefinition> | undefined = graph[par];
    par = (parentEntry && parentEntry.parent) || undefined;
  }
  return false;
}

/**
 * Clears all dependent entries in the theme graph
 *
 * @param graph - theme graph
 * @param parent - parent theme name that has been invalidated
 */
function _clearDependentThemes<ITheme, IThemeDefinition>(graph: IThemeGraph<ITheme, IThemeDefinition>, parent: string): void {
  for (const key in graph) {
    if (graph.hasOwnProperty(key)) {
      const entry = graph[key];
      if (entry.parent === parent && entry.resolved) {
        entry.resolved = undefined;
        _clearDependentThemes(graph, key);
      }
    }
  }
}