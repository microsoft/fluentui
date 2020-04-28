// !!!!!!!!!!
// Keep in sync with packages/fluentui/docs/src/types.ts!
// !!!!!!!!!!

export type ExampleSource = {
  js: string;
  ts: string;
};

/**
 * Component menu item shown in the site sidebar.
 * An array of menu items is saved in `componentMenu.json`.
 */
export type ComponentMenuItem = {
  displayName: string;
  type: string;
};
