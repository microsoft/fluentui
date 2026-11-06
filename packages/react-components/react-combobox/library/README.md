# @fluentui/react-combobox

**Combobox component for [Fluent UI React](https://react.fluentui.dev)**

## Opt-in CSS Modules styles

CSS Modules alternatives are available for the Combobox, Dropdown, Listbox, Option,
and OptionGroup style hooks. Griffel remains the default. A consumer's bundler must
explicitly replace the corresponding `use*Styles.styles` modules with their
`use*Styles.styles.css` alternatives (including `.styles.js` → `.styles.css.js`
for built imports), process CSS Modules, and retain the layered CSS assets.

This selects styles only; component state, rendering, theme injection, and public
slot class names are unchanged. Composed components in other packages must select
their own alternatives separately.
