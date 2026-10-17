import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { tagClassNames, tagSlotClasses } from '../Tag/useTagStyles';
import type { InteractionTagPrimaryState } from './InteractionTagPrimary.types';

import styles from './InteractionTagPrimary.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const interactionTagPrimaryClassNames: { root: string } = {
  root: componentMarkers('interaction-tag-primary'),
};

type InteractionTagPrimaryRootDataAttributes = {
  'data-size'?: InteractionTagPrimaryState['size'];
};

/**
 * Applies the visual contract, returning new state. `filled` and `rounded` are the base looks and
 * carry no class. The four content slots wear TAG's classes, because Griffel's primary imports
 * Tag's media/icon/primaryText/secondaryText style groups and applies them bucket for bucket; the
 * root therefore carries Tag's marker pair as well as its own, since those classes reach `size`
 * through the group-size variants on `fui-tag`. Hover and active are gated on `enabled`: Griffel
 * applies the appearance bucket or the disabled bucket, never both.
 */
export const useInteractionTagPrimaryStyles = (state: InteractionTagPrimaryState): InteractionTagPrimaryState => {
  const { appearance, disabled, hasSecondaryAction, selected, shape, size } = state;

  const root: InteractionTagPrimaryState['root'] & InteractionTagPrimaryRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      interactionTagPrimaryClassNames.root,
      tagClassNames.root,
      styles.root,
      shape === 'circular' && styles.circular,
      shape === 'circular' && !hasSecondaryAction && styles.circularWithoutSecondaryAction,
      appearance !== 'filled' && styles[appearance],
      selected && !disabled && styles.selected,
      !state.media && !state.icon && styles.withoutMedia,
      hasSecondaryAction && styles.withSecondaryAction,
      state.root.className,
    ),
  };

  return { ...tagSlotClasses(state), root };
};
