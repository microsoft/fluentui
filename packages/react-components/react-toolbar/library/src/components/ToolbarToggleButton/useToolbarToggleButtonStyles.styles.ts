'use client';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind):
 * THIS FILE DELIBERATELY STAYS ON GRIFFEL — mixed-mode seam, whitelisted in the ledger.
 * It is converted when @fluentui/react-button's ToggleButton converts, and not before.
 *
 * Both slices restyle @fluentui/react-button's <ToggleButton>, whose OWN styles hook
 * (`useToggleButtonStyles.styles.ts`) is still `makeStyles` + `mergeClasses` — react-button
 * is only partly converted (Button yes; ToggleButton / CompoundButton / MenuButton /
 * SplitButton no, "Siblings still Griffel by design" per the ledger). Griffel injects its
 * atomics UNLAYERED, and unlayered beats every `@layer`, so a converted rule would have to
 * be unlayered too (DECISIONS.md D2 amendment 5) — and there, unlike the `fui-Icon-*` cases
 * the amendment was written for, it cannot win deterministically:
 *
 *   • `selected` collides with `useRootCheckedStyles.base` on background-color/color
 *     (`.fq5gl1p` / `.f1eryozh`, 0-1-0). Today ToolbarToggleButton wins because its class is
 *     a LATER mergeClasses argument (this hook writes the class, THEN calls
 *     useToggleButtonStyles_unstable, whose merge puts the incoming className last) and
 *     Griffel DELETES the losing atomic. An unlayered `.selected` is also 0-1-0 — an exact
 *     tie, resolved by document order between the CSS-module bundle and Griffel's runtime
 *     <style>, which nothing in the build pins.
 *   • Raising it to 0-2-0 (compounding `:global(.fui-ToggleButton)`) fixes that tie but
 *     creates the opposite one: `useRootCheckedStyles[appearance][':hover']` is ALSO 0-2-0
 *     and must keep winning — Griffel resolved that on specificity, not by deletion, so a
 *     checked primary/outline/transparent button would lose its hover colours whenever the
 *     module bundle happened to load last.
 *
 * Neither placement is deterministic, so the slices stay in Griffel, where the existing
 * mergeClasses semantics are exact. Precedent: react-infolabel keeps `usePopoverSurfaceStyles`
 * on Griffel for the same reason (InfoButton.module.css, "the info slot stays Griffel").
 * `iconSelected` follows the root for the same collision on `useIconCheckedStyles`.
 */

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

const useBaseStyles = makeStyles({
  /* use subtle ToggleButton selected styles for Toolbar Radio selected state */
  selected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2Selected,
  },

  iconSelected: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  const toggleButtonStyles = useBaseStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(state.checked && toggleButtonStyles.selected, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(state.checked && toggleButtonStyles.iconSelected, state.icon.className);
  }

  useToggleButtonStyles_unstable(state);

  return state;
};
