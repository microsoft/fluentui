# Generic Theme Registry

The generic theme registry is a helper for creating a directed graph of themes, with the ability to invalidate either subtrees within the hierarchy, or the entire set of themes.  These themes can be queried by name, returning cached values if they are valid, or causing themes to be recreated on demand.

This is set up to be able to support the current Fabric loadTheme/createTheme/getTheme system, while allowing for the addition of named themes when desired.  The dynamic updating of these is a requirement for using a theming library in React Native where actual platform values may change dynamically.

## Internal Structure

Beyond the dynamic portion of the graph, there are two special themes: the hidden platform theme and the default theme.

* Platform Theme - this encapsulates a set of defaults that come from the system.  Information such as root typography settings or system colors can be set here.  Depending on usage this could also contain default values for various elements of the theme.  If a change happens here, all themes will be recreated.
* Default Theme - this theme is the default theme for the entire UI tree.  It can be obtained by either using a name that is falsy, or by specifying a value of default.  It will inherit from the platform theme and be the implicit parent of all other themes.

## Usage

There is only a single exported generic function which returns an IThemeRegistry object.

    export function createThemeRegistry<ITheme, IThemeDefinition>(
      platformDefaults: ITheme,
      resolver: ResolveTheme<ITheme, IThemeDefinition>
    ): IThemeRegistry<ITheme, IThemeDefinition>

This is parameterized on two types (which can be the same):
* ITheme - a fully resolved theme, suitable for returning to callers
* IThemeDefinition - either a partial theme, or other values which can be processed into a full theme.

| Parameter | Usage |
| --- | --- |
| __platformDefaults__ | A fully resolved theme containing the default values for the platform.  This will not be processed but will be used as-is. |
| __resolver__ | A function which takes a theme definition, and parent theme, and will turn them into a new theme.  When a theme is invalidated this will be re-run to create a new theme from the existing definition and a likely updated parent theme.

The returned theme registry object should be held by the caller and used across the lifetime of the session.  Generally this will not be exposed directly but will be wrapped in a more friendly API.

### Theme Registry APIs

The returned theme registry object has three APIs which provide the interface to wrap and expose to clients.

#### registerTheme
registerTheme is the API which allows the caller to either create, or update an entry in the graph.

    registerTheme(
      definition: IThemeDefinition | ProcessTheme<ITheme, IThemeDefinition>,
      name?: string,
      parent?: string
    ): void

| Param | Usage |
| --- | --- |
| __definition__ | this can either be a theme definition, or a function that accepts a parent theme and returns a new theme definition.  If a theme definition is specified the standard resolution logic will be used.  If a function is provided the function will be called to generate the a new theme definition which will then be run through the standard resolver.  The results will be cached and invalidated the same as for standard resolution |
| __name__ | name of the theme.  This will replace an existing entry.  If empty or default, it will set/replace the default theme.
| __parent__ | theme to use as a parent.  If unspecified the default theme will be set as the parent.

#### getTheme
This will return a theme by name, regenerating the theme if it has been invalidated in some way, otherwise returning the cached value.

    getTheme(
      name?: string
    ): ITheme

The usage of name is consistent with that of register theme, empty === 'default'.

#### updatePlatformDefaults
This allows the platform theme to be updated if the values have changed.  Calling this will cause the full graph to be invalidated.

    updatePlatformDefaults(platformDefaults: ITheme): void

This is done as a full replacement.  The value of platformDefaults will be taken as-is and set as the new platform theme.
