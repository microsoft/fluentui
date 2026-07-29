import styles from './Checkbox.module.css';

/*
 * `useCheckboxStyles` keeps its name and signature so CheckboxShim.tsx is unchanged at the
 * call site, but it is no longer a hook. The one rule it carries sits at
 * `@layer fui.components.l2` — see Checkbox.module.css for why that altitude, and why the
 * consumer's v8 `styles.root` still beats it.
 */
const checkboxStyles = {
  root: styles.root,
} as const;

export const useCheckboxStyles = (): typeof checkboxStyles => checkboxStyles;
