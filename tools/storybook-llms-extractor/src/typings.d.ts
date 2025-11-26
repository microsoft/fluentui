declare module 'turndown-plugin-gfm' {
  import type { Plugin } from 'turndown';

  export const strikethrough: Plugin;
  export const tables: Plugin;
  export const taskListItems: Plugin;
}
