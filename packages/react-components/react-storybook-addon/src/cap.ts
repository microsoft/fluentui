/**
 * CAP visual-language option ids stored as a Storybook global.
 *
 * Modeled after `ThemeIds` so the value persists in the URL as a readable
 * token (e.g. `storybook_fluentui-react-addon_cap:cap`) instead of a boolean
 * (`storybook_fluentui-react-addon_cap:!false`).
 */
export type CapIds = 'base' | 'cap';

export const capOptions: ReadonlyArray<{ id: CapIds; label: string }> = [
  { id: 'base', label: 'Fluent' },
  { id: 'cap', label: 'CAP' },
];

export const defaultCap: { id: CapIds; label: string } = capOptions[0];
