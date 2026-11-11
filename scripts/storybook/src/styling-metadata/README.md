# Styling metadata

Generates the "Data attributes" and "Classes" sections that `@fluentui/react-storybook-addon` renders next to Props in
the docs page "API Reference".

> **Temporary:** the tables are derived by static analysis of component source because components ship no
> machine-readable description of their styling contract yet. Once they do, replace the analysis in `extractor.js`
> with a reader for those files (same `{ dataAttributes, classNames }` shape) and keep `loader.js` only as the injector.

## Usage

```js
const { registerStylingMetadataRule } = require('@fluentui/scripts-storybook');

webpackFinal: config => {
  registerStylingMetadataRule({ config, tsConfigPath, classNames: true });
  return config;
};
```

| Storybook                                           | Section         | Source                                       |
| --------------------------------------------------- | --------------- | -------------------------------------------- |
| root `.storybook`, `apps/public-docsite-v9`         | Classes         | `<camelCaseComponent>ClassNames` exports     |
| headless stories, `apps/public-docsite-v9-headless` | Data attributes | `data-*` writes in component hooks/renderers |

Calling `registerStylingMetadataRule` again replaces the earlier rule, so an extending config can switch sections.

## How it works

1. `loader.js` (webpack `pre` loader on `stories/src/**/*.stories.tsx`) parses the story meta, reads `component`
   and `subcomponents`, and resolves each through its import.
2. `extractor.js` builds one TypeScript program per compilation from `tsConfigPath` (source via `paths`, no build
   needed) and caches results per component.
   - Classes: the `<camelCaseComponent>ClassNames` export of the module the story imports from, e.g. `buttonClassNames`
     for `Button`. This is the convention enforced by the react-conformance `component-has-static-classnames-object`
     test.
   - Data attributes: `collect-evidence.js` walks the component (compose factory callbacks, hooks, renderers) for
     `data-*` writes, data attribute maps, slot state types and components composed into slots; `metadata.js` merges
     the evidence. `source-analysis.js` infers value domains from expressions and types.
3. The loader injects `parameters.__generatedStylingMetadata`. Authored
   `parameters.reactStorybookAddon.docs.{dataAttributes,classNames}` win over generated values;
   `parameters.reactStorybookAddon.docs: false` opts a story file out.

## Authoring constraints

- Class name maps must be object literals of string literals, constant references or spreads of such objects.
  Factories (`createClassNames('Tile')`) cannot be evaluated and produce an `unresolved-map` warning.
- `data-*` writes are recognized as JSX attributes, `state.<slot>['data-x'] = …` assignments, object literal properties
  on a slot, and `setAttribute`/`toggleAttribute` calls. Boolean serialization is understood through
  `toDataAttributeValue`.
- A story's `component` must be an imported identifier; `subcomponents` must be an object literal.

## Diagnostics

Diagnostics are webpack warnings; extraction never fails a Storybook build.

| Code                   | Meaning                                         | Effect               |
| ---------------------- | ----------------------------------------------- | -------------------- |
| `unresolved-component` | the import resolves but has no runtime export   | no table             |
| `unresolved-map`       | a class or attribute map is not evaluable       | no table for the map |
| `unresolved-slot`      | a `data-*` write whose slot could not be found  | row not rendered     |
| `unresolved-domain`    | attribute found but its values are unknown      | row not rendered     |
| `unassigned-contract`  | a slot type declares a `data-*` key nobody sets | row not rendered     |
| `open-domain`          | value type is plain `string`/`number`           | silent; `string`     |

## Known gaps

- Writes on a local slot variable (`root['data-type'] = type` in `useNavDrawer`) are reported as `unresolved-slot`.
- Attributes written by infrastructure outside the component walk (`data-activedescendant*` from react-aria,
  `data-fui-focus-within` from tabster) are not listed.
- Attributes on non-slot elements are kept in the metadata (`elements`) but not rendered.

## Tests

`yarn nx run scripts-storybook:test` covers the loader transform, fixtures in `__fixtures__/`, and the real headless
and v9 Button/Accordion sources.
