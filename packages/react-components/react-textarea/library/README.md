# @fluentui/react-textarea

**React Textarea components for [Fluent UI React](https://react.fluentui.dev)**

The Textarea component is a multiline text input that allows the user to enter

## Usage

To import Textarea:

```js
import { Textarea } from '@fluentui/react-textarea';
```

### Examples

```js
<Textarea placeholder="Enter text here..." />
<Textarea defaultValue="Lorem ipsum dolor" />
```

## Opt-in CSS Modules styles

CSS Modules alternatives are available for `Textarea`. The default exports and component imports continue to use Griffel.

To opt in, configure your bundler to replace each `use<Component>Styles.styles.js` module with its adjacent `use<Component>Styles.styles.css.js` alternative (or `.styles.ts` with `.styles.css.ts` for source builds). Apply the replacement consistently to client and server bundles. The CSS loader must provide a default class-name map and retain the adjacent `.module.css` asset, including CSS from dependencies. All component rules are in `@layer fluentui` and use the theme custom properties supplied by `FluentProvider`.
