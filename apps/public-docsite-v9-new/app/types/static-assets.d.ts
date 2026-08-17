/// <reference types="vite/client" />

/**
 * Story entry points import sibling Markdown files as strings. Mirrors the ambient
 * declaration in the repo's `typings/static-assets` used by Storybook.
 */
declare module '*.md' {
  const content: string;
  export default content;
}
