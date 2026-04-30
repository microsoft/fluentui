/**
 * Scoped to this package — webpack/Storybook serve `?raw` imports as the file's
 * raw text. Used by `withCssModuleSource` to bundle CSS-Module source into the
 * Stackblitz sandbox; story TSX is auto-injected by
 * `@fluentui/babel-preset-storybook-full-source`, so individual stories no
 * longer import their own source via `?raw`.
 */
declare module '*?raw' {
  const content: string;
  export default content;
}
