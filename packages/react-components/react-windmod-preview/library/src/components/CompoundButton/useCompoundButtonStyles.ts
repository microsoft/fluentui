'use client';

import { componentMarkers } from '../../utils/groupMarker';
import { restackOver } from '../../utils/restackOver';
import { slotClasses } from '../../utils/slotClasses';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { CompoundButtonState } from './CompoundButton.types';

import styles from './CompoundButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const compoundButtonClassNames: { root: string } = {
  root: componentMarkers('compound-button'),
};

type CompoundButtonRootDataAttributes = {
  'data-icon-position'?: CompoundButtonState['iconPosition'];
  'data-content-empty'?: true;
};

/**
 * Applies the visual contract on top of Button's, returning new state. The headless hook stamps
 * data-disabled/-disabled-focusable/-icon-only/-has-secondary-content and useButtonStyles stamps
 * data-appearance/-size/-empty; data-icon-position is the one attribute the headless compound
 * hook omits that Button's and this component's icon spacing both select on.
 *
 * `data-content-empty` must test for nullish, not falsiness: this component's icon margin is
 * gated on `children !== undefined && children !== null` while Button's is gated on
 * `!!children`, and the two disagree for `children={0}` and `children=""` — both of which
 * CompoundButton renders inside the content container, so the gap has to stay. Button's answer
 * is already on this root as `data-empty`; reusing it here would drop the gap beside visible text.
 *
 * The root keeps Button's marker pair alongside its own — see `restackOver`.
 */
export const useCompoundButtonStyles = (state: CompoundButtonState): CompoundButtonState => ({
  ...restackOver(state, useButtonStyles(state), {
    marker: compoundButtonClassNames.root,
    root: styles.root,
    icon: styles.icon,
    rootAttributes: {
      'data-icon-position': state.icon ? state.iconPosition : undefined,
      'data-content-empty': state.root.children === undefined || state.root.children === null || undefined,
    } satisfies CompoundButtonRootDataAttributes,
  }),
  contentContainer: slotClasses(state.contentContainer, styles.contentContainer),
  secondaryContent: slotClasses(state.secondaryContent, styles.secondaryContent),
});
