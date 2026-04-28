/**
 * Global ambient declaration of various non javascript assets being imported into JS/TS
 */

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.md' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * Webpack `?raw` query — imports a file's source as a string.
 * Used by stories to display CSS module source in Storybook's "Show code" panel.
 */
declare module '*?raw' {
  const content: string;
  export default content;
}
