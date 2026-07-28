'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { PersonaSlots, PersonaState } from './Persona.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Persona.module.css';

export const personaClassNames: SlotClassNames<PersonaSlots> = {
  root: 'fui-Persona',
  avatar: 'fui-Persona__avatar',
  presence: 'fui-Persona__presence',
  primaryText: 'fui-Persona__primaryText',
  secondaryText: 'fui-Persona__secondaryText',
  tertiaryText: 'fui-Persona__tertiaryText',
  quaternaryText: 'fui-Persona__quaternaryText',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Both attributes live on Persona's OWN root and nowhere else. The `avatar` and `presence`
 * slots are another component's root — an `<Avatar>` and a `<PresenceBadge>` — and those
 * components' styles hooks stamp their own attributes there; react-badge's
 * `usePresenceBadgeStyles_unstable` already writes `root['data-size'] = size`, which would
 * silently overwrite anything Persona put on the same name. Everything Persona applies to
 * the coin therefore rides module classes, and its one scale-driven slice (the spacing
 * custom property) is declared on the root instead, where the coin inherits it — see the
 * hoist note in Persona.module.css.
 */
type PersonaRootDataAttributes = {
  'data-size': PersonaState['size'];
  'data-text-position': PersonaState['textPosition'];
};

/**
 * `useAvatarSpacingStyles` / `usePresenceSpacingStyles` reproduced as class maps.
 *
 * The six size keys selected the `--fui-Persona__avatar--spacing` value, which is now
 * declared on the root via `data-size`, so they are absent here — except the one size at
 * which a presence coin differs from an avatar (`small` → `spacingHorizontalSNudge`),
 * which is what `usePresenceSpacingStyles` existed to express and still has to be declared
 * on the coin itself. The three `textPosition` keys are the margin itself and stay on the
 * coin unchanged. The spread mirrors the Griffel hook's
 * `{ ...avatarSpacingStyles, ...usePresenceSpacingStyles() }`.
 */
const avatarSpacingStyles: Record<string, string | undefined> = {
  after: styles['spacing-after'],
  below: styles['spacing-below'],
  before: styles['spacing-before'],
};

const presenceSpacingStyles: Record<string, string | undefined> = {
  ...avatarSpacingStyles,
  small: styles['presence-spacing-s-nudge'],
};

/**
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const { presenceOnly, size, textAlignment, textPosition } = state;

  const alignToPrimary = presenceOnly && textAlignment === 'start' && size !== 'extra-large' && size !== 'huge';
  const alignBeforeAfterCenter = textPosition !== 'below' && textAlignment === 'center';
  const { primaryTextClassName, optionalTextClassName } = getTextClassNames(state, alignToPrimary);

  const root = state.root as PersonaState['root'] & PersonaRootDataAttributes;

  root['data-size'] = size;
  root['data-text-position'] = textPosition;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this Persona's state, because `styles.root` is hashed and unaddressable from
  // outside this file (DECISIONS.md D15).
  //
  // It matters more here than for most components: Persona's `avatar` and `presence` slots
  // ARE other components' roots (an `<Avatar>`, a `<PresenceBadge>`), so `group/fui-persona`
  // is exactly the handle a future Avatar or Badge module would need to react to Persona's
  // `data-size` / `data-text-position` — the pair this hook already stamps on this element,
  // which is why no state mirror is required (D15.6, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Persona.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for why the avatar/presence rules sit
  // in `fui.components.l2`.
  state.root.className = clsx(
    'group/fui-persona',
    personaClassNames.root,
    styles.root,
    alignBeforeAfterCenter && styles['before-after-center'],
    state.root.className,
  );

  if (state.avatar) {
    state.avatar.className = clsx(
      personaClassNames.avatar,
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles['media-before-after-center'],
      styles[textAlignment],
      avatarSpacingStyles[textPosition],
      state.avatar.className,
    );
  }

  if (state.presence) {
    state.presence.className = clsx(
      personaClassNames.presence,
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles['media-before-after-center'],
      styles[textAlignment],
      presenceSpacingStyles[size],
      presenceSpacingStyles[textPosition],
      textPosition === 'after' && alignToPrimary && styles['presence-after-align-to-primary'],
      textPosition === 'before' && alignToPrimary && styles['presence-before-align-to-primary'],
      state.presence.className,
    );
  }

  if (state.primaryText) {
    state.primaryText.className = clsx(
      personaClassNames.primaryText,
      alignBeforeAfterCenter && styles.primary,
      primaryTextClassName,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      personaClassNames.secondaryText,
      alignBeforeAfterCenter && styles.secondary,
      optionalTextClassName,
      styles['second-line-spacing'],
      state.secondaryText.className,
    );
  }

  if (state.tertiaryText) {
    state.tertiaryText.className = clsx(
      personaClassNames.tertiaryText,
      alignBeforeAfterCenter && styles.tertiary,
      optionalTextClassName,
      state.tertiaryText.className,
    );
  }

  if (state.quaternaryText) {
    state.quaternaryText.className = clsx(
      personaClassNames.quaternaryText,
      alignBeforeAfterCenter && styles.quaternary,
      optionalTextClassName,
      state.quaternaryText.className,
    );
  }

  return state;
};

/**
 * The former `useTextClassNames`, renamed because it no longer calls a React hook —
 * `usePrimaryTextBaseClassName` / `useOptionalTextBaseClassName` / `useTextStyles` were
 * Griffel hooks and are now plain class lookups. Keeping the `use` prefix would make
 * `usePersonaStyles_unstable` look like a hook to `eslint-plugin-react-hooks` even though
 * nothing in this file calls React any more. Private to this module; no export changed.
 *
 * The branching itself is byte-for-byte the Griffel original.
 */
const getTextClassNames = (
  state: PersonaState,
  alignToPrimary: boolean,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { presenceOnly, size, textPosition } = state;

  let primaryTextSize;
  let alignToPrimaryClassName;

  if (presenceOnly) {
    if (size === 'extra-small') {
      primaryTextSize = state.numTextLines <= 1 && styles.caption1;
    } else if (size === 'extra-large' || size === 'huge') {
      primaryTextSize = styles.subtitle2;
    }

    if (alignToPrimary) {
      if (textPosition === 'before') {
        alignToPrimaryClassName = styles['text-before-align-to-primary'];
      } else if (textPosition === 'after') {
        alignToPrimaryClassName = styles['text-after-align-to-primary'];
      }
    }
  } else {
    if (size === 'huge') {
      primaryTextSize = styles.subtitle2;
    } else if (size === 'extra-large') {
      primaryTextSize = styles.subtitle2;
    }
  }

  return {
    primaryTextClassName: clsx(styles['primary-text-base'], primaryTextSize, alignToPrimaryClassName),
    optionalTextClassName: clsx(
      styles['optional-text-base'],
      !presenceOnly && size === 'huge' && styles.body1,
      alignToPrimaryClassName,
    ),
  };
};
